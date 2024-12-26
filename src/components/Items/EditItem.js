import { useContext, useEffect } from "react";
import { useLoaderData, } from "react-router-dom";
import AddItem from "./AddItem";
import SubmissionContext from "../../context/SubmissionContext";

const EditItem = (itemProps) => {
    const { setSubmission } = useContext(SubmissionContext);
    const item = useLoaderData();

    useEffect(() => {
        
        setSubmission(item);
    }, [item, setSubmission])


    return (
        <AddItem {...{ ...itemProps, steps: itemProps.editSteps ? itemProps.editSteps : itemProps.steps, itemID: item.id }} />
    );
};

export default EditItem;