// src/Tiptap.tsx
import { EditorProvider, Editor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './TiptapMenu'
import { SimulatedEvent } from '../../types/SimulatedEvent'
import { Box } from '@mui/material'
import TextAlign from '@tiptap/extension-text-align'
import { CustomBold } from '../../utils/tiptap/customBold'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'

// define your extension array
const extensions = [
    StarterKit.configure({
        'bold': false
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
        // isAllowedUri: (url, ctx) => {
        //   try {
        //     // construct URL
        //     const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

        //     // use default validation
        //     if (!ctx.defaultValidate(parsedUrl.href)) {
        //       return false
        //     }

        //     // disallowed protocols
        //     const disallowedProtocols = ['ftp', 'file', 'mailto']
        //     const protocol = parsedUrl.protocol.replace(':', '')

        //     if (disallowedProtocols.includes(protocol)) {
        //       return false
        //     }

        //     // only allow protocols specified in ctx.protocols
        //     const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

        //     if (!allowedProtocols.includes(protocol)) {
        //       return false
        //     }

        //     // disallowed domains
        //     const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
        //     const domain = parsedUrl.hostname

        //     if (disallowedDomains.includes(domain)) {
        //       return false
        //     }

        //     // all checks have passed
        //     return true
        //   } catch {
        //     return false
        //   }
        // },
        // shouldAutoLink: url => {
        //     try {
        //         // construct URL
        //         const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

        //         // only auto-link if the domain is not in the disallowed list
        //         const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
        //         const domain = parsedUrl.hostname

        //         return !disallowedDomains.includes(domain)
        //     } catch {
        //         return false
        //     }
        // }
    })
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
        <EditorProvider onUpdate={handleChange} extensions={extensions} content={content} slotBefore={<MenuBar />}>
            <Box
                sx={{
                    '& .ProseMirror': {
                        width: '100%',
                        padding: '8px',
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
                <EditorContent editor={null} />
            </Box>
        </EditorProvider>
    )
}

export default Tiptap
