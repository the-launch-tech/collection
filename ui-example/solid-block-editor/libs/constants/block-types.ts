import { BlockTypeConfig, BlockType, BlockGroup } from '../blocks.types';

import { RootBlock } from '../ui/blocks/RootBlock.component';
import { TextBlock } from '../ui/blocks/TextBlock.component';
import { SectionBlock } from '../ui/blocks/SectionBlock.component';
import { ButtonBlock } from '../ui/blocks/ButtonBlock.component';

export const BLOCK_TYPES = (): BlockTypeConfig[] => {
    return [
        {
            label: 'Root',
            type: BlockType.Root,
            group: BlockGroup.Core,
            Component: RootBlock,
        },
        {
            label: 'Text',
            type: BlockType.Text,
            group: BlockGroup.Core,
            Component: TextBlock,
        },
        {
            label: 'Head',
            type: BlockType.Head,
            group: BlockGroup.Core,
            Component: TextBlock,
        },
        {
            label: 'Cell',
            type: BlockType.Cell,
            group: BlockGroup.Core,
            Component: TextBlock,
        },
        {
            label: 'Row',
            type: BlockType.Row,
            group: BlockGroup.Core,
            Component: TextBlock,
        },
        {
            label: 'Grid',
            type: BlockType.Grid,
            group: BlockGroup.Complex,
            Component: TextBlock,
        },
        {
            label: 'Section',
            type: BlockType.Section,
            group: BlockGroup.Core,
            Component: SectionBlock,
        },
        {
            label: 'List',
            type: BlockType.List,
            group: BlockGroup.Complex,
            Component: SectionBlock,
        },
        {
            label: 'List Item',
            type: BlockType.ListItem,
            group: BlockGroup.Complex,
            Component: SectionBlock,
        },
        {
            label: 'Form',
            type: BlockType.Form,
            group: BlockGroup.Complex,
            Component: SectionBlock,
        },
        {
            label: 'Select',
            type: BlockType.Select,
            group: BlockGroup.Input,
            Component: SectionBlock,
        },
        {
            label: 'Radio Button',
            type: BlockType.Radio,
            group: BlockGroup.Input,
            Component: SectionBlock,
        },
        {
            label: 'Checkbox',
            type: BlockType.Checkbox,
            group: BlockGroup.Input,
            Component: SectionBlock,
        },
        {
            label: 'Textarea',
            type: BlockType.Textarea,
            group: BlockGroup.Input,
            Component: SectionBlock,
        },
        {
            label: 'Button',
            type: BlockType.Button,
            group: BlockGroup.Core,
            Component: ButtonBlock,
        },
        {
            label: 'Image',
            type: BlockType.Image,
            group: BlockGroup.Core,
            Component: SectionBlock,
        },
        {
            label: 'Video',
            type: BlockType.Video,
            group: BlockGroup.Core,
            Component: SectionBlock,
        },
    ];
};
