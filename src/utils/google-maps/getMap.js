import { MarkerClusterer } from "@googlemaps/markerclusterer";

import getCoordinates from "./getCoordinates";
import loader from "./maps-init";


async function getMap(mapRef, address, location) {
    const position = await getCoordinates(address, location);
    const { Map, InfoWindow } = await loader.importLibrary('maps');
    const { Marker } = await loader.importLibrary('marker');
    const map = new Map(mapRef, {
        center: position,
        zoom: 9
    });
    const marker = new Marker({
        position: position,
        map: map,
    });

    const infoWindow = new InfoWindow();

    function showWindow() {
        infoWindow.open({
            anchor: marker,
            map,
        });
    }
    marker.addListener("mouseover", showWindow);
    marker.addListener("mousedown", showWindow);
    marker.addListener("mouseout", () => {
        infoWindow.close();
    })

    return infoWindow;
}

async function getMultiMap(mapRef, markers,) {
    const { Map, InfoWindow } = await loader.importLibrary('maps');
    const { Marker } = await loader.importLibrary('marker');

    const center = { lat: 37.0902, lng: -95.7129 };

    const map = new Map(mapRef, {
        center: center,
        zoom: 4
    });

    const gmapMarkers = markers.map(async ({ address, location, firstName, lastName }) => {
        const position = await getCoordinates(address, location);
        const marker = new Marker({
            position: position,
            map: map,
        });
        const infoWindow = new InfoWindow({ content: `${firstName} ${lastName}` });

        function showWindow() {
            infoWindow.open({
                anchor: marker,
                map,
            });
        }
        marker.addListener("mouseover", showWindow);
        marker.addListener("mousedown", showWindow);
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
        return marker
    })

    const markerCluster = new MarkerClusterer({ map, gmapMarkers });

    return markerCluster;
}

export { getMap, getMultiMap }