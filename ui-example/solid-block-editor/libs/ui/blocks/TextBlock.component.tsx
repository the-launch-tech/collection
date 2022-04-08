import { JSX, createEffect, createSignal, on } from 'solid-js';

import sharedStyles from './blocks.module.css';
import { useCanvasContext } from '../../contexts/canvas.context';
import { MountBlock, BlockProps } from './MountBlock.hoc';
import { useBlockClassNames } from '../../hooks/use-block-class-names.hook';
import { useBlockStyles } from '../../hooks/use-block-styles.hook';

export const TextBlock = MountBlock(
    (props): JSX.Element => {
        /**
         * HTML Refs
         */
        let blockRef!: HTMLElement;

        /**
         * Injection
         */
        const [canvas, canvasSetters] = useCanvasContext();
        const [blockClassNames] = useBlockClassNames(props.block.attrs.classNames);
        const [blockStyles] = useBlockStyles(props.block.attrs.styles);

        /**
         * Component State
         */
        const [value, setValue] = createSignal<string>('');

        /**
         * Lifecycle Methods
         */
        createEffect(
            on(canvas.richTextSelectedBlock, (): void => {
                if (canvas.isBlockRichTextSelected(props.block)) {
                    blockRef.classList.add(sharedStyles.blockRichTextSelected);
                    blockRef.contentEditable = 'true';
                    blockRef.style.cursor = 'auto';
                } else {
                    blockRef.classList.remove(sharedStyles.blockRichTextSelected);
                    blockRef.contentEditable = 'false';
                    blockRef.style.cursor = 'default';
                }
            })
        );

        createEffect(
            on(blockStyles.styles, (newValue: Record<string, string>): void => {
                blockStyles.mapStyles(blockRef);
            })
        );

        createEffect(
            on(blockClassNames.classList, (newValue: string[]): void => {
                blockClassNames.mapClassNames(blockRef);
            })
        );

        /**
         * Event Handlers
         */
        function onInput(e: InputEvent): void {
            setValue((e?.currentTarget as any)?.textContent);
        }

        function onDblClick(e: MouseEvent): void {
            e.stopPropagation();
            canvasSetters.setRichTextSelectedBlock(props.block);
        }

        return (
            <div
                ref={(ref: HTMLElement): HTMLElement => (blockRef = props.ref(ref))}
                id={`sbe-block-${props.block.type}-${props.block.uid}`}
                contentEditable={props.config.isRichText}
                innerHTML={props.block.content}
                draggable={props.config.isDraggable}
                onDragStart={props.onDragStart}
                onDragEnd={props.onDragEnd}
                onDragOver={props.onDragOver}
                onClick={props.onClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                onInput={onInput}
                onDblClick={onDblClick}
            ></div>
        );
    },
    {
        isHoverable: true,
        isSelectable: true,
        isRichText: true,
        isDraggable: true,
        isResizable: false,
    }
);
