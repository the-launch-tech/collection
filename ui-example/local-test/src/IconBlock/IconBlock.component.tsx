import { BlockProps, MountBlock } from 'solid-block-editor/libs/ui/blocks/MountBlock.hoc';
import { Component, JSX, createEffect } from 'solid-js';
import { useCanvasContext } from '../../../solid-block-editor/libs/contexts/canvas.context';
import { useBlockClassNames } from '../../../solid-block-editor/libs/hooks/use-block-class-names.hook';
import { useBlockStyles } from '../../../solid-block-editor/libs/hooks/use-block-styles.hook';

export type IconBlockProps = {
    icon: string;
};

export const Icon: Component<BlockProps<IconBlockProps>> = (props): JSX.Element => {
    /**
     * HTML Refs
     */
    let blockRef!: HTMLElement;

    /**
     * Injection
     */
    const [blockClassNames, blockClassNameHelpers] = useBlockClassNames(props.block.attrs.classNames);
    const [blockStyles, blockStylesHelpers] = useBlockStyles(props.block.attrs.styles);

    /**
     * Lifecycle Methods
     */
    if (props.isEditor) {
        createEffect((): void => {
            blockStylesHelpers.mapBlockStyles(blockRef, {
                ...blockStyles.size(),
                ...blockStyles.display(),
                ...blockStyles.position(),
                ...blockStyles.decorations(),
                ...blockStyles.extra(),
                ...blockStyles.typography(),
            });
        });
    }

    /**
     * Event Handlers
     */
    function onClick(e: MouseEvent): void {
        if (props.isEditor) {
            props.onClick(e);
            return;
        }

        // do stuff in application
    }

    /**
     * JSX Result
     */
    return (
        <span
            ref={(ref: HTMLElement): HTMLElement => (blockRef = props.ref(ref))}
            id={AttrUtils.getBlockId(props.block)}
            class={blockClassNameHelpers.getClassNames(['example-button-one'])}
            draggable={props.isEditor && props.config.isDraggable}
            onDragStart={props.onDragStart}
            onDragEnd={props.onDragEnd}
            onDragOver={props.onDragOver}
            onClick={onClick}
        >
            <i class={props.icon ? props.icon : 'fal fa-trash'}></i>
        </span>
    );
};

export const IconBlock = MountBlock(Icon, {
    isSelectable: true,
    isHoverable: true,
    isDraggable: true,
    isResizable: false,
    isRichText: false,
});
