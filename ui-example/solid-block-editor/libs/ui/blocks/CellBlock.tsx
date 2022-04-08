import { children, createEffect, JSX, on } from 'solid-js';

import { ResizeFace } from '../../blocks.types';
import { MountBlock } from './MountBlock.hoc';
import { useBlockClassNames } from '../../hooks/use-block-class-names.hook';
import { useBlockStyles } from '../../hooks/use-block-styles.hook';
import sharedStyles from '../blocks.module.css';

export const CellBlock = MountBlock(
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
            <div
                ref={(ref: HTMLElement): HTMLElement => (blockRef = props.ref(ref))}
                id={`sbe-block-${props.block.type}-${props.block.uid}`}
                draggable={props.config.isDraggable}
                onDragStart={props.onDragStart}
                onDragEnd={props.onDragEnd}
                onDragOver={props.onDragOver}
                onClick={props.onClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            >
                {childrenMemo()}
            </div>
        );
    },
    {
        isHoverable: true,
        isSelectable: true,
        isDraggable: true,
        isResizable: true,
        isRichText: false,
        resizeOptions: [ResizeFace.Right, ResizeFace.Left],
    }
);
