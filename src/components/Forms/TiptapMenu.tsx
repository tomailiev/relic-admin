import { useCurrentEditor } from "@tiptap/react"
import TipTapAlignmentButtons from "./TipTapAlignmentButtons";
import TipTapFontButtons from "./TipTapFontButtons";
import BlockTypeSelect from "./TipTapBlockTypeSelect";
import TipTapLinkButtons from "./TipTapLinkButtons";
import TipTapUndoRedo from "./TipTapUndoRedo";
import TipTapListsButtons from "./TipTapListsButtons";
import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FormatClear, HorizontalRule } from "@mui/icons-material";

const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }


    return (
        <div className="control-group">
            <div className="button-group">
                <TipTapFontButtons />
                <BlockTypeSelect />
                <ToggleButtonGroup>
                    <ToggleButton size="small" value={'Clear'} onClick={() => editor.chain().unsetAllMarks().clearNodes().run()}>
                        <FormatClear />
                    </ToggleButton>
                    <ToggleButton size="small" value={'horizontal-rule'} onClick={() => editor.chain().setHorizontalRule().run()}>
                        <HorizontalRule />
                    </ToggleButton>
                </ToggleButtonGroup>
                <TipTapListsButtons />
                <TipTapUndoRedo />
                <TipTapLinkButtons />
                <TipTapAlignmentButtons />
                <TextField
                    size="small"
                    type="color"
                    onChange={event => editor.chain().setColor(event.target.value).run()}
                    value={editor.getAttributes('textStyle').color}
                    data-testid="setColor"
                    sx={{minWidth: '20px'}}
                />
            </div>
        </div>
    )
};

export default MenuBar