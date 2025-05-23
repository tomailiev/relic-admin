import { FormatListBulleted, FormatListNumbered, } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useCurrentEditor } from "@tiptap/react"

const TipTapListsButtons = () => {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null;
    }

    return <ToggleButtonGroup size="small" aria-label="undo/redo">
        <ToggleButton
            onClick={() => editor.chain().toggleBulletList().run()}
            value="bullet-list"
            selected={editor.isActive('bulletList')}
        >
            <FormatListBulleted />
        </ToggleButton>
        <ToggleButton
            onClick={() => editor.chain().toggleOrderedList().run()}
            value="number-list"
            selected={editor.isActive('orderedList')}
        >
            <FormatListNumbered />
        </ToggleButton>
    </ToggleButtonGroup>
};

export default TipTapListsButtons