/* @refresh reload */
import { render } from 'solid-js/web';
import { SolidBlockEditorProvider, BlockTypeConfig, ViewPortSize } from 'solid-block-editor';

import './index.css';
import App from './App';

render(() => {
    const customBlockTypes: BlockTypeConfig[] = [];

    return (
        <SolidBlockEditorProvider customBlockTypes={customBlockTypes} defaultViewPortSize={ViewPortSize.Desktop}>
            <App />
        </SolidBlockEditorProvider>
    );
}, document.getElementById('root') as HTMLElement);
