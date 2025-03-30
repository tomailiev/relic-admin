import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useSubmit } from "react-router-dom";
import ErrorContext, { AppErrorType } from "../../context/ErrorContext";
import ItemSwitch from "./ItemSwitch";
import AddForm from "../Forms/AddForm";
import AddFile from "../Forms/AddFile";
import AddDynamic from "../Forms/AddDynamic";
// import SubmissionContext from "../../context/SubmissionContext";
import { uploadFile } from "../../utils/firebase/firebase-functions";
import LoadingContext from "../../context/LoadingContext";
import FilterData from "../Forms/FilterData";
import { ItemProps, ItemWithDataColumns, ItemWithFields, ItemWithFileFields, ItemWithInitialFields, ItemWithNestedFields } from "../../types/fnProps";
import { AnyItemType } from "../../types/DB";
import { SubmitTarget } from "react-router-dom/dist/dom";
import hasProperty from "../../vars/hasProperty";


const AddItem = (itemProps: ItemWithFields & ItemWithInitialFields & ItemWithFileFields & ItemWithNestedFields & ItemWithDataColumns) => {

    const [activeStep, setActiveStep] = useState(0);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const { setIsLoading } = useContext(LoadingContext);
    const [submission, setSubmission] = useState<object | null>(null);
    const actionData = useActionData() as AppErrorType | null;

    const labels = {
        files: 'Upload files',
        fieldsArray: 'Fill out the fields',
        initialFieldsArray: 'Fill out the initial fields',
        nestedArray: `Add ${itemProps.nestedName}`,
        dataFilter: `Filter ${itemProps.destinationCollectionField}`,
        preview: 'Preview'
    }

    useEffect(() => {
        if (itemProps.item) {
            setSubmission(itemProps.item);
        }
    }, [itemProps.item]);

    useEffect(() => {

        if (actionData?.error) {
            setError(actionData);
        }

    }, [actionData, setError]);

    useEffect(() => () => setSubmission(null), [setSubmission]);

    function finishSubmission() {

        submit(submission as SubmitTarget, { method: 'POST', action: `/${itemProps.itemType}/${itemProps.item?.id ? itemProps.item.id + '/edit' : 'add'}`, encType: 'application/json' })
    }

    async function handleFileSubmission(data: object | null) {
        if (!data) {
            return handleSubmitEvent();
        }

        const filePaths: { [key: string]: string } = {};

        try {
            setIsLoading(true);
            await Promise.all(itemProps.filesFieldsArray.filter(item => !!hasProperty(data, item.id)).map(async (item) => {
                if (hasProperty(data, item.id)) {
                    const filePath = await uploadFile(data[item.id], `${item.path}/${(data[item.id] as File)?.name}`);
                    filePaths[item.id] = filePath;
                    filePaths[item.displayName] = data[item.id];
                }
                return item;
            }));
            setSubmission(prev => {
                return Object.assign(prev || {}, filePaths);
            })
            setIsLoading(false);
            handleSubmitEvent();
        } catch (error) {
            setIsLoading(false);
            console.log(error);

        }
    }

    function handleObjectSubmission(data: object | null) {

        setSubmission(prev => {
            return Object.assign(prev || {}, data);
        });
        handleSubmitEvent()
    }

    function handleArraySubmission(data: object) {
        setSubmission(prev => {
            return Object.assign(prev || {}, { [itemProps.nestedName]: data });
        });
        handleSubmitEvent();
    }

    async function handleInitialSubmission(initialData: object) {
        setIsLoading(true);

        try {
            const { data } = await itemProps.initialFn(initialData) as { data: object };

            setSubmission(prev => {
                return Object.assign(prev || {}, data);
            });

            setTimeout(() => {
                handleSubmitEvent();
                setIsLoading(false);

            }, 1000);

        } catch (error) {
            setIsLoading(false);
            console.log(error);

        }
    }

    async function handleDataFilterSubmission(data: object) {
        setSubmission(prev => {
            return Object.assign(prev || {}, { [itemProps.tempDestinationField]: data });
        });
        handleSubmitEvent();
    }

    function handleSubmitEvent() {
        setActiveStep(prev => ++prev);
    }

    const steps = {
        files: <AddFile
            filesFields={submission || itemProps.filesFields}
            filesFieldsArray={itemProps.filesFieldsArray}
            schema={itemProps.filesSchema}
            handleFormCompletion={handleFileSubmission}
        />,
        initialFieldsArray: <AddForm
            fields={submission || itemProps.initialFields}
            fieldsArray={itemProps.initialFieldsArray}
            schema={itemProps.initialFieldsArraySchema}
            handleFormCompletion={handleInitialSubmission}
        />,
        fieldsArray: <AddForm
            fields={submission || itemProps.fields}
            fieldsArray={itemProps.fieldsArray}
            handleFormCompletion={handleObjectSubmission}
            schema={itemProps.fieldsArraySchema}
        />,
        nestedArray: <AddDynamic
            nestedFields={submission && hasProperty(submission, itemProps.nestedName) ? submission[itemProps.nestedName] : [itemProps.nestedFields]}
            nestedArray={itemProps.nestedArray}
            nestedName={itemProps.nestedName}
            handleFormCompletion={handleArraySubmission}
            nestedLength={1}
            schema={itemProps.nestedArraySchema}
            blanks={itemProps.nestedFields}
        />,
        dataFilter: <FilterData
            item={submission || {}}
            itemProps={itemProps}
            handleFormCompletion={handleDataFilterSubmission}
        />,
        preview: <ItemSwitch
            item={submission as AnyItemType}
            itemType={itemProps.itemType}
            mutateItem={setSubmission}
        />
    }

    return (
        <Box m={4}>
            <Stepper activeStep={activeStep}>
                {itemProps.steps?.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{labels[label]}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {steps[itemProps.steps[activeStep]]}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => --prev)}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }}>
                </Box>
                {activeStep === itemProps.steps.length - 1 &&
                    <Button variant="contained" onClick={finishSubmission}>
                        Finish
                    </Button>
                }
            </Box>
        </Box>
    );
};

export default AddItem;