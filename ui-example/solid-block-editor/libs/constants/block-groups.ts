import { BlockGroupConfig, BlockGroup } from '../blocks.types';

export const BLOCK_GROUPS: BlockGroupConfig[] = [
    {
        label: 'Basic',
        group: BlockGroup.Core,
    },
    {
        label: 'Inputs',
        group: BlockGroup.Input,
    },
    {
        label: 'Complex',
        group: BlockGroup.Complex,
    },
    {
        label: 'Custom',
        group: BlockGroup.Custom,
    },
];
