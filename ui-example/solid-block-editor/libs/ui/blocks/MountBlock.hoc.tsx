import { Accessor, Component, createEffect, For, JSX, on, Switch, Match, createSignal } from 'solid-js';
import { useCanvasContext } from '../../contexts/canvas.context';
import { BlockNode, DragState, BlockConfig, BlockTypeConfig } from '../../blocks.types';
import sharedStyles from './blocks.module.css';
import { Dynamic } from 'solid-js/web';

export type BlockProps<CUSTOM_PROPS = any> = CUSTOM_PROPS & {
    ref: (ref: HTMLElement) => HTMLElement;
    block: BlockNode;
    config: BlockConfig;
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    onClick?: (e: MouseEvent) => void;
    onDragStart?: (e: DragEvent) => void;
    onDragEnd?: (e: DragEvent) => void;
    onDragOver?: (e: DragEvent) => void;
};

export type MountBlockProps = {
    uid: string;
};

export function MountBlock(WrappedComponent: Component<BlockProps>, config: BlockConfig): Component<MountBlockProps> {
    return (props): JSX.Element => {
        /**
         * HTML Refs
         */
        let blockRef!: HTMLElement;

        /**
         * Injection
         */
        const [canvas, canvasSetters] = useCanvasContext();

        /**
         * Component State
         */
        const [blockNode, setBlockNode] = createSignal<BlockNode>(canvas.getBlockByUid(props.uid), { equals: false });

        /**
         * Lifecycle Events
         */
        createEffect(
            on(canvas.blockList, (newValue: BlockNode[]): void => {
                setBlockNode(canvas.getBlockByUid(props.uid));
            })
        );

        createEffect(
            on(canvas.selectedBlock, (selectedBlock: BlockNode): void => {
                if (config.isSelectable) {
                    const action: 'add' | 'remove' = canvas.isBlockSelected(blockNode()) ? 'add' : 'remove';
                    blockRef.classList[action](sharedStyles.blockSelected);
                }
            })
        );

        createEffect(
            on(canvas.hoveredBlockStack, (hoveredBlockStack: BlockNode[]): void => {
                if (config.isHoverable) {
                    const action: 'add' | 'remove' = canvas.isBlockHovered(blockNode()) ? 'add' : 'remove';
                    blockRef.classList[action](sharedStyles.blockHovered);
                }
            })
        );

        /**
         * Procedural Functions
         */
        function calculateDropBehavior(e: MouseEvent, dropzoneBlock: BlockNode): 'right' | 'left' | 'child' {
            const rect: DOMRect = blockRef.getBoundingClientRect();
            const mousePos: { x: number; y: number } = {
                x: e.pageX - blockRef.offsetLeft,
                y: e.pageY - blockRef.offsetTop,
            };
            const supportsChildren: boolean = dropzoneBlock.config?.supportsChildren ?? false;
            const widthSegment: number = rect.width / 5;

            if (mousePos.x >= 0 && mousePos.x < widthSegment) {
                return 'left';
            } else if (supportsChildren && mousePos.x >= widthSegment && mousePos.x < widthSegment * 4) {
                return 'child';
            } else if (mousePos.x >= widthSegment * 4 && mousePos.x < widthSegment * 5) {
                return 'right';
            }

            return supportsChildren ? 'child' : 'left';
        }

        /**
         *  Event Handlers
         */
        function onMouseEnter(e: MouseEvent): void {
            if (config.isHoverable && !canvas.isDragging()) {
                canvasSetters.pushHoveredBlock(blockNode());
            }
        }

        function onMouseLeave(e: MouseEvent): void {
            if (config.isHoverable && !canvas.isDragging()) {
                canvasSetters.popHoveredBlock();
            }
        }

        function onClick(e: MouseEvent): void {
            e.stopPropagation();

            if (config.isSelectable && !canvas.isBlockRichTextSelected(blockNode())) {
                canvasSetters.setSelectedBlock(blockNode());
                canvasSetters.setRichTextSelectedBlock(undefined as unknown as BlockNode);
            }
        }

        function onDragStart(e: DragEvent): void {
            e.stopPropagation();

            blockRef.classList.add(sharedStyles.blockDragActive);
            canvasSetters.setDragState({
                subjectUid: blockNode().uid,
                subjectParentUid: blockNode().parentUid,
                mouseX: e.pageX,
                mouseY: e.pageY,
                isValidDropzone: false,
            });
        }

        function onDragEnd(e: DragEvent): void {
            e.stopPropagation();

            blockRef.classList.remove(sharedStyles.blockDragActive);
            canvasSetters.moveDraggedBlock();
            canvasSetters.setDragState(undefined as unknown as DragState);
        }

        function onDragOver(e: DragEvent): void {
            e.stopPropagation();

            canvasSetters.setDragState({
                isNew: canvas.dragState().isNew,
                newBlock: canvas.dragState().newBlock,
                subjectUid: canvas.dragState().subjectUid,
                subjectParentUid: canvas.dragState().subjectParentUid,
                mouseX: e.pageX,
                mouseY: e.pageY,
                isValidDropzone: true,
                dropzoneParentUid: blockNode().parentUid,
                dropzoneUid: blockNode().uid,
                dropBehavior: calculateDropBehavior(e, blockNode()),
            });
        }

        return (
            <WrappedComponent
                ref={(ref: HTMLElement): HTMLElement => (blockRef = ref)}
                block={blockNode()}
                config={config}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <For each={blockNode().childUids ?? []}>
                    {(childUid: string): JSX.Element => {
                        const childNode: BlockNode = canvas.getBlockByUid(childUid);

                        return (
                            <Switch>
                                <For each={canvas.blockTypes()}>
                                    {(blockType: BlockTypeConfig, tIdx: Accessor<number>): JSX.Element => {
                                        return (
                                            <Match when={childNode.type === blockType.type}>
                                                <Dynamic component={blockType.Component} uid={childNode.uid} />
                                            </Match>
                                        );
                                    }}
                                </For>
                            </Switch>
                        );
                    }}
                </For>
            </WrappedComponent>
        );
    };
}
