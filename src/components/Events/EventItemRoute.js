import { useLoaderData } from "react-router-dom";
import EventItem from "./EventItem";

const EventItemRoute = () => {

    const event = useLoaderData();
    return (
        <EventItem item={event} />
    );
};

export default EventItemRoute;