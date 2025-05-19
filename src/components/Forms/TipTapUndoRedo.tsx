import { Redo, Undo } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useCurrentEditor } from "@tiptap/react"

const TipTapUndoRedo = () => {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null;
    }

    return <ToggleButtonGroup size="small" aria-label="undo/redo">
        <ToggleButton
            onClick={() => editor.chain().undo().run()}
            value="undo"
            disabled={!editor.can().chain().undo().run()}
        >
            <Undo />
        </ToggleButton>
        <ToggleButton
            onClick={() => editor.chain().redo().run()}
            disabled={!editor.can().chain().redo().run()}
            value="redo"
        >
            <Redo />
        </ToggleButton>
    </ToggleButtonGroup>
};

export default TipTapUndoRedo