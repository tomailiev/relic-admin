import { ActionFunctionArgs, redirect } from "react-router-dom";
import { getMjml, uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";



export default async function campaignEditContentAction({ request }: ActionFunctionArgs) {
    try {
        const res = await request.json();
        if (res.id) {
            const { id: _, datetime: __, ...rest } = res;
            await uploadDoc(rest, collections.campaigns, res.id, true);
            return redirect(`/campaigns/${res.id}`)
        }
        const doc = await getMjml({ components: res.components });
        
        return doc.data;
    } catch (error) {
        console.log('error:' + error);
        const data = { errors: [{ message: error }] };
        return { data };
    }
    
}