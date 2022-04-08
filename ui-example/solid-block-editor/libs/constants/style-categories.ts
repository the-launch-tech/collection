import { StyleCategoryConfig, StyleCategorySlug, StyleCategoryLayout } from '../blocks.types';

export const STYLE_CATEGORIES: StyleCategoryConfig[] = [
    {
        label: 'Display',
        slug: StyleCategorySlug.Display,
        items: [
            {
                label: 'Display',
                property: 'display',
                layout: StyleCategoryLayout.Select,
                condition: () => true,
                options: [
                    {
                        label: 'Block',
                        value: 'block',
                    },
                    {
                        label: 'Flex',
                        value: 'flex',
                    },
                    {
                        label: 'Grid',
                        value: 'grid',
                    },
                ],
            },
            {
                label: 'Flex Container',
                property: 'flexContainer',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Flex Parent',
                property: 'flexParent',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Direction',
                property: 'direction',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Justify Content',
                property: 'justifyContent',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Align Items',
                property: 'alignItems',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Align Content',
                property: 'alignContent',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Flex Children',
                property: 'flexChildren',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Flex Direction',
                property: 'flexDirection',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Order',
                property: 'order',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Grow',
                property: 'grow',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Shrink',
                property: 'shrink',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Basis',
                property: 'basis',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'flex',
                options: [],
            },
            {
                label: 'Grid Template',
                property: 'gridTemplate',
                layout: StyleCategoryLayout.Select,
                condition: (styles: any) => styles.display.display === 'grid',
                options: [],
            },
        ],
    },
    {
        label: 'Position',
        slug: StyleCategorySlug.Position,
        items: [],
    },
    {
        label: 'Size',
        slug: StyleCategorySlug.Size,
        items: [],
    },
    {
        label: 'Typography',
        slug: StyleCategorySlug.Typography,
        items: [],
    },
    {
        label: 'Decoration',
        slug: StyleCategorySlug.Decoration,
        items: [],
    },
    {
        label: 'Extra',
        slug: StyleCategorySlug.Extra,
        items: [],
    },
];
