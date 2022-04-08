import { Accessor, Component, createEffect, createSignal, For, JSX, on, Show } from 'solid-js';

import { SelectedBlockTooltipOption, SelectionActionType } from './config';

import styles from './SelectedBlockTooltip.module.css';
import { BlockNode } from '../../../blocks.types';
import { useCanvasContext } from '../../../contexts/canvas.context';

export type SelectedBlockTooltipProps = {};

export const SelectedBlockTooltip: Component<SelectedBlockTooltipProps> = (props): JSX.Element => {
    /**
     * First Class Assignments
     */
    let ref!: HTMLDivElement;
    const blockRefMap: { [uid: string]: HTMLDivElement } = {};
    const tooltipOptions: SelectedBlockTooltipOption[] = [
        {
            type: SelectionActionType.SelectParent,
            icon: 'fal fa-copy',
            action: selectParentBlock,
        },
        {
            type: SelectionActionType.Copy,
            icon: 'fal fa-copy',
            action: copySelectedBlock,
        },
        {
            type: SelectionActionType.Delete,
            icon: 'fal fa-trash',
            action: deleteSelectedBlock,
        },
    ];

    /**
     * Injections
     */
    const [canvas, canvasSetters] = useCanvasContext();

    /**
     * Component State
     */
    const [blockRef, setBlockRef] = createSignal<HTMLDivElement>(undefined as unknown as HTMLDivElement);

    /**
     * Lifecycle Hooks
     */
    createEffect(
        on(canvas.selectedBlock, (selectedBlock: BlockNode): void => {
            if (!selectedBlock) {
                setBlockRef(undefined as unknown as HTMLDivElement);
                return;
            }

            if (blockRefMap[selectedBlock.uid]) {
                setBlockRef(blockRefMap[selectedBlock.uid]);
                return;
            }

            const id: string = getElementId(selectedBlock);
            const element: HTMLDivElement = document.getElementById(id) as HTMLDivElement;

            blockRefMap[selectedBlock.uid] = element;

            setBlockRef(blockRefMap[selectedBlock.uid]);
        })
    );

    createEffect(
        on(blockRef, (blockRef: HTMLDivElement): void => {
            if (!blockRef) {
                return;
            }

            const rect: DOMRect = blockRef.getBoundingClientRect();

            if (rect.top - 34 <= 0) {
                ref.style.top = rect.bottom + 'px'; // Align on bottom face, extending outwards
                ref.style.right = window.innerWidth - rect.right + 'px'; // Align on right face, extending inwards
            } else {
                ref.style.top = rect.top - 34 + 'px'; // Align on top face, extending outwards
                ref.style.right = window.innerWidth - rect.right + 'px'; // Align on right face, extending inwards
            }
        })
    );

    /**
     * Procedural Functions
     */
    function getElementId(block: BlockNode): string {
        return block.type === 'root' ? 'sbe-block-body' : `sbe-block-${block.type}-${block.uid}`;
    }

    function selectParentBlock(): void {
        canvasSetters.selectParentBlock();
    }

    function deleteSelectedBlock(): void {
        canvasSetters.deleteSelectedBlock();
    }

    function copySelectedBlock(): void {
        canvasSetters.copySelectedBlock();
    }

    /**
     * JSX
     */
    return (
        <Show when={canvas.selectedBlock()}>
            <div ref={ref} id='sbe-selected-block-tooltip' class={styles.tooltipWrapper}>
                <ul class={styles.tooltipList}>
                    <For each={tooltipOptions}>
                        {(tooltipOption: SelectedBlockTooltipOption, idx: Accessor<number>): JSX.Element => {
                            return (
                                <li class={styles.tooltipOption} onClick={() => tooltipOption.action()}>
                                    <i class={[styles.tooltipIcon, tooltipOption.icon].join(' ')}></i>
                                </li>
                            );
                        }}
                    </For>
                </ul>
            </div>
        </Show>
    );
};
