import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useFetcher, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import { emailContentFieldArrays, emailContentFields } from "../../props/emailContentProps";
import AddForm from "../Forms/AddForm";
import { emailComponentSchemas, selectComponentSchema } from "../../utils/yup/yup-schemas";
import { ContentCopy, Delete, Edit, ExpandMoreRounded, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { ItemWithFields } from "../../types/fnProps";
import { Campaign } from "../../types/DB";
import { AnyMJMLComponent, AnyMJMLKey } from "../../types/campaignComponents";
import AddFileDialog from "./AddFileDialog";
import FilesDialog from "./FilesDialog";

const options = [
    { value: 'attachment' },
    { value: 'button' },
    { value: 'column' },
    { value: 'divider' },
    { value: 'event' },
    { value: 'font' },
    { value: 'footer' },
    { value: 'header' },
    { value: 'image' },
    { value: 'preview' },
    { value: 'raw' },
    { value: 'section' },
    { value: 'signature' },
    { value: 'text' },
    { value: 'title' },
    { value: 'video' },
    // 'spacer'
];


const EditCampaignContent = ({ itemType, fieldsArray, }: ItemWithFields) => {
    const { campaign } = useLoaderData() as { campaign: Campaign };

    const [activeStep, setActiveStep] = useState(0);
    const [fileUploadOpen, setFileUploadOpen] = useState(false);
    const [filesListOpen, setFilesListOpen] = useState(false);
    const [component, setComponent] = useState<AnyMJMLKey | null>(null);
    const [componentList, setComponentList] = useState<AnyMJMLComponent[]>(campaign?.components || []);
    const [editedComponent, setEditedComponent] = useState<AnyMJMLComponent | null>(null);
    const [emailHtml, setEmailHtml] = useState(campaign?.html || '');
    const [emailMjml, setEmailMjml] = useState(campaign?.mjml || '');
    const [attachments, setAttachments] = useState(campaign?.attachments || [])

    // const [submission, setSubmission] = useState(null);
    const fetcher = useFetcher();
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const fSubmit = fetcher.submit;

    useEffect(() => {        
        fSubmit(JSON.stringify({ components: componentList }), { method: 'post', encType: 'application/json' });
    }, [componentList, fSubmit]);

    useEffect(() => {
        if (fetcher.data?.html) {
            setEmailHtml(fetcher.data.html);
            setEmailMjml(fetcher.data.mjml);
            setAttachments(fetcher.data.attachments);
        }
        if (fetcher.data?.errors?.length) {
            setError({ severity: 'error', message: fetcher.data.errors.map((e: Error) => e.message).join(';\n'), error: true })
        }
    }, [fetcher.data, setError]);



    function addComponentToList(comp: AnyMJMLComponent) {
        setComponent(null);
        if (editedComponent) {
            setComponentList(prev => prev.slice(0, comp.index).concat(comp).concat(prev.slice(comp.index || comp.index === 0 ? comp.index + 1 : prev.length + 1)))
            setEditedComponent(null);
        } else {
            setComponentList(prev => prev.concat(comp));
        }
    }

    function selectComponent(comp: { component: AnyMJMLKey }) {
        setComponent(null);
        setEditedComponent(null);
        setTimeout(() => {
            setComponent(comp.component);
        }, 250);
    }

    function editComponent(i: number) {
        setComponent(null);
        setTimeout(() => {
            setComponent(componentList[i].id.substring(componentList[i].id.lastIndexOf('-') + 1) as AnyMJMLKey);
            setEditedComponent({ ...componentList[i], index: i });
        }, 250);
    }

    function deleteComponent(i: number) {
        setComponent(null);
        setEditedComponent(null);
        setComponentList(prev => prev.slice(0, i).concat(prev.slice(i + 1)))
    }

    function moveComponentUp(i: number) {
        setComponentList(prev => prev.slice(0, i - 1).concat(prev.slice(i - 1, i + 1).reverse()).concat(prev.slice(i + 1)));
    }

    function copyComponent(i: number) {
        setComponentList(prev => prev.concat(prev[i]));
    }

    function moveComponentDown(i: number) {
        setComponentList(prev => prev.slice(0, i).concat(prev.slice(i, i + 2).reverse()).concat(prev.slice(i + 2)));
    }

    function finishSubmission() {
        const formData = { ...campaign, components: componentList, html: emailHtml, mjml: emailMjml, attachments }
        submit(JSON.stringify(formData), { method: 'POST', encType: 'application/json', })
    }

    function getComponentTitle(comp: AnyMJMLComponent) {
        return 'text' in comp
            ? comp.text
            : 'variant' in comp
                ? comp.variant
                : 'src' in comp
                    ? comp.src
                    : comp.id
    }

    return (
        <>
            <AddFileDialog id={campaign.id || 'undefined'} open={fileUploadOpen} setOpen={setFileUploadOpen} />
            <FilesDialog id={campaign.id || 'undefined'} open={filesListOpen} setOpen={setFilesListOpen} />
            <Box m={4}>
                {
                    campaign.status
                        ? <AddForm fields={{ component: '' }} fieldsArray={[{ label: 'Component', id: 'component', type: 'select', options: options }]} handleFormCompletion={selectComponent as (data: object) => void} schema={selectComponentSchema} />
                        : <Box height={'100px'}><Typography textAlign={'center'} variant="h5">Campaign was already sent and cannot be edited</Typography></Box>
                }
                <Grid container spacing={2}>
                    <Grid item xs={12} textAlign={'center'}>
                        <ButtonGroup variant="outlined">
                            <Button onClick={() => setFilesListOpen(true)}>Files</Button>
                            <Button onClick={() => setFileUploadOpen(true)}>Add File</Button>
                        </ButtonGroup>

                    </Grid>
                    <Grid item xs={12} md={12} lg={4}>
                        {component && <>
                            <Typography variant="h6" mx={4}>{editedComponent ? 'Edit' : 'Add'} {component}</Typography>
                            <AddForm fields={editedComponent || emailContentFields[component]} fieldsArray={emailContentFieldArrays[component]} handleFormCompletion={addComponentToList as (data: object) => void} schema={emailComponentSchemas[component]} />
                        </>}
                        {componentList && <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                                <Typography variant="h5">Components</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List dense={true}>
                                    {componentList.map((componentItem, i, arr) => {
                                        return <ListItem
                                            key={`${componentItem.id}_${i}`}
                                            sx={{ border: '1px solid black' }}
                                        >
                                            <ListItemText primary={<Typography variant="body1" fontWeight={'bold'}>{componentItem.id}</Typography>} secondary={<Typography variant="body2" overflow={'hidden'}>{getComponentTitle(componentItem)}</Typography>} />
                                            <IconButton disabled={i === 0} edge="end" aria-label="up" onClick={() => moveComponentUp(i)}>
                                                <KeyboardArrowUp />
                                            </IconButton>
                                            <IconButton disabled={i === arr.length - 1} edge="end" aria-label="down" onClick={() => moveComponentDown(i)}>
                                                <KeyboardArrowDown />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="edit" onClick={() => editComponent(i)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="copy" onClick={() => copyComponent(i)}>
                                                <ContentCopy />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => deleteComponent(i)}>
                                                <Delete />
                                            </IconButton>
                                        </ListItem>
                                    })}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        }
                    </Grid>
                    <Grid item md={12} lg={8}>
                        {emailHtml && <iframe title="emailHtml" srcDoc={emailHtml} style={{ height: '800px', width: '800px', maxWidth: '100%' }} />}
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(prev => prev - 1)}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }}>
                    </Box>
                    <Button variant="contained" onClick={finishSubmission} disabled={!campaign.status}>
                        Save & Preview
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default EditCampaignContent;