import { Container } from "@mui/material";
import { getMultiMap } from "../../utils/google-maps/getMap";
import { createRef, useEffect } from "react";

const MapView = ({ donors }) => {
    const mapRef = createRef();

    useEffect(() => {
        getMultiMap(mapRef.current, donors)
            .catch(e => console.log(e))
    }, [donors, mapRef]);

    return (
        <Container disableGutters ref={mapRef} sx={{ width: '100%', height: '600px', borderRadius: '4px' }} />
    );
};

export default MapView;