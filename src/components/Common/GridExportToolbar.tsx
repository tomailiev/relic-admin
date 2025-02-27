import { GridCsvExportMenuItem, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExportContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import DocxExportMenuItem from "./DocxExportMenuItem";
import TxtExportMenuItem from "./TxtExportMenuItem";
import { useLocation } from "react-router-dom";

const CustomGridToolbar = () => {
    const location = useLocation();
    
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExportContainer>
                <GridCsvExportMenuItem options={{fileName: `Relic${location.pathname}_${new Date().toISOString()}`}} />
                <DocxExportMenuItem />
                <TxtExportMenuItem />
            </GridToolbarExportContainer>
        </GridToolbarContainer>
    );
};

export default CustomGridToolbar;