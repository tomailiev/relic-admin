import { Container } from "@mui/material";
import { getMultiMap } from "../../utils/google-maps/getMap";
import { createRef, useEffect } from "react";
import { Donor } from "../../types/DB";

const MapView = ({ donors }: { donors: Donor[] }) => {
    const mapRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (mapRef.current) {
            getMultiMap(mapRef.current, donors)
                .catch(e => console.log(e))
        }
    }, [donors, mapRef]);

    return (
        <Container disableGutters ref={mapRef} sx={{ width: '100%', height: '600px', borderRadius: '4px' }} />
    );
};

export default MapView;