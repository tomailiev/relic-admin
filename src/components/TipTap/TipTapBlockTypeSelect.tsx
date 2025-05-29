import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useCurrentEditor } from '@tiptap/react';

const BlockTypeSelect: React.FC = () => {
    const { editor } = useCurrentEditor();

    if (!editor) return null;

    const getCurrentBlockType = () => {
        for (let level = 1; level <= 6; level++) {
            if (editor.isActive('heading', { level })) return `h${level}`;
        }
        if (editor.isActive('paragraph')) return 'p';
        return '';
    };

    const handleChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;


        if (value === 'p') {
            editor.chain().setParagraph().run();
        } else if (value.startsWith('h')) {
            const level = parseInt(value.slice(1), 10);
            if ([1, 2, 3, 4, 5, 6].includes(level)) {
                editor.chain().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
            }
        }
    };

    const value = getCurrentBlockType();

    return (
        <Select
            value={value}
            onChange={handleChange}
            displayEmpty
            size="small"
            sx={{ minWidth: 160 }}
        >
            <MenuItem value="p">Paragraph</MenuItem>
            {[1, 2, 3, 4, 5, 6].map((level) => (
                <MenuItem key={level} value={`h${level}`}>
                    Heading {level}
                </MenuItem>
            ))}
        </Select>
    );
};

export default BlockTypeSelect;
