import { createContext, Dispatch, SetStateAction } from "react";


export type AppErrorType = {
    message: string,
    severity: 'success' | 'error',
    error?: boolean,
    code?: string
}

interface ErrorContextType {
    error: AppErrorType | null,
    setError: Dispatch<SetStateAction<AppErrorType | null>>
}

const ErrorContext = createContext<ErrorContextType>({ error: null, setError: () => { } });

export default ErrorContext;