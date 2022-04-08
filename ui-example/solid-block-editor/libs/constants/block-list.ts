import { BlockNode, BlockType } from '../blocks.types';

console.log('blockList');
import { createBlock } from '../utils/block.utils';
import { createUniqueId } from 'solid-js';

console.log('blockList');

const rootUid: string = 'root';
const sectionUid: string = createUniqueId();
const textOneUid: string = createUniqueId();
const textTwoUid: string = createUniqueId();
const sectionTwoUid: string = createUniqueId();
const textThreeUid: string = createUniqueId();
const textFourUid: string = createUniqueId();
const buttonOneUid: string = createUniqueId();

export const BLOCK_LIST: BlockNode[] = [
    createBlock(BlockType.Root, rootUid, {
        parentUid: undefined as unknown as string,
        childUids: [sectionUid, sectionTwoUid],
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
    }),
    createBlock(BlockType.Section, sectionUid, {
        parentUid: rootUid,
        childUids: [textOneUid, textTwoUid],
        attrs: {
            classNames: ['text-section'],
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
    }),
    createBlock(BlockType.Section, sectionTwoUid, {
        parentUid: rootUid,
        childUids: [textThreeUid, textFourUid, buttonOneUid],
        attrs: {
            classNames: ['text-section-two'],
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
    }),
    createBlock(BlockType.Text, textOneUid, {
        parentUid: sectionUid,
        attrs: {
            classNames: ['test-text', 'main-words'],
            styles: {
                size: {
                    paddingTop: { value: '5', format: 'px' },
                    paddingRight: { value: '5', format: 'px' },
                    paddingBottom: { value: '5', format: 'px' },
                    paddingLeft: { value: '5', format: 'px' },
                },
                display: {
                    display: { value: 'block' },
                },
            },
        },
        content: '<span><span>This is a </span><b>text node</b></span>',
    }),
    createBlock(BlockType.Text, textTwoUid, {
        parentUid: sectionUid,
        attrs: {
            classNames: ['test-text-two', 'main-words-two'],
            styles: {
                size: {
                    paddingTop: { value: '5', format: 'px' },
                    paddingRight: { value: '5', format: 'px' },
                    paddingBottom: { value: '5', format: 'px' },
                    paddingLeft: { value: '5', format: 'px' },
                },
                display: {
                    display: { value: 'block' },
                },
            },
        },
        content: '<span><span>This is </span><b>The Second Node</b></span>',
    }),
    createBlock(BlockType.Text, textThreeUid, {
        parentUid: sectionTwoUid,
        attrs: {
            classNames: ['test-text-three', 'main-words-three'],
            styles: {
                size: {
                    paddingTop: { value: '5', format: 'px' },
                    paddingRight: { value: '5', format: 'px' },
                    paddingBottom: { value: '5', format: 'px' },
                    paddingLeft: { value: '5', format: 'px' },
                },
                display: {
                    display: { value: 'block' },
                },
            },
        },
        content: '<span>Three</span>',
    }),
    createBlock(BlockType.Text, textFourUid, {
        parentUid: sectionTwoUid,
        attrs: {
            classNames: ['test-text-four', 'main-words-four'],
            styles: {
                size: {
                    paddingTop: { value: '5', format: 'px' },
                    paddingRight: { value: '5', format: 'px' },
                    paddingBottom: { value: '5', format: 'px' },
                    paddingLeft: { value: '5', format: 'px' },
                },
                display: {
                    display: { value: 'block' },
                },
            },
        },
        content: '<span>Four</span>',
    }),
    createBlock(BlockType.Button, buttonOneUid, {
        parentUid: sectionTwoUid,
        attrs: {
            classNames: ['button-one'],
            styles: {
                size: {
                    paddingTop: { value: '5', format: 'px' },
                    paddingRight: { value: '5', format: 'px' },
                    paddingBottom: { value: '5', format: 'px' },
                    paddingLeft: { value: '5', format: 'px' },
                },
                display: {
                    display: { value: 'block' },
                },
            },
            settings: {
                type: 'button',
                text: 'Press Me',
                onClick: (e: MouseEvent) => {
                    console.log('button click: e: ', e);
                },
            },
        },
    }),
];
