import { MarkerClusterer } from "@googlemaps/markerclusterer";

import getCoordinates from "./getCoordinates";
import loader from "./maps-init";
import { DonorItemProps } from "../../types/itemProps";


async function getMap(mapRef: HTMLElement, address: string, location: string) {
    const position = await getCoordinates(address, location);
    const { Map, InfoWindow } = await loader.importLibrary('maps');
    const { AdvancedMarkerElement } = await loader.importLibrary('marker');
    const map = new Map(mapRef, {
        center: position,
        zoom: 9,
        mapId: 'single_donor'
    });
    const marker = new AdvancedMarkerElement({
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

async function getMultiMap(mapRef: HTMLDivElement, items: DonorItemProps['item'][],) {
    const { Map, InfoWindow } = await loader.importLibrary('maps');
    const { AdvancedMarkerElement } = await loader.importLibrary('marker');

    const center = { lat: 37.0902, lng: -95.7129 };

    const map = new Map(mapRef, {
        center: center,
        zoom: 4,
        mapId: 'multi_donor'
    });

    const gmapMarkers = await Promise.all(items.filter(({address, location}) => !!address || !!location).map(async ({ address, location, firstName, lastName, donations }) => {
        const position = await getCoordinates(address, location);
        const marker = new AdvancedMarkerElement({
            position: position,
            // map: map,
        });
        const infoWindow = new InfoWindow({ content: `${firstName} ${lastName}, $${donations.reduce((acc, curr) => acc + curr.amount, 0)}` });

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
        return marker;
    }));
    const markerCluster = new MarkerClusterer({ map, markers: gmapMarkers });

    return markerCluster;
}

export { getMap, getMultiMap }