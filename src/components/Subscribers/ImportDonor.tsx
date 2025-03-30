import { Box, Button, Container, Typography, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext, { AppErrorType } from "../../context/ErrorContext";
import CSVProps from "../../props/CSVProps";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { Donor, Subscriber } from "../../types/DB";
import { SubmitTarget } from "react-router-dom/dist/dom";
// import { deschematify } from "../../vars/schemaFunctions";



const ImportDonor = () => {
    const { setError } = useContext(ErrorContext);
    const [submission, setSubmission] = useState<Donor[] | null>(null);
    const [subs, setSubs] = useState<Donor[]>([]);

    const submit = useSubmit();
    const actionData = useActionData() as AppErrorType;
    const [donors, subscribers] = useLoaderData() as [Donor[], Subscriber[]];
    // const location = useLocation();

    useEffect(() => {
        if (donors) {
            setSubs(donors.filter(({ email }) => {
                return !!email && !subscribers.find(({ id }) => id === email)
            }));
        }
    }, [donors, subscribers]);

    function filterer(model: GridRowSelectionModel) {

        const newSubs = (subs.filter(({ id }) => id && model.includes(id)));
        console.log(newSubs);
        if (newSubs) {
            setSubmission(newSubs);
        }
    }

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function finishSubmission() {
        submit(submission as SubmitTarget, { method: 'POST', action: `/donors/import`, encType: 'application/json' })
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
                                columns={CSVProps.specialColumns || []}
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