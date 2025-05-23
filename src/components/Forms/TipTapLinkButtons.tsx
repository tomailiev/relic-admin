import { Link, LinkOff } from "@mui/icons-material"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useCurrentEditor } from "@tiptap/react"

const TipTapLinkButtons = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
        if (url === null) {
            return
        }

        if (url === '') {
            editor.chain().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        try {
            editor.chain().extendMarkRange('link').setLink({ href: url.includes(':') ? url : `https://${url}` })
                .run()
        } catch (e) {
            console.log(e);

        }
    }

    return <ToggleButtonGroup size="small" aria-label="insert link">
        <ToggleButton
            onClick={setLink}
            selected={editor.isActive('link')}
            value="set-link"
            >
            <Link />
        </ToggleButton>
        <ToggleButton
            onClick={() => editor.chain().unsetLink().run()}
            disabled={!editor.isActive('link')}
            value="unset-link"
        >
            <LinkOff />
        </ToggleButton>
    </ToggleButtonGroup>
};

export default TipTapLinkButtons