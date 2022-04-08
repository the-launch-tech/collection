import { Component, createEffect, createSignal, JSX, on, onMount } from 'solid-js';

import styles from './ResizeIndicator.module.css';
import { useCanvasContext } from '../../../contexts/canvas.context';
import { BlockNode, BlockType } from '../../../blocks.types';

export interface ResizeIndicatorOptions {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
}

export type ResizeIndicatorProps = {
    options?: {
        [K in BlockType]: ResizeIndicatorOptions;
    };
};

export const ResizeIndicator: Component<ResizeIndicatorProps> = (props): JSX.Element => {
    /**
     * First Class Assignments
     */
    let topRef!: HTMLDivElement;
    let rightRef!: HTMLDivElement;
    let bottomRef!: HTMLDivElement;
    let leftRef!: HTMLDivElement;
    const blockRefMap: { [uid: string]: HTMLDivElement } = {};

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
            const canvasRect: DOMRect = canvas.DOMRect();

            const blockTypeOptions: ResizeIndicatorOptions | undefined = (props.options || {})[
                canvas.selectedBlock().type
            ];

            if (!blockTypeOptions) {
                return;
            }

            if (blockTypeOptions.top) {
                topRef.style.top = rect.top - 4 + 'px';
                topRef.style.right = undefined as unknown as string;
                topRef.style.bottom = undefined as unknown as string;
                topRef.style.left = (rect.right + rect.left) / 2 + 4 + 'px';
            }

            if (blockTypeOptions.right) {
                bottomRef.style.top = (rect.top + rect.bottom) / 2 - 4 + 'px';
                bottomRef.style.right = rect.right - 4 + 'px';
                bottomRef.style.bottom = undefined as unknown as string;
                bottomRef.style.left = undefined as unknown as string;
            }

            if (blockTypeOptions.bottom) {
                bottomRef.style.top = undefined as unknown as string;
                bottomRef.style.right = undefined as unknown as string;
                bottomRef.style.bottom = rect.top - 4 + 'px';
                bottomRef.style.left = (rect.right + rect.left) / 2 + 4 + 'px';
            }

            if (blockTypeOptions.left) {
                bottomRef.style.top = (rect.top + rect.bottom) / 2 - 4 + 'px';
                bottomRef.style.right = undefined as unknown as string;
                bottomRef.style.bottom = undefined as unknown as string;
                bottomRef.style.left = rect.left - 4 + 'px';
            }
        })
    );

    /**
     * Procedural Functions
     */
    function getElementId(block: BlockNode): string {
        return block.type === 'root' ? 'sbe-block-body' : `sbe-block-${block.type}-${block.uid}`;
    }

    /**
     * Event Handlers
     */
    function onMouseDown(e: MouseEvent, size: 'top' | 'right' | 'bottom' | 'left'): void {}

    function onMouseUp(e: MouseEvent, size: 'top' | 'right' | 'bottom' | 'left'): void {}

    return (
        <>
            <div
                ref={topRef}
                class={styles.resizeIndicatorNode}
                onMouseDown={(e) => onMouseDown(e, 'top')}
                onMouseUp={(e) => onMouseUp(e, 'top')}
            ></div>
            <div
                ref={rightRef}
                class={styles.resizeIndicatorNode}
                onMouseDown={(e) => onMouseDown(e, 'right')}
                onMouseUp={(e) => onMouseUp(e, 'right')}
            ></div>
            <div
                ref={bottomRef}
                class={styles.resizeIndicatorNode}
                onMouseDown={(e) => onMouseDown(e, 'bottom')}
                onMouseUp={(e) => onMouseUp(e, 'bottom')}
            ></div>
            <div
                ref={leftRef}
                class={styles.resizeIndicatorNode}
                onMouseDown={(e) => onMouseDown(e, 'left')}
                onMouseUp={(e) => onMouseUp(e, 'left')}
            ></div>
        </>
    );
};
