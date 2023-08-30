import getCoordinates from "./getCoordinates";
import loader from "./maps-init";

export default async function getMap(mapRef, address, location) {
    const position = await getCoordinates(address, location);
    const { Map } = await loader.importLibrary('maps');
    const { Marker } = await loader.importLibrary('marker');

    const map = new Map(mapRef, {
        center: position,
        zoom: 9
    });
    const marker = new Marker({
        position: position,
        map: map,
    });

}