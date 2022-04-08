import { Component } from 'solid-js';

import { BlockType, BlockGroup, BlockTypeConfig, DeepPartial, BlockNode } from '../blocks.types';
import { BLOCK_TYPES } from '../constants/block-types';

export function getBlockTypeGroup(type: BlockType): BlockGroup {
    return BLOCK_TYPES().find((blockType: BlockTypeConfig): boolean => blockType.type === type)?.group as BlockGroup;
}

export function getBlockTypeComponent(type: BlockType): Component<{}> {
    return BLOCK_TYPES().find((blockType: BlockTypeConfig): boolean => blockType.type === type)
        ?.Component as Component<{}>;
}

export function createBlock(type: BlockType, uid: string, configOverrides: DeepPartial<BlockNode>): BlockNode {
    return {
        uid,
        parentUid: configOverrides.parentUid ?? 'root',
        childUids: (configOverrides.childUids as string[]) ?? [],
        type,
        attrs: {
            classNames: (configOverrides.attrs?.classNames as string[]) ?? [],
            styles: {
                size: (configOverrides.attrs?.styles?.size as Record<string, string>) ?? {},
                display: (configOverrides.attrs?.styles?.display as Record<string, string>) ?? {},
                position: (configOverrides.attrs?.styles?.position as Record<string, string>) ?? {},
                typography: (configOverrides.attrs?.styles?.typography as Record<string, string>) ?? {},
                decorations: (configOverrides.attrs?.styles?.decorations as Record<string, string>) ?? {},
                extra: (configOverrides.attrs?.styles?.extra as Record<string, string>) ?? {},
            },
            settings: (configOverrides.attrs?.settings as Record<string, string>) ?? {},
        },
        content: configOverrides?.content ?? undefined,
    };
}
