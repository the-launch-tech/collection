import { createSignal, createEffect, Accessor } from 'solid-js';

import * as AttrUtils from '../utils/attr.utils';

export type BlockStylesGetters = {
    styles: Accessor<Record<string, string>>;
    mapStyles: (blockRef: HTMLElement) => void;
};

export type BlockStylesSetters = {};

export type BlockStylesHook = [BlockStylesGetters, BlockStylesSetters];

export function useBlockStyles(blockStyles: Record<string, Record<string, any>>): BlockStylesHook {
    const [styles, setStyles] = createSignal<Record<string, string>>({
        ...AttrUtils.formatStyles(blockStyles.size),
        ...AttrUtils.formatStyles(blockStyles.display),
        ...AttrUtils.formatStyles(blockStyles.position),
        ...AttrUtils.formatStyles(blockStyles.typography),
        ...AttrUtils.formatStyles(blockStyles.decorations),
        ...AttrUtils.formatStyles(blockStyles.extra),
    });

    createEffect((): void => {
        setStyles({
            ...AttrUtils.formatStyles(blockStyles.size),
            ...AttrUtils.formatStyles(blockStyles.display),
            ...AttrUtils.formatStyles(blockStyles.position),
            ...AttrUtils.formatStyles(blockStyles.typography),
            ...AttrUtils.formatStyles(blockStyles.decorations),
            ...AttrUtils.formatStyles(blockStyles.extra),
        });
    });

    function mapStyles(blockRef: HTMLElement): void {
        for (const styleKey of Object.keys(styles())) {
            blockRef.style[styleKey as any] = styles()[styleKey];
        }
    }

    return [
        {
            styles,
            mapStyles,
        },
        {},
    ];
}
