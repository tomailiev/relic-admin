import { firebaseConfig } from "../firebase/firebase-init";
// import loader from "./maps-init";

// export default function getCoordinates(address: string, location: string) {
//     return loader.importLibrary('geocoding')
//         .then(({ Geocoder }) => {
//             const geocoder = new Geocoder();
//             return geocoder.geocode({ address: `${address || ''}, ${location || ''}` })
//         })
//         .then(({ results }) => {
//             return {
//                 lat: results[0]?.geometry.location.lat(),
//                 lng: results[0]?.geometry.location.lng()
//             };
//         });
// }

export default async function getCoordinates(address: string, location: string) {
  const query = `${address || ''}, ${location || ''}`.trim();

  const response = await fetch(
    `https://places.googleapis.com/v1/places:searchText?key=${firebaseConfig.apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-FieldMask": "places.location"
      },
      body: JSON.stringify({
        textQuery: query
      })
    }
  );

  const data = await response.json();
  const loc = data.places?.[0]?.location;

  return {
    lat: loc?.latitude ?? null,
    lng: loc?.longitude ?? null
  };
}
