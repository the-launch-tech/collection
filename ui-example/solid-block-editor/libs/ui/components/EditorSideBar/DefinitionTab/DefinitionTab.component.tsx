import { Accessor, Component, createSignal, For, JSX } from 'solid-js';

import { STYLE_CATEGORIES } from '../../../../constants/style-categories';
import { useCanvasContext } from '../../../../contexts/canvas.context';
import { StyleCategorySlug, StyleCategoryItem, StyleCategoryConfig } from '../../../../blocks.types';

import styles from './DefinitionTab.module.css';

export type DefinitionTabProps = {};

export const DefinitionTab: Component<DefinitionTabProps> = (props): JSX.Element => {
    /**
     * Injections
     */
    const [canvas, canvasSetters] = useCanvasContext();

    /**
     * Component State
     */
    const [activeSections, setActiveSections] = createSignal<StyleCategorySlug[]>([]);

    /**
     * Procedural Function
     */
    function isActiveSection(sectionSlug: StyleCategorySlug): boolean {
        return activeSections().includes(sectionSlug);
    }

    return (
        <div class={styles.section}>
            <div class={styles.classSection}></div>
            <div class={styles.settingsSection}></div>
            <For each={STYLE_CATEGORIES}>
                {(styleCategory: StyleCategoryConfig, gIdx: Accessor<number>): JSX.Element => {
                    return (
                        <>
                            <div
                                class={[
                                    styles.styleSectionHeader,
                                    isActiveSection(styleCategory.slug) ? styles.activeStyleSectionHeader : '',
                                ].join(' ')}
                                onClick={(e: MouseEvent): StyleCategorySlug[] => {
                                    return setActiveSections([...activeSections(), styleCategory.slug]);
                                }}
                            >
                                {styleCategory.label}
                            </div>
                            <div
                                class={[
                                    styles.styleSectionBody,
                                    isActiveSection(styleCategory.slug) ? styles.activeStyleSectionBody : '',
                                ].join(' ')}
                            >
                                <For each={styleCategory.items}>
                                    {(
                                        styleCategoryItem: StyleCategoryItem<string>,
                                        tIdx: Accessor<number>
                                    ): JSX.Element => {
                                        return <div class={styles.styleItem}>{styleCategoryItem.label}</div>;
                                    }}
                                </For>
                            </div>
                        </>
                    );
                }}
            </For>
        </div>
    );
};
