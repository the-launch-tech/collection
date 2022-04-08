import { Accessor, Component, createSignal, For, JSX, createUniqueId } from 'solid-js';

import { BLOCK_GROUPS } from '../../../../constants/block-groups';
import { BlockGroup, BlockType, BlockTypeConfig, BlockGroupConfig, DragState } from '../../../../blocks.types';
import { BLOCK_TYPES } from '../../../../constants/block-types';
import { useCanvasContext } from '../../../../contexts/canvas.context';

import styles from './BuilderTab.module.css';
import { createBlock } from '../../../../utils/block.utils';

export type BuilderTabProps = {};

export const BuilderTab: Component<BuilderTabProps> = (props): JSX.Element => {
    /**
     * Injections
     */
    const [canvas, canvasSetters] = useCanvasContext();

    /**
     * Component State
     */
    const [activeGroups, setActiveGroups] = createSignal<BlockGroup[]>([]);

    /**
     * Event Handlers
     */
    function onDragStart(e: DragEvent, type: BlockType): void {
        const uid: string = createUniqueId();

        canvasSetters.setDragState({
            subjectUid: uid,
            subjectParentUid: 'root',
            mouseX: e.pageX,
            mouseY: e.pageY,
            isValidDropzone: false,
            isNew: true,
            newBlock: createBlock(type, uid, {}),
        });
    }

    function onDragEnd(e: DragEvent): void {
        canvasSetters.moveDraggedBlock();
        canvasSetters.setDragState(undefined as unknown as DragState);
    }

    /**
     * Procedural Function
     */
    function isActiveGroup(group: BlockGroup): boolean {
        return activeGroups().includes(group);
    }

    return (
        <div class={styles.section}>
            <For each={BLOCK_GROUPS}>
                {(blockGroup: BlockGroupConfig, gIdx: Accessor<number>): JSX.Element => {
                    return (
                        <>
                            <div
                                class={[
                                    styles.groupHeader,
                                    isActiveGroup(blockGroup.group) ? styles.activeGroupHeader : '',
                                ].join(' ')}
                                onClick={(e: MouseEvent): BlockGroup[] => {
                                    return setActiveGroups([...activeGroups(), blockGroup.group]);
                                }}
                            >
                                {blockGroup.label}
                            </div>
                            <div
                                class={[
                                    styles.groupBody,
                                    isActiveGroup(blockGroup.group) ? styles.activeGroupBody : '',
                                ].join(' ')}
                            >
                                <For
                                    each={BLOCK_TYPES().filter((blockType: BlockTypeConfig): boolean => {
                                        return blockType.group === blockGroup.group;
                                    })}
                                >
                                    {(blockType: BlockTypeConfig, tIdx: Accessor<number>): JSX.Element => {
                                        return (
                                            <div
                                                class={styles.typeItem}
                                                draggable={true}
                                                onDragStart={(e: DragEvent): void => onDragStart(e, blockType.type)}
                                                onDragEnd={onDragEnd}
                                            >
                                                {blockType.label}
                                            </div>
                                        );
                                    }}
                                </For>
                            </div>
                        </>
                    );
                }}
            </For>
        </div>
    );
};
