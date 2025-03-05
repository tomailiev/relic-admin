import { createContext, Dispatch, SetStateAction } from "react";


type AppErrorType = {
    message: string,
    severity: 'success' | 'error'
}

interface ErrorContextType {
    error: AppErrorType | null,
    setError: Dispatch<SetStateAction<AppErrorType | null>>
}

const ErrorContext = createContext<ErrorContextType>({ error: null, setError: () => { } });

export default ErrorContext;