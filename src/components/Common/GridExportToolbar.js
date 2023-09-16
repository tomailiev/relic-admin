import { GridCsvExportMenuItem, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExportContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import DocxExportMenuItem from "./DocxExportMenuItem";
import TxtExportMenuItem from "./TxtExportMenuItem";

const CustomGridToolbar = () => {

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExportContainer>
                <GridCsvExportMenuItem />
                <DocxExportMenuItem />
                <TxtExportMenuItem />
            </GridToolbarExportContainer>
        </GridToolbarContainer>
    );
};

export default CustomGridToolbar;