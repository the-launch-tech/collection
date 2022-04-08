import { Component, JSX } from 'solid-js';

import { CanvasWrapper } from '../CanvasWrapper/CanvasWrapper.component';
import { EditorSideBar } from '../EditorSideBar/EditorSideBar.component';
import { EditorTopBar } from '../EditorTopBar/EditorTopBar.component';

import styles from './Editor.module.css';

export type EditorProps = {};

export const Editor: Component<EditorProps> = (props: EditorProps): JSX.Element => {
    return (
        <div class={styles.wrapper}>
            <EditorTopBar />
            <EditorSideBar />
            <CanvasWrapper />
        </div>
    );
};
