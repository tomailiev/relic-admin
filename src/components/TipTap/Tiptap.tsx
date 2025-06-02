// src/Tiptap.tsx
import { EditorProvider, Editor, EditorContent } from '@tiptap/react'
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
import { CustomKeymap } from '../../utils/tiptap/customKeyMap'

// define your extension array
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
    CustomKeymap,
]

const Tiptap = ({ content, inputName, onChange }: { content: string, inputName: string, onChange: (e: SimulatedEvent) => void }) => {

    function handleChange({ editor }: { editor: Editor }) {
        const target = {
            value: editor.getHTML(),
            name: inputName
        };
        onChange({ target });
    }
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
                    resize: 'none',
                    outline: 'none',
                    '&:focus': {
                        borderColor: '#3f51b5',
                    },
                },
            }}
        >
            <EditorProvider onUpdate={handleChange} extensions={extensions} content={content} slotBefore={<MenuBar />}>
                <EditorContent editor={null} />
            </EditorProvider>
        </Box>
    )
}

export default Tiptap
