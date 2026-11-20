import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default function stripeChargeLoader() {
    return downloadDocsV2('stripeCharges')
        .catch(e => {
            return [{ name: 'Error', link: e.code, id: e.code, error: true }];
        })
}