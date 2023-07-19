import { useLoaderData } from "react-router-dom";
import TextItem from "./TextItem";

const TextItemRoute = () => {

    const text = useLoaderData();
    return (
        <TextItem item={text} />
    );
};

export default TextItemRoute;