import { Component, createEffect, createSignal, JSX, on, Show } from 'solid-js';

import styles from './DropIndicator.module.css';
import { BlockNode, DragState } from '../../../blocks.types';
import { useCanvasContext } from '../../../contexts/canvas.context';

export type DropIndicatorProps = {};

export const DropIndicator: Component<DropIndicatorProps> = (props): JSX.Element => {
    /**
     * First Class Assignments
     */
    let ref!: HTMLDivElement;

    /**
     * Injections
     */
    const [canvas, canvasSetters] = useCanvasContext();

    /**
     * Lifecycle Hooks
     */
    createEffect(
        on(canvas.dragState, (dragState: DragState): void => {
            if (!dragState) {
                return;
            }

            const dropzoneBlock: BlockNode | undefined = canvas
                .blockList()
                .find((block: BlockNode): boolean => block.uid === dragState.dropzoneUid);

            const dropBehavior = dragState.dropBehavior;

            if (!dropzoneBlock) {
                return;
            }

            const id: string = getElementId(dropzoneBlock);
            const elementRef: HTMLDivElement = document.getElementById(id) as HTMLDivElement;
            const rect: DOMRect = elementRef.getBoundingClientRect();

            switch (dropBehavior) {
                case 'left':
                    ref.style.top = rect.top + 'px';
                    ref.style.left = rect.left + 'px';
                    ref.style.right = undefined as any;
                    ref.style.height = rect.height + 'px';
                    ref.style.width = 4 + 'px';
                    break;
                case 'right':
                    ref.style.top = rect.top + 'px';
                    ref.style.left = undefined as any;
                    ref.style.right = rect.right + 'px';
                    ref.style.height = rect.height + 'px';
                    ref.style.width = 4 + 'px';
                    break;
                case 'child':
                    ref.style.top = rect.top - rect.height / 2 + 'px';
                    ref.style.left = rect.left + rect.width / 2 - 20 + 'px';
                    ref.style.right = undefined as any;
                    ref.style.height = rect.height / 4 + 'px';
                    ref.style.width = rect.width / 4 + 'px';
                    break;
                default:
                    return;
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
        <Show when={canvas.isDragging()}>
            <div ref={ref} id='sbe-drop-indicator' class={styles.indicatorWrapper}></div>
        </Show>
    );
};
