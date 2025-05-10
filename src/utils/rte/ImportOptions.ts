import { stateFromHTML, Style } from 'draft-js-import-html';
import { EditorState, ContentState } from 'draft-js';

export const options = {
    customInlineFn: (element: Element) => {
        if (element instanceof HTMLElement) {
            if (
                element.tagName === 'SPAN' &&
                element.style.fontWeight === 'bold'
            ) {
                const item: Style = { style: 'BOLD', type: "STYLE" };
                return item;
            }
            if (
                element.tagName === 'SPAN' &&
                element.style.fontStyle === 'italic'
            ) {
                const item: Style = { style: 'ITALIC', type: "STYLE" };
                return item;
            }
            if (
                element.tagName === 'SPAN' &&
                element.style.textDecoration === 'underline'
            ) {
                const item: Style = { style: 'UNDERLINE', type: "STYLE" };
                return item;
            }
            if (
                element.tagName === 'SPAN' &&
                element.style.textDecoration === 'line-through'
            ) {
                const item: Style = { style: 'STRIKETHROUGH', type: "STYLE" };
                return item;
            }

        }
        return undefined;
    },
    customBlockFn: (element: Element) => {
        if (element instanceof HTMLElement) {
            const align = element.style.textAlign as 'left' | 'right' | 'center' | 'justify' | undefined;
            if (align) {
                const alignment = {
                    right: 'ALIGN_RIGHT',
                    justify: 'ALIGN_JUSTIFY',
                    center: 'ALIGN_CENTER',
                    left: 'ALIGN_LEFT'
                }
                return {
                    type: 'unstyled', // Keep the block type simple
                    data: { textAlign: alignment[align] } // Save alignment as metadata
                };
            }
        }
        return undefined;
    }
}

export const convertFromCustomHTML = (html: string): EditorState => {


    const contentState = stateFromHTML(html, options);
    return EditorState.createWithContent(ContentState.createFromBlockArray(contentState.toArray(), contentState.getEntityMap()));
};
