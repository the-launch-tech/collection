import { createContext, useContext, JSX, Context, createSignal, Accessor, createUniqueId } from 'solid-js';

import { BlockTypeConfig, ViewPortSize, ViewPortType, BlockNode, DragState } from '../blocks.types';
import { BLOCK_TYPES } from '../constants/block-types';
import { BLOCK_LIST } from '../constants/block-list';

export interface CanvasProviderProps {
    defaultViewPortSize: ViewPortSize;
    customBlockTypes: BlockTypeConfig[];
    children?: any;
}

export interface DefaultStore {
    blockTypes: Accessor<BlockTypeConfig[]>;
    viewPortSize: Accessor<ViewPortSize>;
    viewPortType: Accessor<ViewPortType>;
    blockList: Accessor<BlockNode[]>;
    getBlockByUid: (uid: string) => BlockNode;
    DOMRect: Accessor<DOMRect>;
    selectedBlock: Accessor<BlockNode>;
    hoveredBlockStack: Accessor<BlockNode[]>;
    richTextSelectedBlock: Accessor<BlockNode>;
    isBlockSelected: (block: BlockNode) => Boolean;
    isBlockHovered: (block: BlockNode) => Boolean;
    isBlockRichTextSelected: (block: BlockNode) => Boolean;
    getWidth: (...sizes: string[]) => string;
    dragState: Accessor<DragState>;
    isBlockDragging: (block: BlockNode) => boolean;
    isDragging: () => boolean;
    isBlockDropzone: (block: BlockNode) => boolean;
    hasDropzone: () => boolean;
}

export interface DefaultMeta {
    addBlockType: (v: BlockTypeConfig) => any;
    setDOMRect: (v: DOMRect | ((prev: DOMRect) => DOMRect)) => DOMRect;
    setViewPortSize: (v: ViewPortSize | ((prev: ViewPortSize) => ViewPortSize)) => ViewPortSize;
    setViewPortType: (v: ViewPortType | ((prev: ViewPortType) => ViewPortType)) => ViewPortType;
    setBlockList: (v: BlockNode[] | ((prev: BlockNode[]) => BlockNode[])) => BlockNode[];
    setSelectedBlock: (v: BlockNode | ((prev: BlockNode) => BlockNode)) => BlockNode;
    setRichTextSelectedBlock: (v: BlockNode | ((prev: BlockNode) => BlockNode)) => BlockNode;
    pushHoveredBlock: (v: BlockNode) => void;
    popHoveredBlock: () => void;
    selectParentBlock: () => void;
    copySelectedBlock: () => void;
    deleteSelectedBlock: () => void;
    setDragState: (v: DragState | ((dragState: DragState) => DragState)) => DragState;
    moveDraggedBlock: () => void;
}

const CanvasContext: Context<{}[]> = createContext<{}[]>() as Context<{}[]>;

