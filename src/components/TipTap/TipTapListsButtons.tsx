import { FormatListBulleted, FormatListNumbered, } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEditorContext } from "../../context/EditorContext";

const TipTapListsButtons = () => {
    const editor = useEditorContext();

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