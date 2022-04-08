import { Component, JSX, createUniqueId, For, createSelector, Show, createSignal, Accessor } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { BlockType, BlockNode, DragState } from '../../../blocks.types';
import { useCanvasContext } from '../../../contexts/canvas.context';
import { TEXT_BLOCK, SECTION_BLOCK } from '../../../constants/block-items';
import { DefinitionTab } from './DefinitionTab/DefinitionTab.component';
import { BuilderTab } from './BuilderTab/BuilderTab.component';

import styles from './EditorSideBar.module.css';

export enum SideBarTabSlug {
    DefinitionTab = 'definition-tab',
    BuilderTab = 'builder-tab',
}

export interface SideBarTab {
    slug: SideBarTabSlug;
    icon: string;
    Component: Component<any>;
}

export type EditorSideBarProps = {};

export const EditorSideBar: Component<EditorSideBarProps> = (props): JSX.Element => {
    /**
     * First Class Assignments
     */
    const tabs: SideBarTab[] = [
        {
            slug: SideBarTabSlug.DefinitionTab,
            icon: 'fal fa-paint-brush-alt',
            Component: DefinitionTab,
        },
        {
            slug: SideBarTabSlug.BuilderTab,
            icon: 'fal fa-cube',
            Component: BuilderTab,
        },
    ];

    /**
     * Injections
     */
    const [canvas, canvasSetters] = useCanvasContext();

    /**
     * Component State
     */
    const [activeTab, setActiveTab] = createSignal<string>(tabs[0].slug);
    const isActiveTab = createSelector<string, string>(activeTab);

    return (
        <div class={styles.wrapper}>
            <ul class={styles.tabs}>
                <For each={tabs}>
                    {(tab: SideBarTab, i: Accessor<number>): JSX.Element => (
                        <li
                            class={isActiveTab(tab.slug) ? styles.activeTab : styles.tab}
                            onClick={(e: MouseEvent): SideBarTabSlug => setActiveTab(tab.slug)}
                        >
                            <i class={tab.icon}></i>
                        </li>
                    )}
                </For>
            </ul>
            <div class={styles.sections}>
                <For each={tabs}>
                    {(tab: SideBarTab, i: Accessor<number>): JSX.Element => (
                        <Show when={isActiveTab(tab.slug)}>
                            <div class={styles.section}>
                                <Dynamic component={tab.Component} />
                            </div>
                        </Show>
                    )}
                </For>
            </div>
        </div>
    );
};
