export enum TextDecorationType {
    Bold = 'bold',
    Underline = 'underline',
    Italic = 'italic',
    StrikeThrough = 'strike-though',
    Link = 'link',
    AnonymousWrap = 'anonymous-wrap',
}

export interface TextTooltipOption {
    type: TextDecorationType;
    icon: string;
    decoration: (...args: any[]) => any;
}

export const tooltipOptions: TextTooltipOption[] = [
    {
        type: TextDecorationType.Bold,
        icon: 'fal fa-bold',
        decoration: (...args: any[]): any => {},
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
