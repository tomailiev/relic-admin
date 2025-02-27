import loader from "./maps-init";

export default function getCoordinates(address, location) {
    return loader.importLibrary('geocoding')
        .then(({ Geocoder }) => {
            const geocoder = new Geocoder();
            return geocoder.geocode({ address: `${address || ''}, ${location || ''}` })
        })
        .then(({ results }) => {
            return {
                lat: results[0]?.geometry.location.lat(),
                lng: results[0]?.geometry.location.lng()
            };
        });
}