// src/Tiptap.tsx
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './TiptapMenu'
import { SimulatedEvent } from '../../types/SimulatedEvent'
import TextAlign from '@tiptap/extension-text-align'
import { HardBreak } from '@tiptap/extension-hard-break'
import { CustomBold } from '../../utils/tiptap/customBold'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { EditorContext } from '../../context/EditorContext'
// import { CustomKeymap } from '../../utils/tiptap/customKeyMap'

const extensions = [
    StarterKit.configure({
        'bold': false,
        hardBreak: false
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    CustomBold,
    Underline,
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],

    }),
    Color,
    TextStyle,
    HardBreak.configure({
        HTMLAttributes: {
            class: 'hard-break',
        },
    }),
    // CustomKeymap,
]

type Props = {
  content: string
  inputName: string
  readOnly?: boolean
  onChange: (e: SimulatedEvent) => void
  onFocus?: () => void
}

export default function Tiptap({
  content,
  inputName,
  readOnly = false,
  onChange,
  onFocus,
}: Props) {
  const editor = useEditor({
    extensions,
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      if (readOnly) return
      onChange({
        target: {
          value: editor.getHTML(),
          name: inputName,
        },
      })
    },
    onFocus,
  })

  // 🔥 Ensure content updates when the prop changes
  useEffect(() => {
    if (!editor) return
    if (content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <Box
      sx={{
        '& .tiptap': {
          width: '100%',
          my: '8px',
          px: '5px',
          borderRadius: '10px',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          fontFamily: 'inherit',
          fontSize: '1rem',
          lineHeight: 1.5,
          minHeight: '100px',
          outline: 'none',
          backgroundColor: readOnly ? '#fafafa' : 'inherit',
          '&:focus': {
            borderColor: readOnly ? undefined : '#3f51b5',
          },
        },
      }}
    >
      {!readOnly && editor && <EditorContext.Provider value={editor}><MenuBar /></EditorContext.Provider>}

      <EditorContent editor={editor} />
    </Box>
  )
}