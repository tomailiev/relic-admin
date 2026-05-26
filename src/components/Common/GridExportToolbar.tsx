import { GridCsvExportMenuItem, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExportContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import DocxExportMenuItem from "./DocxExportMenuItem";
import TxtExportMenuItem from "./TxtExportMenuItem";
import { useLocation } from "react-router-dom";
import { auth } from "../../utils/firebase/firebase-init";

const CustomGridToolbar = () => {
    const location = useLocation();
    const userEmail = auth.currentUser?.email;
    
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExportContainer>
                <GridCsvExportMenuItem options={{fileName: location.pathname === '/logs' ? `${userEmail}_logs_${new Date().toLocaleDateString()}` : `Relic${location.pathname}_${new Date().toISOString()}`}} />
                <DocxExportMenuItem />
                <TxtExportMenuItem />
            </GridToolbarExportContainer>
        </GridToolbarContainer>
    );
};

export default CustomGridToolbar;