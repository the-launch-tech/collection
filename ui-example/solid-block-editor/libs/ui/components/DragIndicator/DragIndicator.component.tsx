import { Component, createEffect, createSignal, JSX, on, Show } from 'solid-js';

import styles from './DragIndicator.module.css';
import { BlockNode, DragState } from '../../../blocks.types';
import { useCanvasContext } from '../../../contexts/canvas.context';

export type DragIndicatorProps = {};

export const DragIndicator: Component<DragIndicatorProps> = (props): JSX.Element => {
    /**
     * First Class Assignments
     */
    let ref!: HTMLElement;

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

            ref.style.top = dragState.mouseY - 20 / 2 + 'px';
            ref.style.left = dragState.mouseX - 20 / 2 + 'px';
        })
    );

    /**
     * JSX
     */
    return (
        <Show when={canvas.isDragging()}>
            <div
                ref={(r) => (ref = r as unknown as HTMLElement)}
                id='sbe-drag-indicator'
                class={styles.indicatorWrapper}
            ></div>
        </Show>
    );
};
