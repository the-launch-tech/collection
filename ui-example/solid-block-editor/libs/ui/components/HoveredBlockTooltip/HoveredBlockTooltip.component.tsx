import { Component, createEffect, createSignal, JSX, on, onMount, Show } from 'solid-js';

import styles from './HoveredBlockTooltip.module.css';
import { BlockNode } from '../../../blocks.types';
import { useCanvasContext } from '../../../contexts/canvas.context';

export type Position = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
};

export type HoveredBlockTooltipProps = {};

export const HoveredBlockTooltip: Component<HoveredBlockTooltipProps> = (props): JSX.Element => {
    /**
     * First Class Assignments
     */
    let ref!: HTMLDivElement;
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
        on(canvas.hoveredBlockStack, (hoveredBlockStack: BlockNode[]): void => {
            if (!hoveredBlockStack?.length) {
                setBlockRef(undefined as unknown as HTMLDivElement);
            } else if (blockRefMap[hoveredBlockStack[hoveredBlockStack.length - 1].uid]) {
                setBlockRef(blockRefMap[hoveredBlockStack[hoveredBlockStack.length - 1].uid]);
            } else {
                const id: string = getElementId(hoveredBlockStack[hoveredBlockStack.length - 1]);
                const element: HTMLDivElement = document.getElementById(id) as HTMLDivElement;
                blockRefMap[hoveredBlockStack[hoveredBlockStack.length - 1].uid] = element;
                setBlockRef(blockRefMap[hoveredBlockStack[hoveredBlockStack.length - 1].uid]);
            }
        })
    );

    createEffect(
        on(blockRef, (blockRef: HTMLDivElement): void => {
            if (!ref || !blockRef) {
                return;
            }

            const rect: DOMRect = blockRef.getBoundingClientRect();

            if (rect.top - 34 <= 0) {
                ref.style.top = rect.bottom + 'px'; // Align on bottom face, extending outwards
                ref.style.left = rect.left + 'px'; // Align on left face, extending inwards
            } else {
                ref.style.top = rect.top - 34 + 'px'; // Align on top face, extending outwards
                ref.style.left = rect.left + 'px'; // Align on left face, extending inwards
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
     * JSX
     */
    return (
        <Show when={canvas.hoveredBlockStack()?.length}>
            <div ref={ref} class={styles.tooltipWrapper}>
                {canvas.hoveredBlockStack()[canvas.hoveredBlockStack().length - 1]?.type}
            </div>
        </Show>
    );
};
