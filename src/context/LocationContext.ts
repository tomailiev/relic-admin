import { createContext, Dispatch, SetStateAction } from "react";

export interface LocationContextType {
    location: string | null;
    setLocation: Dispatch<SetStateAction<string | null>>;
}

const LocationContext = createContext<LocationContextType>({ location: null, setLocation: () => { } });

export default LocationContext;