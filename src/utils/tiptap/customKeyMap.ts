import { Extension } from '@tiptap/core'

export const CustomKeymap = Extension.create({
  name: 'customKeymap',

  addKeyboardShortcuts() {
    return {
      // Make Enter insert a hard break
      Enter: ({ editor }) => {
        return editor.commands.first(({ commands }) => [
          () => commands.insertContent('<br>'),
          () => commands.command(() => {
            editor.commands.setHardBreak()
            return true
          })
        ])
      },
      // Make Shift+Enter insert a new paragraph
      'Shift-Enter': () => this.editor.commands.splitBlock()
    }
  },
})
