import { downloadOneDoc } from "../../utils/firebase/firebase-functions";

export default async function eventItemLoader({ params }) {
    // console.log(params);
    return await downloadOneDoc('events', params.eventId);
}