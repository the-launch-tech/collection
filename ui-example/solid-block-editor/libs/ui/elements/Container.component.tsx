import { Component, JSX } from 'solid-js';

import { CssAttr } from '../../blocks.types';

export interface ContainerProps {
    id: string;
    attrs: CssAttr;
}

export const Container: Component<ContainerProps> = (props): JSX.Element => {
    return (
        <div id={props.id} style={props.attrs}>
            {props.children}
        </div>
    );
};
