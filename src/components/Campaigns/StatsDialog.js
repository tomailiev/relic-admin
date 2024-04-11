import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from "@mui/x-data-grid";
import { clickColumns, fullColumns, multiColumns, uniqueOpenColumns, uniqueClickColumns } from "../../props/campaignStatProps";


const StatsDialog = ({ open, setOpen, name, list }) => {

    const columns = {
        click: clickColumns,
        full: fullColumns,
        'unique click': uniqueClickColumns,
        'unique open': uniqueOpenColumns
    }

    return (
        <Dialog open={open} maxWidth={'lg'} fullWidth="true">
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
                            columns={columns[name] || multiColumns}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'timestamp', sort: 'desc' }],
                                }
                            }}
                        />
                    </Box>
                </Box>
                {/* {name === 'click'
                    ? list.map((item, i) => {
                        return <DialogContentText key={i} id="alert-dialog-description">
                            {`${item.email}: ${item.link}`}
                        </DialogContentText>
                    })
                    : list.map(item => item.email).filter((val, i, arr) => arr.indexOf(val) === i).map((item, i) => {
                        return <DialogContentText key={i} id="alert-dialog-description">
                            {item}
                        </DialogContentText>
                    })
                } */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default StatsDialog;