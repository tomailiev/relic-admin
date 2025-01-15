import { Box, Button, Container, Typography, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import CSVProps from "../../props/CSVProps";
import { DataGrid } from "@mui/x-data-grid";
// import { deschematify } from "../../vars/schemaFunctions";



const ImportDonor = () => {
    const { setError } = useContext(ErrorContext);
    const [submission, setSubmission] = useState(null);
    const [subs, setSubs] = useState([]);

    const submit = useSubmit();
    const actionData = useActionData();
    const [donors, subscribers] = useLoaderData();
    // const location = useLocation();

    useEffect(() => {
        if (donors) {
            setSubs(donors.filter(({ email }) => {
                return !!email && !subscribers.find(({ id }) => id === email)
            }));
        }
    }, [donors, subscribers]);

    function filterer(model) {

        const newSubs = (subs.filter(({ id }) => model.includes(id)));
        console.log(newSubs);

        setSubmission(newSubs);
    }

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function finishSubmission() {
        submit(submission, { method: 'POST', action: `/donors/import`, encType: 'application/json' })
    }

    return (
        <Box m={4}>
            {/* <ItemSwitch item={item} itemType={itemType} mutateItem={setSubmission} /> */}
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <Box overflow={'scroll'}>
                    <Box minWidth={'800px'} width={'100%'}>
                        {subs.length
                            ? <DataGrid
                                checkboxSelection
                                onRowSelectionModelChange={filterer}
                                rows={subs}
                                columns={CSVProps.listColumns}
                                initialState={{
                                    sorting: {
                                        sortModel: [CSVProps.sorting],
                                    },
                                    pagination: { paginationModel: { pageSize: CSVProps.pageSize } }
                                }}
                                pageSizeOptions={CSVProps.pageSizeOptions}
                            />
                            : <Typography textAlign={'center'} variant="h5">Already up to date.</Typography>
                        }
                    </Box>
                </Box>
            </Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto', mx: 5 }}>
                </Box>
                <Button variant="contained" onClick={finishSubmission} disabled={!subs.length}>
                    Import
                </Button>

            </Box>
        </Box>
    );
};

export default ImportDonor;