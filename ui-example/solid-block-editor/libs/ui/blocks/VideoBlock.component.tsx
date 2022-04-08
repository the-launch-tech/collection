import { children, createEffect, JSX, on } from 'solid-js';

import { ResizeFace } from '../../blocks.types';
import { MountBlock } from './MountBlock.hoc';
import { useBlockClassNames } from '../../hooks/use-block-class-names.hook';
import { useBlockStyles } from '../../hooks/use-block-styles.hook';

export const VideoBlock = MountBlock(
    (props): JSX.Element => {
        /**
         * HTML Refs
         */
        let blockRef!: HTMLElement;
        const childrenMemo = children(() => props.children);

        /**
         * Injection
         */
        const [blockClassNames] = useBlockClassNames(props.block.attrs.classNames);
        const [blockStyles] = useBlockStyles(props.block.attrs.styles);

        /**
         * Lifecycle Methods
         */
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
         * JSX Element
         */
        return (
            <video
                ref={(ref: HTMLElement): HTMLElement => (blockRef = props.ref(ref))}
                id={`sbe-block-${props.block.type}-${props.block.uid}`}
                draggable={props.config.isDraggable}
                onDragStart={props.onDragStart}
                onDragEnd={props.onDragEnd}
                onDragOver={props.onDragOver}
                onClick={props.onClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            ></video>
        );
    },
    {
        isHoverable: true,
        isSelectable: true,
        isDraggable: true,
        isResizable: true,
        isRichText: false,
        resizeOptions: [ResizeFace.Bottom, ResizeFace.Left, ResizeFace.Right],
    }
);
