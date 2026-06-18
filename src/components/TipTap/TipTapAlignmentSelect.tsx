import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
} from "@mui/icons-material";
import { MenuItem, Select, Box } from "@mui/material";
import { useEditorContext } from "../../context/EditorContext";

const ALIGN_OPTIONS = [
  { value: "left", label: "Left", icon: <FormatAlignLeft  /> },
  { value: "center", label: "Center", icon: <FormatAlignCenter  /> },
  { value: "right", label: "Right", icon: <FormatAlignRight  /> },
  { value: "justify", label: "Justify", icon: <FormatAlignJustify  /> },
];

export default function TipTapAlignmentSelect() {
  const editor = useEditorContext();
  if (!editor) return null;

  // Determine current alignment from TipTap
  const current = 
    ALIGN_OPTIONS.find(opt => editor.isActive({ textAlign: opt.value }))?.value 
    || "left";

  const handleChange = (event: any) => {
    const value = event.target.value;
    editor.chain().setTextAlign(value).run();
  };

  return (
    <Select
      value={current}
      onChange={handleChange}
      size="small"
    >
      {ALIGN_OPTIONS.map(opt => (
        <MenuItem key={opt.value} value={opt.value}>
          <Box sx={{ display: "flex", alignItems: "center", p: 0 }}>
            {opt.icon}
            {/* {opt.label} */}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}
