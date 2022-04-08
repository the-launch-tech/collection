import { Accessor, Component, createEffect, createSignal, For, JSX, on, onCleanup, Show } from 'solid-js';

import { TextDecorationType, TextTooltipOption } from './config';

import styles from './RichTextTooltip.module.css';
import { BlockNode } from '../../../blocks.types';
import { useCanvasContext } from '../../../contexts/canvas.context';

export type RichTextTooltipProps = {};

export const RichTextTooltip: Component<RichTextTooltipProps> = (props): JSX.Element => {
    /**
     * First Class Assignments
     */
    let ref!: HTMLDivElement;
    const blockRefMap: { [uid: string]: HTMLDivElement } = {};
    const tooltipOptions: TextTooltipOption[] = [
        {
            type: TextDecorationType.Bold,
            icon: 'fal fa-bold',
            decoration: (e: MouseEvent): any => {
                e.preventDefault();
                let selection: Selection | null = window.getSelection();
                console.log('e: ', e);
                console.log('selection: ', selection);
                console.log('activeSelection(): ', activeSelection());
            },
        },
        {
            type: TextDecorationType.Underline,
            icon: 'fal fa-underline',
            decoration: (...args: any[]): any => {},
        },
        {
            type: TextDecorationType.Italic,
            icon: 'fal fa-italic',
            decoration: (...args: any[]): any => {},
        },
        {
            type: TextDecorationType.StrikeThrough,
            icon: 'fal fa-strikethough',
            decoration: (...args: any[]): any => {},
        },
        {
            type: TextDecorationType.Link,
            icon: 'fal fa-link',
            decoration: (...args: any[]): any => {},
        },
        {
            type: TextDecorationType.AnonymousWrap,
            icon: 'fal fa-text',
            decoration: (...args: any[]): any => {},
        },
    ];

    /**
     * Injections
     */
    const [canvas, canvasSetters] = useCanvasContext();

    /**
     * Component State
     */
    const [blockRef, setBlockRef] = createSignal<HTMLDivElement>(undefined as unknown as HTMLDivElement);
    const [activeSelection, setActiveSelection] = createSignal<Selection | null>(null);

    /**
     * Lifecycle Hooks
     */
    createEffect(
        on(canvas.richTextSelectedBlock, (richTextSelectedBlock: BlockNode): void => {
            if (!richTextSelectedBlock) {
                setBlockRef(undefined as unknown as HTMLDivElement);
                return;
            }

            if (blockRefMap[richTextSelectedBlock.uid]) {
                setBlockRef(blockRefMap[richTextSelectedBlock.uid]);
                return;
            }

            const id: string = getElementId(richTextSelectedBlock);
            const element: HTMLDivElement = document.getElementById(id) as HTMLDivElement;

            blockRefMap[richTextSelectedBlock.uid] = element;

            setBlockRef(blockRefMap[richTextSelectedBlock.uid]);
        })
    );

    createEffect(
        on(blockRef, (blockRef: HTMLDivElement): void => {
            if (!blockRef) {
                return;
            }

            const rect: DOMRect = blockRef.getBoundingClientRect();

            if (rect.top - 34 <= 0) {
                ref.style.top = rect.bottom + 'px';
                ref.style.left = rect.left + 'px';
            } else {
                ref.style.top = rect.top - 34 + 'px';
                ref.style.left = rect.left + 'px';
            }

            blockRef.addEventListener('mouseup', onMouseUp);
            blockRef.addEventListener('keyup', onKeyUp);
            setActiveSelection(null);

            onCleanup((): void => {
                blockRef.removeEventListener('mouseup', onMouseUp);
                blockRef.removeEventListener('keyup', onKeyUp);
                setActiveSelection(null);
            });
        })
    );

    createEffect(
        on(activeSelection, (newValue: Selection | null): void => {
            console.log('newValue: ', newValue);
        })
    );

    /**
     * Procedural Functions
     */
    function getElementId(block: BlockNode): string {
        return block.type === 'root' ? 'sbe-block-body' : `sbe-block-${block.type}-${block.uid}`;
    }

    /**
     * Event Handlers
     */
    function onMouseUp(e: MouseEvent): void {
        if (!canvas.richTextSelectedBlock()) {
            return;
        }

        console.log('onMouseUp: e: ', e);

        setActiveSelection(window.getSelection());

        console.log(activeSelection());
    }

    function onKeyUp(e: KeyboardEvent): void {
        if (!canvas.richTextSelectedBlock()) {
            return;
        }

        console.log('onKeyUp: e: ', e);

        setActiveSelection(window.getSelection());

        console.log(activeSelection());
    }

    /**
     * JSX
     */
    return (
        <Show when={canvas.richTextSelectedBlock()}>
            <div ref={ref} id='sbe-rich-text-tooltip' class={styles.tooltipWrapper}>
                <ul class={styles.tooltipList}>
                    <For each={tooltipOptions}>
                        {(tooltipOption: TextTooltipOption, idx: Accessor<number>): JSX.Element => {
                            return (
                                <li class={styles.tooltipOption} onClick={(e) => tooltipOption.decoration(e)}>
                                    <i class={[styles.tooltipIcon, tooltipOption.icon].join(' ')}></i>
                                </li>
                            );
                        }}
                    </For>
                </ul>
            </div>
        </Show>
    );
};
