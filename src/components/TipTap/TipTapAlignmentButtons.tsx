import { FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCurrentEditor } from "@tiptap/react";

const TipTapAlignmentButtons = () => {

    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }
 

    return <ToggleButtonGroup size="small" exclusive={true} aria-label="Small sizes">
        <ToggleButton
            value="left"
            key="left"
            onClick={() => editor.chain().setTextAlign('left').run()}
            selected={editor.isActive({ textAlign: 'left' })}
        >
            <FormatAlignLeft />
        </ToggleButton>,
        <ToggleButton
            value="center"
            key="center"
            onClick={() => editor.chain().setTextAlign('center').run()}
            selected={editor.isActive({ textAlign: 'center' })}

        >
            <FormatAlignCenter />
        </ToggleButton>,
        <ToggleButton
            value="right"
            key="right"
            onClick={() => editor.chain().setTextAlign('right').run()}
            selected={editor.isActive({ textAlign: 'right' })}

        >
            <FormatAlignRight />
        </ToggleButton>,
        <ToggleButton
            value="justify"
            key="justify"
            onClick={() => editor.chain().setTextAlign('justify').run()}
            selected={editor.isActive({ textAlign: 'justify' })}

        >
            <FormatAlignJustify />
        </ToggleButton>
    </ToggleButtonGroup>
};

export default TipTapAlignmentButtons;
