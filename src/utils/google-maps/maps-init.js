import { Loader } from '@googlemaps/js-api-loader';
import { firebaseConfig } from '../firebase/firebase-init';

const loader = new Loader({
    apiKey: firebaseConfig.apiKey,
    version: "weekly",
    libraries: ["places", "geocoding"]
});
export default loader;