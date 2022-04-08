export enum SelectionActionType {
    SelectParent = 'select-parent',
    Drag = 'drag',
    Copy = 'copy',
    Delete = 'delete',
}

export interface SelectedBlockTooltipOption {
    type: SelectionActionType;
    icon: string;
    action: (...args: any[]) => any;
}

export const tooltipOptions: SelectedBlockTooltipOption[] = [
    {
        type: SelectionActionType.SelectParent,
        icon: 'fal fa-copy',
        action: (...args: any[]): any => {},
    },
    {
        type: SelectionActionType.Drag,
        icon: 'fal fa-copy',
        action: (...args: any[]): any => {},
    },
    {
        type: SelectionActionType.Copy,
        icon: 'fal fa-copy',
        action: (...args: any[]): any => {},
    },
    {
        type: SelectionActionType.Delete,
        icon: 'fal fa-trash',
        action: (...args: any[]): any => {},
    },
];
