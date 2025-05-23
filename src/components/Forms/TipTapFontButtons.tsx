import { Code, FormatBold, FormatItalic, FormatQuote, FormatStrikethrough, FormatUnderlinedRounded } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCurrentEditor } from "@tiptap/react";

const TipTapFontButtons = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null
    }

    const toggleFunctions = {
        bold: editor.chain().toggleBold,
        italic: editor.chain().toggleItalic,
        underline: editor.chain().toggleUnderline,
        strike: editor.chain().toggleStrike,
        code: editor.chain().toggleCode,
        blockquote: editor.chain().toggleBlockquote
    };

    const disableButtonFunctions = {
        bold: !editor.can().chain().toggleBold().run(),
        italic: !editor.can().chain().toggleItalic().run(),
        underline: !editor.can().chain().toggleUnderline().run(),
        strike: !editor.can().chain().toggleStrike().run(),
        code: !editor.can().chain().toggleCode().run(),
        blockquote: !editor.can().chain().toggleBlockquote().run()
    }

    return (
        <ToggleButtonGroup
            size="small"
            aria-label="text formatting"
        >
            <ToggleButton
                disabled={disableButtonFunctions.bold}
                onClick={() => toggleFunctions.bold().run()}
                value="bold"
                aria-label="bold"
                selected={editor.isActive('bold')}
            >
                <FormatBold />
            </ToggleButton>
            <ToggleButton
                disabled={disableButtonFunctions.italic}
                onClick={() => toggleFunctions.italic().run()}
                value="italic"
                aria-label="italic"
                selected={editor.isActive('italic')}
            >
                <FormatItalic />
            </ToggleButton>
            <ToggleButton
                disabled={disableButtonFunctions.underline}
                value="underline"
                aria-label="underline"
                onClick={() => toggleFunctions.underline().run()}
                selected={editor.isActive('underline')}
            >
                <FormatUnderlinedRounded />
            </ToggleButton>
            <ToggleButton
                disabled={disableButtonFunctions.strike}
                onClick={() => toggleFunctions.strike().run()}
                value="strike"
                aria-label="strikethrough"
                selected={editor.isActive('strike')}
            >
                <FormatStrikethrough />
            </ToggleButton>
            <ToggleButton
                disabled={disableButtonFunctions.code}
                onClick={() => toggleFunctions.code().run()}
                value="code"
                aria-label="code"
                selected={editor.isActive('code')}
            >
                <Code />
            </ToggleButton>
            <ToggleButton
                disabled={disableButtonFunctions.blockquote}
                onClick={() => toggleFunctions.blockquote().run()}
                value="blockquote"
                aria-label="blockquote"
                selected={editor.isActive('blockquote')}
            >
                <FormatQuote />
            </ToggleButton>
            {/* <ToggleButton value="color" aria-label="color" disabled>
                <FormatColorFillIcon />
                <ArrowDropDownIcon />
            </ToggleButton> */}
        </ToggleButtonGroup>
    );
};

export default TipTapFontButtons;
