import TipTapAlignmentButtons from "./TipTapAlignmentButtons";
import TipTapFontButtons from "./TipTapFontButtons";
import BlockTypeSelect from "./TipTapBlockTypeSelect";
import TipTapLinkButtons from "./TipTapLinkButtons";
import TipTapUndoRedo from "./TipTapUndoRedo";
import TipTapListsButtons from "./TipTapListsButtons";
import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FormatClear, HorizontalRule } from "@mui/icons-material";
import { useEditorContext } from "../../context/EditorContext";
// import TipTapAlignmentSelect from "./TipTapAlignmentSelect";

const MenuBar = () => {
    const editor = useEditorContext();

    if (!editor) {
        return null
    }


    return (
        <div className="control-group">
            <div className="button-group" style={{ position: 'relative' }}>
                <TipTapFontButtons />
                <BlockTypeSelect />
                
                <TextField
                    size="small"
                    type="color"
                    onChange={event =>
                        editor.chain().setColor(event.target.value).run()
                    }
                    value={editor.getAttributes('textStyle').color || '#000000'}
                    data-testid="setColor"
                    sx={{
                        // width: 40,
                        padding: 0,
                        '& input[type="color"]': {
                            padding: 1,
                            width: 24,
                            height: 24,
                            border: 'none',
                            // borderRadius: '4px',
                            cursor: 'pointer',
                        },
                        '& input[type="color"]::-webkit-color-swatch-wrapper': {
                            padding: 0,
                        },
                        '& input[type="color"]::-webkit-color-swatch': {
                            // border: '1px solid #ccc',
                            // borderRadius: '4px',
                        },
                    }}
                />
                <TipTapAlignmentButtons />
                <TipTapListsButtons />
                <TipTapLinkButtons />
                <ToggleButtonGroup>
                    <ToggleButton size="small" value={'Clear'} onClick={() => editor.chain().unsetAllMarks().clearNodes().run()}>
                        <FormatClear />
                    </ToggleButton>
                    <ToggleButton size="small" value={'horizontal-rule'} onClick={() => editor.chain().setHorizontalRule().run()}>
                        <HorizontalRule />
                    </ToggleButton>
                </ToggleButtonGroup>
                <TipTapUndoRedo />

            </div>
        </div>
    )
};

export default MenuBar