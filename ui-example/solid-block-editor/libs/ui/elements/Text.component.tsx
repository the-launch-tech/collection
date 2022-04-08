import { Component, JSX } from 'solid-js';

import { CssAttr } from '../../blocks.types';

export interface TextProps {
    id: string;
    content: JSX.Element;
    attrs: CssAttr;
}

export const Text: Component<TextProps> = (props): JSX.Element => {
    return (
        <div id={props.id} style={props.attrs}>
            {props.children}
        </div>
    );
};
