import { MenuItem } from "@mui/material";
import { gridFilteredSortedRowIdsSelector, gridVisibleColumnFieldsSelector, useGridApiContext } from "@mui/x-data-grid";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { useLocation } from "react-router-dom";

function getDocx(apiRef) {

    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    const data = filteredSortedRowIds.map((id) => {
        const row = {};
        visibleColumnsField.forEach((field) => {
            row[field] = apiRef.current.getCellParams(id, field).value;
        });
        return row;
    });

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: data.map((item) => (
                    new Paragraph({
                        children: [
                            new TextRun(Object.values(item).join(' ')),
                        ]
                    })
                ))
            }
        ]
    });

    return Packer.toBlob(doc);
};

const exportBlob = (blob, filename) => {
    // Save the blob in a json file
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
        URL.revokeObjectURL(url);
    });
}

function DocxExportMenuItem(props) {
    const apiRef = useGridApiContext();
    const location = useLocation();
    const { hideMenu } = props;

    return (
        <MenuItem
            onClick={async () => {
                const document = await getDocx(apiRef);
                exportBlob(document, `Relic${location.pathname}_${new Date().toLocaleDateString()}.docx`);
                hideMenu?.();
            }}
        >
            Download as .docx
        </MenuItem>
    );
}

export default DocxExportMenuItem;