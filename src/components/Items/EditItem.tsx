import { useLoaderData, } from "react-router-dom";
import AddItem from "./AddItem";

const EditItem = (itemProps) => {
    const item = useLoaderData();

    return (
        <AddItem {...{ ...itemProps, steps: itemProps.editSteps ? itemProps.editSteps : itemProps.steps, item: item }} />
    );
};

export default EditItem;