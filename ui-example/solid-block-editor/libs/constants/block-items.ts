import { BlockNode, BlockType, HeadType } from '../blocks.types';
import { createBlock } from '../utils/block.utils';

export const ROOT_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Root, uid, {
        attrs: {
            styles: {
                size: {
                    width: { value: '100', format: '%' },
                    height: { value: '100', format: '%' },
                },
                display: {
                    display: { value: 'flex' },
                    justifyContent: { value: 'flex-start' },
                    alignItems: { value: 'center' },
                    flexDirection: { value: 'row' },
                },
            },
        },
    });
};

export const TEXT_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Text, uid, {
        content: '<span>This is text content</span>',
    });
};

export const HEAD_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Head, uid, {
        options: {
            headType: HeadType.H1,
        },
        content: 'Header Content',
    });
};

export const SECTION_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Section, uid, {
        attrs: {
            styles: {
                size: {
                    width: { value: '100', format: '%' },
                    paddingTop: { value: '5', format: 'rem' },
                    paddingRight: { value: '5', format: 'rem' },
                    paddingBottom: { value: '5', format: 'rem' },
                    paddingLeft: { value: '5', format: 'rem' },
                },
                display: {
                    display: { value: 'flex' },
                    justifyContent: { value: 'flex-start' },
                    alignItems: { value: 'center' },
                    flexDirection: { value: 'row' },
                },
            },
        },
    });
};

export const CELL_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Cell, uid, {
        attrs: {
            styles: {
                size: {
                    width: { value: '100', format: '%' },
                    paddingTop: { value: '5', format: 'rem' },
                    paddingRight: { value: '5', format: 'rem' },
                    paddingBottom: { value: '5', format: 'rem' },
                    paddingLeft: { value: '5', format: 'rem' },
                },
                display: {
                    display: { value: 'flex' },
                    justifyContent: { value: 'flex-start' },
                    alignItems: { value: 'center' },
                    flexDirection: { value: 'row' },
                },
            },
        },
    });
};

export const ROW_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Row, uid, {
        attrs: {
            styles: {
                size: {
                    width: { value: '100', format: '%' },
                    paddingTop: { value: '5', format: 'rem' },
                    paddingRight: { value: '5', format: 'rem' },
                    paddingBottom: { value: '5', format: 'rem' },
                    paddingLeft: { value: '5', format: 'rem' },
                },
                display: {
                    display: { value: 'flex' },
                    justifyContent: { value: 'flex-start' },
                    alignItems: { value: 'center' },
                    flexDirection: { value: 'row' },
                },
            },
        },
    });
};

export const GRID_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Grid, uid, {
        attrs: {
            styles: {
                size: {
                    width: { value: '100', format: '%' },
                    paddingTop: { value: '5', format: 'rem' },
                    paddingRight: { value: '5', format: 'rem' },
                    paddingBottom: { value: '5', format: 'rem' },
                    paddingLeft: { value: '5', format: 'rem' },
                },
                display: {
                    display: { value: 'flex' },
                    justifyContent: { value: 'flex-start' },
                    alignItems: { value: 'center' },
                    flexDirection: { value: 'row' },
                },
            },
        },
    });
};

export const BUTTON_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Button, uid, {
        attrs: {
            settings: {
                type: 'button',
                text: 'On Click',
                onClick: (e: MouseEvent) => {
                    console.log('click buttton: uid: ', uid);
                },
            },
        },
    });
};

export const LIST_ITEM_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.ListItem, uid, {});
};

export const LIST_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.List, uid, {});
};

export const IMAGE_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Image, uid, {});
};

export const VIDEO_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Video, uid, {});
};

export const LINK_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Link, uid, {});
};

export const INPUT_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Input, uid, {});
};

export const TEXTAREA_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Textarea, uid, {});
};

export const RADIO_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Radio, uid, {});
};

export const CHECKBOX_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Checkbox, uid, {});
};

export const SELECT_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Select, uid, {});
};

export const FORM_BLOCK = (uid: string): BlockNode => {
    return createBlock(BlockType.Form, uid, {});
};