export function CanvasProvider(props: CanvasProviderProps): JSX.Element {
    const [blockTypes, setBlockTypes] = createSignal<BlockTypeConfig[]>([
        ...BLOCK_TYPES(),
        ...(props.customBlockTypes ?? []),
    ]);
    const [viewPortSize, setViewPortSize] = createSignal<ViewPortSize>(
        props.defaultViewPortSize ?? ViewPortSize.Desktop
    );
    const [viewPortType, setViewPortType] = createSignal<ViewPortType>(ViewPortType.Editor);
    const [DOMRect, setDOMRect] = createSignal<DOMRect>({} as unknown as DOMRect);
    const [blockList, setBlockList] = createSignal<BlockNode[]>(BLOCK_LIST, { equals: false });
    const [selectedBlock, setSelectedBlock] = createSignal<BlockNode>(undefined as unknown as BlockNode);
    const [hoveredBlockStack, setHoveredBlockStack] = createSignal<BlockNode[]>([]);
    const [richTextSelectedBlock, setRichTextSelectedBlock] = createSignal<BlockNode>(
        undefined as unknown as BlockNode
    );
    const [dragState, setDragState] = createSignal<DragState>(undefined as unknown as DragState);

    const store: [DefaultStore, DefaultMeta] = [
        {
            blockTypes,
            viewPortSize,
            viewPortType,
            blockList,
            getBlockByUid: (uid: string): BlockNode => {
                return blockList().find((block: BlockNode): boolean => block.uid === uid) as BlockNode;
            },
            DOMRect,
            selectedBlock,
            hoveredBlockStack,
            richTextSelectedBlock,
            isBlockSelected: (block: BlockNode): boolean => {
                return selectedBlock()?.uid === block.uid;
            },
            isBlockHovered: (block: BlockNode): boolean => {
                return hoveredBlockStack()[hoveredBlockStack()?.length - 1]?.uid === block.uid;
            },
            isBlockRichTextSelected: (block: BlockNode): boolean => {
                return richTextSelectedBlock()?.uid === block.uid;
            },
            getWidth: (...args: string[]): string => {
                return viewPortSize() === ViewPortSize.Desktop
                    ? args[0] ?? '100%'
                    : viewPortSize() === ViewPortSize.Tablet
                    ? args[1] ?? '91px'
                    : args[2] ?? '600px';
            },
            dragState,
            isDragging: (): boolean => {
                return !!dragState()?.subjectUid;
            },
            isBlockDragging: (block: BlockNode): boolean => {
                return dragState()?.subjectUid === block.uid;
            },
            isBlockDropzone: (block: BlockNode): boolean => {
                return dragState()?.dropzoneUid === block.uid;
            },
            hasDropzone: (): boolean => {
                return !!dragState()?.dropzoneUid;
            },
        },
        {
            addBlockType: (newBlockType: BlockTypeConfig) => setBlockTypes([...blockTypes(), newBlockType]),
            setBlockList,
            setViewPortSize,
            setViewPortType,
            setDOMRect,
            setSelectedBlock,
            setRichTextSelectedBlock,
            pushHoveredBlock: (newBlock: BlockNode): BlockNode[] => {
                if (hoveredBlockStack()[hoveredBlockStack()?.length - 1]?.uid === newBlock.uid) {
                    return hoveredBlockStack();
                }

                return setHoveredBlockStack([...hoveredBlockStack(), newBlock]);
            },
            popHoveredBlock: (): BlockNode[] => {
                const copy = Object.assign([], hoveredBlockStack());

                if (!copy.length) {
                    return hoveredBlockStack();
                }

                copy.pop();

                return setHoveredBlockStack(copy);
            },
            selectParentBlock: (): void => {
                blockList().forEach((block: BlockNode): void => {
                    if (block.uid === selectedBlock().parentUid) {
                        setSelectedBlock(block);
                    }
                });
            },
            copySelectedBlock: (): void => {
                if (!selectedBlock()) {
                    return;
                }

                const subjectIndex: number = blockList().findIndex(
                    (block: BlockNode): boolean => block.uid === selectedBlock().uid
                );
                const parentIndex: number = blockList().findIndex(
                    (block: BlockNode): boolean => block.uid === selectedBlock().parentUid
                );

                const newUid: string = createUniqueId();

                setBlockList((prev: BlockNode[]): BlockNode[] => {
                    prev[parentIndex]!.childUids!.push(newUid);
                    prev.push({ ...prev[subjectIndex], uid: newUid });
                    return prev;
                });
            },
            deleteSelectedBlock: (): void => {
                if (!selectedBlock()) {
                    return;
                }

                const subjectIndex: number = blockList().findIndex(
                    (block: BlockNode): boolean => block.uid === selectedBlock().uid
                );
                const parentIndex: number = blockList().findIndex(
                    (block: BlockNode): boolean => block.uid === selectedBlock().parentUid
                );
                const childUidIndex = blockList()[parentIndex]!.childUids!.findIndex(
                    (childUid: string): boolean => childUid === selectedBlock().uid
                );

                setBlockList((prev: BlockNode[]): BlockNode[] => {
                    prev[parentIndex]!.childUids!.splice(childUidIndex, 1);
                    prev.splice(subjectIndex, 1);
                    return prev;
                });
            },
            setDragState,
            moveDraggedBlock: (): void => {
                if (!dragState()?.isValidDropzone) {
                    return;
                }

                setBlockList((prev) => {
                    if (dragState().isNew && dragState().newBlock) {
                        prev.push(dragState().newBlock as BlockNode);
                    }

                    const subjectIndex: number = prev.findIndex(
                        (block: BlockNode): boolean => block.uid === dragState().subjectUid
                    );
                    const subjectParentIndex: number = prev.findIndex(
                        (block: BlockNode): boolean => block.uid === dragState().subjectParentUid
                    );
                    const subjectUidIndex: number = prev[subjectParentIndex]!.childUids!.findIndex(
                        (childUid: string): boolean => childUid === dragState().subjectUid
                    );

                    if (!dragState().isNew) {
                        prev[subjectParentIndex]!.childUids!.splice(subjectUidIndex, 1);
                    }

                    const dropzoneIndex: number = prev.findIndex(
                        (block: BlockNode): boolean => block.uid === dragState().dropzoneUid
                    );
                    const dropzoneParentIndex: number = prev.findIndex(
                        (block: BlockNode): boolean => block.uid === dragState().dropzoneParentUid
                    );

                    if (dragState().dropBehavior === 'child') {
                        prev[dropzoneIndex].childUids = [
                            ...(prev[dropzoneIndex].childUids || []),
                            dragState().subjectUid,
                        ];
                        prev[subjectIndex].parentUid = dragState().dropzoneUid as string;
                    } else if (dragState().dropBehavior === 'left') {
                        const targetChildIndex: number = prev[dropzoneParentIndex].childUids!.findIndex(
                            (childUid: string): boolean => childUid === dragState().dropzoneUid
                        );
                        prev[dropzoneParentIndex].childUids!.splice(targetChildIndex, 0, dragState().subjectUid);
                        prev[subjectIndex].parentUid = dragState().dropzoneParentUid as string;
                    } else if (dragState().dropBehavior === 'right') {
                        const targetChildIndex: number = prev[dropzoneParentIndex].childUids!.findIndex(
                            (childUid: string): boolean => childUid === dragState().dropzoneUid
                        );
                        prev[dropzoneParentIndex].childUids!.splice(targetChildIndex + 1, 0, dragState().subjectUid);
                        prev[subjectIndex].parentUid = dragState().dropzoneParentUid as string;
                    }

                    return Object.assign([], prev);
                });
            },
        },
    ];

    return <CanvasContext.Provider value={store}>{props.children}</CanvasContext.Provider>;
}

export function useCanvasContext(): [DefaultStore, DefaultMeta] {
    return useContext(CanvasContext) as [DefaultStore, DefaultMeta];
}
