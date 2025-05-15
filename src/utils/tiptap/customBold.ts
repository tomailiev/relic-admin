// extensions/CustomBold.ts
import { Mark, mergeAttributes } from '@tiptap/core'

export const CustomBold = Mark.create({
    name: 'bold',

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    parseHTML() {
        return [
            { tag: 'strong' },
            { tag: 'b' },
            { style: 'font-weight', getAttrs: value => value === 'bold' && null },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                style: 'font-weight: bold;',
            }),
            0,
        ]
    },

    addCommands() {
        return {
            setBold: () => ({ commands }) => commands.setMark(this.name),
            toggleBold: () => ({ commands }) => commands.toggleMark(this.name),
            unsetBold: () => ({ commands }) => commands.unsetMark(this.name),
        }
    },

    addKeyboardShortcuts() {
        return {
            'Mod-b': () => this.editor.commands.toggleBold(),
        }
    },
})
