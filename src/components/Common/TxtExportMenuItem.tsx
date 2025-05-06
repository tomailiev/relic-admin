import { MenuItem } from "@mui/material";
import { GridExportDisplayOptions, GridExportMenuItemProps, GridFileExportOptions, gridFilteredSortedRowIdsSelector, gridVisibleColumnFieldsSelector, useGridApiContext } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { RefObject } from "react";
import { useLocation } from "react-router-dom";

function getTxt(apiRef: RefObject<GridApiCommunity>) {

    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    const data = filteredSortedRowIds.map((id) => {
        const row: {[key: string]: unknown} = {};
        visibleColumnsField.forEach((field) => {
            row[field] = apiRef.current.getCellParams(id, field).value;
        });
        return row;
    });

    const doc = new Blob([data.map(item => Object.values(item).join(' ')).join('\n')], { type: 'text/plain' })

    return doc;
};

const exportBlob = (blob: Blob, filename: string) => {
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

function TxtExportMenuItem(props: GridExportMenuItemProps<GridFileExportOptions & GridExportDisplayOptions>) {
    const apiRef = useGridApiContext();
    const location = useLocation();
    const { hideMenu } = props;
    return (
        <MenuItem
            onClick={async () => {
                const document = getTxt(apiRef);
                exportBlob(document, `Relic${location.pathname}_${new Date().toISOString()}.txt`);
                hideMenu?.();
            }}
        >
            Download as .txt
        </MenuItem>
    );
}

export default TxtExportMenuItem;