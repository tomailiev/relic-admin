import { createContext, Dispatch, SetStateAction } from "react";

interface LoadingContextType {
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}
const LoadingContext = createContext<LoadingContextType>({ isLoading: false, setIsLoading: () => { } });

export default LoadingContext;