import { redirect } from "react-router-dom";
import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function campaignLoader({ request }) {
    const url = new URL(request.url);
    const subject = url.searchParams.get('subject');

    if (subject) {
        return downloadDocsV2(collections.campaigns, [{ type: 'condition', value: ['subject', '==', decodeURI(subject)] }], true)
            .then(campaign => {
                return campaign
                    ? redirect(`/campaigns/${campaign.id}`)
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