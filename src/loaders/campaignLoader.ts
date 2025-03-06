import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function campaignLoader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const subject = url.searchParams.get('subject');

    if (subject) {
        return downloadDocsV2(collections.campaigns, [{ type: 'condition', value: ['subject', '==', decodeURI(subject)] }, { type: 'limit', value: 1 }])
            .then(campaigns => {
                return campaigns
                    ? redirect(`/campaigns/${campaigns[0].id}`)
                    : redirect('/campaigns/no-data')
            })
            .catch(e => {
                return [{ name: 'Error', link: e.code, id: e.code, error: true }];
            })

    }

    return downloadDocsV2(collections.campaigns)
        // .then(docs => ({ docs: docs.map(doc => doc.email) }))
        .catch(e => {
            return [{ name: 'Error', link: e.code, id: e.code, error: true }];
        })
}