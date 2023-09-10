import { GridCsvExportMenuItem, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExportContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import DocxExportMenuItem from "./DocxExportMenuItem";

const CustomGridToolbar = () => {

    return (
        <GridToolbarContainer>
            <GridToolbarExportContainer>
                <GridCsvExportMenuItem />
                <DocxExportMenuItem />
            </GridToolbarExportContainer>
            <GridToolbarFilterButton />
            <GridToolbarColumnsButton />
        </GridToolbarContainer>
    );
};

export default CustomGridToolbar;