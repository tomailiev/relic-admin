import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from "@mui/x-data-grid";
import { clickColumns, fullColumns, multiColumns, uniqueOpenColumns, uniqueClickColumns, clickSorting, fullSorting, uniqueClickSorting, uniqueOpenSorting } from "../../props/campaignStatProps";
import { CommonDialog } from "../../types/dialog";
import { statListType, SubscriberCampaignStat } from "../../types/DB";
import hasProperty from "../../vars/hasProperty";


const StatsDialog = ({ open, setOpen, name, list }: CommonDialog & { name: string, list: statListType | SubscriberCampaignStat[] }) => {

    const columns = {
        'full': fullColumns,
        'click': clickColumns,
        'unique click': uniqueClickColumns,
        'unique open': uniqueOpenColumns
    };

    const sorting = {
        click: clickSorting,
        full: fullSorting,
        'unique click': uniqueClickSorting,
        'unique open': uniqueOpenSorting
    }


    return (
        <Dialog open={open} maxWidth={'lg'} fullWidth={true}>
            <DialogTitle sx={{ textTransform: 'capitalize' }}>
                {name} stats
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box overflow={'scroll'}>
                    <Box minWidth={'800px'} width={'100%'}>
                        <DataGrid
                            rows={list.map((item, i) => ({ ...item, id: i }))}
                            columns={hasProperty(columns, name) ? columns[name] : multiColumns}
                            // getRowHeight={({densityFactor}) => densityFactor * 50}
                            initialState={{
                                sorting: {
                                    sortModel: [hasProperty(sorting, name) ? sorting[name] : { field: 'timestamp', sort: 'desc' }],
                                },
                                // density: 'comfortable'
                            }}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default StatsDialog;