import { createSignal, createEffect, Accessor } from 'solid-js';

import * as AttrUtils from '../utils/attr.utils';
import sharedStyles from '../ui/blocks/blocks.module.css';

export type BlockClassNameGetters = {
    classList: Accessor<string[]>;
    mapClassNames: (blockRef: HTMLElement, customClassNames?: string[]) => void;
};

export type BlockClassNameSetters = {};

export type BlockClassNameHook = [BlockClassNameGetters, BlockClassNameSetters];

export function useBlockClassNames(blockClassNames: string[]): BlockClassNameHook {
    const [classList, setClassList] = createSignal<string[]>(blockClassNames);

    createEffect((): void => {
        setClassList(blockClassNames);
    });

    function mapClassNames(blockRef: HTMLElement, customClassNames?: string[]): void {
        blockRef.setAttribute(
            'class',
            AttrUtils.formatClassNames([...(classList() ?? []), ...(customClassNames ?? []), sharedStyles.blockStatic])
        );
    }

    return [
        {
            classList,
            mapClassNames,
        },
        {},
    ];
}
