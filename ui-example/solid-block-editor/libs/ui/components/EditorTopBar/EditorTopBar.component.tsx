import { Component, JSX } from 'solid-js';

import { Logo } from '../Logo/Logo.component';

import styles from './EditorTopBar.module.css';
import { useCanvasContext } from '../../../contexts/canvas.context';
import { ViewPortSize, ViewPortType } from '../../../blocks.types';

export const EditorTopBar: Component = (props): JSX.Element => {
    const [canvas, canvasSetters] = useCanvasContext();

    function onExitEditor(e: MouseEvent): void {
        console.log('Exit Editor');
    }

    function onViewAsDekstop(e: MouseEvent): void {
        canvasSetters.setViewPortSize(ViewPortSize.Desktop);
    }

    function onViewAsTablet(e: MouseEvent): void {
        canvasSetters.setViewPortSize(ViewPortSize.Tablet);
    }

    function onViewAsMobile(e: MouseEvent): void {
        canvasSetters.setViewPortSize(ViewPortSize.Mobile);
    }

    function onSelectEditorView(e: MouseEvent): void {
        canvasSetters.setViewPortType(ViewPortType.Editor);
    }

    function onSelectPreviewView(e: MouseEvent): void {
        canvasSetters.setViewPortType(ViewPortType.Preview);
    }

    function onSelectFullScreenView(e: MouseEvent): void {
        canvasSetters.setViewPortType(ViewPortType.FullScreenEditor);
    }

    function onGenerateCode(e: MouseEvent): void {
        console.log('Generate Code');
    }

    function onUndo(e: MouseEvent): void {
        console.log('Undo');
    }

    function onRedo(e: MouseEvent): void {
        console.log('Redo');
    }

    function onImport(e: MouseEvent): void {
        console.log('Import Content');
    }

    function onClear(e: MouseEvent): void {
        canvasSetters.setBlockList([]);
    }

    function onSave(e: MouseEvent): void {
        console.log('Save Blocks');
    }

    return (
        <div class={styles.wrapper}>
            <div class={styles.sectionGroup}>
                <div class={styles.section}>
                    <div class={styles.item} onClick={onExitEditor}>
                        <i class='fal fa-portal-exit'></i>
                    </div>
                </div>
                <div class={styles.section}>
                    <div class={styles.item} onClick={onViewAsDekstop}>
                        <i class='fal fa-desktop-alt'></i>
                    </div>
                    <div class={styles.item} onClick={onViewAsTablet}>
                        <i class='fal fa-tablet-alt'></i>
                    </div>
                    <div class={styles.item} onClick={onViewAsMobile}>
                        <i class='fal fa-mobile-alt'></i>
                    </div>
                </div>
            </div>
            <div class={styles.sectionGroup}>
                <div class={styles.section}>
                    <div class={styles.item}>
                        <Logo />
                    </div>
                </div>
            </div>
            <div class={styles.sectionGroup}>
                <div class={styles.section}>
                    <div class={styles.item} onClick={onSelectEditorView}>
                        <i class='fal fa-cubes'></i>
                    </div>
                    <div class={styles.item} onClick={onSelectPreviewView}>
                        <i class='fal fa-eye'></i>
                    </div>
                    <div class={styles.item} onClick={onSelectFullScreenView}>
                        <i class='fal fa-expand-arrows-alt'></i>
                    </div>
                    <div class={styles.item} onClick={onGenerateCode}>
                        <i class='fal fa-file-code'></i>
                    </div>
                    <div class={styles.item} onClick={onUndo}>
                        <i class='fal fa-undo-alt'></i>
                    </div>
                    <div class={styles.item} onClick={onRedo}>
                        <i class='fal fa-redo-alt'></i>
                    </div>
                    <div class={styles.item} onClick={onImport}>
                        <i class='fal fa-file-import'></i>
                    </div>
                    <div class={styles.item} onClick={onClear}>
                        <i class='fal fa-trash-alt'></i>
                    </div>
                    <div class={styles.item} onClick={onSave}>
                        <i class='fal fa-save'></i>
                    </div>
                </div>
            </div>
        </div>
    );
};
