import { CssAttr } from '../blocks.types';

export function formatStyles(cssAttrs: { [key: string]: CssAttr }): Record<string, string> {
    let css: Record<string, string> = {};
    for (const attr of Object.keys(cssAttrs)) {
        css[attr] = cssAttrs[attr].value + cssAttrs[attr].format ?? '';
    }
    return css;
}

export function formatClassNames(arr: string[]): string {
    return arr.join(' ');
}
