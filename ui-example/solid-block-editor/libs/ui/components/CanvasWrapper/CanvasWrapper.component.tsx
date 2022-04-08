import { Component, createSignal, JSX, createEffect, onMount, onCleanup, on, children } from 'solid-js';

import { RootBlock } from '../../blocks/RootBlock.component';
import { useCanvasContext } from '../../../contexts/canvas.context';

import { HoveredBlockTooltip } from '../HoveredBlockTooltip/HoveredBlockTooltip.component';
import { SelectedBlockTooltip } from '../SelectedBlockTooltip/SelectedBlockTooltip.component';
import { RichTextTooltip } from '../RichTextTooltip/RichTextTooltip.component';
import { BlockNode } from '../../../blocks.types';
import { ResizeIndicator } from '../ResizeIndicator/ResizeIndicator.component';
import { DragIndicator } from '../DragIndicator/DragIndicator.component';
import { DropIndicator } from '../DropIndicator/DropIndicator.component';

import styles from './CanvasWrapper.module.css';

export type CanvasWrapperProps = {};

export const CanvasWrapper: Component<CanvasWrapperProps> = (props: CanvasWrapperProps): JSX.Element => {
    let ref!: HTMLDivElement;

    const [canvas, canvasSetters] = useCanvasContext();

    onMount((): void => {
        onWindowResize();
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('click', onWindowClick);
    });

    onCleanup((): void => {
        window.removeEventListener('click', onWindowClick);
    });

    function onWindowResize(): void {
        canvasSetters.setDOMRect(ref.getBoundingClientRect());
    }

    function onWindowClick(e: MouseEvent): void {
        const richTextTooltipRef: HTMLElement = document.getElementById('sbe-rich-text-tooltip') as HTMLElement;
        const selectedBlockTooltipRef: HTMLElement = document.getElementById(
            'sbe-selected-block-tooltip'
        ) as HTMLElement;

        const richTextPathIndex: number = ((e as any).path ?? []).findIndex((p: any) => p === richTextTooltipRef);
        const selectedBlockPathIndex: number = ((e as any).path ?? []).findIndex(
            (p: any) => p === selectedBlockTooltipRef
        );

        if (richTextPathIndex > -1 || selectedBlockPathIndex > -1) {
            return;
        }

        canvasSetters.setRichTextSelectedBlock(undefined as unknown as BlockNode);
        canvasSetters.setSelectedBlock(undefined as unknown as BlockNode);
    }

    return (
        <div class={styles.wrapper}>
            <div
                ref={ref}
                id='sbe-canvas'
                class={styles.canvas}
                style={{
                    height: '100%',
                    width: canvas.getWidth('100%', '991px', '600px'),
                }}
            >
                <HoveredBlockTooltip />
                <SelectedBlockTooltip />
                <RichTextTooltip />
                <DragIndicator />
                <DropIndicator />
                {/* <ResizeIndicator /> */}
                <RootBlock uid={'root'} />
            </div>
        </div>
    );
};
