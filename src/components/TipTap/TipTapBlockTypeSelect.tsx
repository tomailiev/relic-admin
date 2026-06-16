import React from 'react';
import { useEditorContext } from '../../context/EditorContext';
import { ToolbarSelect } from './TipTapToolbarSelect';

const BlockTypeSelect: React.FC = () => {
    const editor = useEditorContext();

    if (!editor) return null;

    const getCurrentBlockType = () => {
        for (let level = 1; level <= 6; level++) {
            if (editor.isActive('heading', { level })) return `h${level}`;
        }
        if (editor.isActive('paragraph')) return 'p';
        return '';
    };

    const handleChange = (value: string) => {
        // const value = event.target.value;


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
        <ToolbarSelect
            value={value}
            onChange={handleChange}
            options={[
                { value: 'p', label: 'Paragraph' },
                ...[1, 2, 3, 4, 5, 6].map(level => ({
                    value: `h${level}`,
                    label: `Heading ${level}`,
                })),
            ]}
        />

        // <Select
        //     value={value}
        //     onChange={handleChange}
        //     displayEmpty
        //     size="small"
        //     sx={{
        //         minWidth: 160,
        //         height: 40,
        //         fontSize: 'large',
        //         position: 'relative',
        //         // top: { xs: 0, sm: -6.5 },
        //         '& .MuiSelect-select': {
        //             // paddingTop: 0,
        //             // paddingBottom: '4px',
        //             display: 'flex',
        //             alignItems: 'center',
        //         },
        //     }}
        // >
        //     <MenuItem value="p">Paragraph</MenuItem>
        //     {[1, 2, 3, 4, 5, 6].map((level) => (
        //         <MenuItem key={level} value={`h${level}`}>
        //             Heading {level}
        //         </MenuItem>
        //     ))}
        // </Select>
    );
};

export default BlockTypeSelect;
