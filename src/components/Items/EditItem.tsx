import { useLoaderData, } from "react-router-dom";
import AddItem from "./AddItem";
import { ItemProps } from "../../types/fnProps";

const EditItem = (itemProps: ItemProps) => {
    const item = useLoaderData();

    return (
        <AddItem {...{ ...itemProps, steps: itemProps.editSteps ? itemProps.editSteps : itemProps.steps, item: item }} />
    );
};

export default EditItem;