import { useLoaderData, } from "react-router-dom";
import AddItem from "./AddItem";
import { ItemWithAllProps } from "../../types/fnProps";
import { AnyItemType } from "../../types/DB";

const EditItem = (itemProps: ItemWithAllProps) => {
    const item = useLoaderData() as AnyItemType;

    return (
        <AddItem {...{ ...itemProps, steps: itemProps.editSteps ? itemProps.editSteps : itemProps.steps, item: item }} />
    );
};

export default EditItem;