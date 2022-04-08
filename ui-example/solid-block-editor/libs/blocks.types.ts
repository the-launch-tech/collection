import { Component } from 'solid-js';

export enum BlockGroup {
    Core = 'core',
    Input = 'input',
    Complex = 'complex',
    Custom = 'custom',
}

export enum BlockType {
    Root = 'root',
    Text = 'text',
    Head = 'head',
    Cell = 'cell',
    Row = 'row',
    Grid = 'grid',
    Section = 'section',
    List = 'list',
    ListItem = 'list-item',
    Form = 'form',
    Input = 'input',
    Select = 'select',
    Radio = 'radio',
    Checkbox = 'checkbox',
    Textarea = 'textarea',
    Link = 'link',
    Button = 'button',
    Image = 'image',
    Video = 'video',
}

export interface BlockGroupConfig {
    label: string;
    group: BlockGroup;
}

export interface BlockTypeConfig {
    label: string;
    type: BlockType;
    group: BlockGroup;
    Component: Component<any>;
}

export enum HeadType {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6',
}

export enum ViewPortSize {
    Mobile = 'mobile',
    Tablet = 'tablet',
    Desktop = 'desktop',
}

export enum ViewPortType {
    Editor = 'editor',
    Preview = 'preview',
    FullScreenEditor = 'full-screen-editor',
}

export type DisplayCssProp =
    | 'display'
    | 'flexContainer'
    | 'flexParent'
    | 'direction'
    | 'justifyContent'
    | 'alignItems'
    | 'alignContent'
    | 'flexChildren'
    | 'flexDirection'
    | 'order'
    | 'grow'
    | 'shrink'
    | 'basis'
    | 'gridTemplate';
export type PositionCssProp = 'position' | 'top' | 'right' | 'bottom' | 'left';
export type SizeCssProp =
    | 'width'
    | 'height'
    | 'maxWidth'
    | 'maxHeight'
    | 'minWidth'
    | 'minHeight'
    | 'marginTop'
    | 'marginRight'
    | 'marginBottom'
    | 'marginLeft'
    | 'paddingTop'
    | 'paddingRight'
    | 'paddingBottom'
    | 'paddingLeft';
export type TypographyCssProp =
    | 'fontFamily'
    | 'fontSize'
    | 'fontWeight'
    | 'letterSpacing'
    | 'color'
    | 'lineHeight'
    | 'textAlign'
    | 'textDecoration'
    | 'textShadow';
export type DecorationsCssProp =
    | 'opacity'
    | 'borderRadiusTop'
    | 'borderRadiusRight'
    | 'borderRadiusBottom'
    | 'borderRadiusLeft'
    | 'borderWidth'
    | 'borderStyle'
    | 'borderColor'
    | 'boxShadow'
    | 'backgrundColor';
export type ExtraCssProp =
    | 'transition'
    | 'perspective'
    | 'rotateX'
    | 'rotateY'
    | 'rotateZ'
    | 'scaleX'
    | 'scaleY'
    | 'scaleZ';

export type CssAttr = {
    value: string;
    format?: CssValueFormat;
};

export type CssValueFormat = 'px' | '%' | 'em' | 'rem' | 'vh' | 'vw';

export enum StyleCategoryLayout {
    Select = 'select',
    Grid = 'grid',
    Input = 'input',
    Radio = 'radio',
}

export interface StyleCategoryItemOption {
    label: string;
    value: string;
    icon?: string;
}

export interface StyleCategoryItem<PROPERTY> {
    label: string;
    property: PROPERTY;
    layout: StyleCategoryLayout;
    condition: (styles: { [key: string]: { [key: string]: string } }) => boolean;
    options: StyleCategoryItemOption[];
}

export interface StyleCategoryConfig<PROPERTY = string> {
    label: string;
    slug: StyleCategorySlug;
    items: StyleCategoryItem<PROPERTY>[];
}

export enum StyleCategorySlug {
    Display = 'display',
    Position = 'position',
    Size = 'size',
    Typography = 'typography',
    Decoration = 'decoration',
    Extra = 'extra',
}

export type DisplayCssPropGroup = {
    [Prop in DisplayCssProp]?: CssAttr;
};

export type PositionCssPropGroup = {
    [Prop in PositionCssProp]?: CssAttr;
};

export type SizeCssPropGroup = {
    [Prop in SizeCssProp]?: CssAttr;
};

export type TypographyCssPropGroup = {
    [Prop in TypographyCssProp]?: CssAttr;
};

export type DecorationsCssPropGroup = {
    [Prop in DecorationsCssProp]?: CssAttr;
};

export type ExtraCssPropGroup = {
    [Prop in ExtraCssProp]?: CssAttr;
};

export interface BlockAttrs {
    styles: {
        display: DisplayCssPropGroup;
        position: PositionCssPropGroup;
        size: SizeCssPropGroup;
        typography: TypographyCssPropGroup;
        decorations: DecorationsCssPropGroup;
        extra: ExtraCssPropGroup;
    };
    classNames: string[];
    settings?: {
        id?: string;
        title?: string;
        alt?: string;
        aria?: {
            [key: string]: string;
        };
        text?: string;
        onClick?: (e: MouseEvent) => void;
        type?: string;
        disabled?: boolean;
    };
}

export interface BlockNodeOptions {
    isRoot?: boolean;
    headType?: HeadType;
}

export interface BlockNode {
    uid: string;
    parentUid: string;
    type: BlockType;
    attrs: BlockAttrs;
    config?: {
        supportsChildren: boolean;
    };
    options?: BlockNodeOptions;
    content?: string;
    childUids?: string[];
}

export enum ResizeFace {
    Right = 'right',
    Left = 'left',
    Top = 'top',
    Bottom = 'bottom',
}

export interface BlockConfig {
    isHoverable: boolean;
    isSelectable: boolean;
    isDraggable: boolean;
    isResizable: boolean;
    isRichText: boolean;
    resizeOptions?: ResizeFace[];
}

export interface DragState {
    subjectUid: string;
    subjectParentUid: string;
    mouseX: number;
    mouseY: number;
    isValidDropzone: boolean;
    dropzoneUid?: string;
    dropzoneParentUid?: string;
    dropBehavior?: 'right' | 'left' | 'child';
    isNew?: boolean;
    newBlock?: BlockNode;
}

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
