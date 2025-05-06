import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction } from "react";

export interface UserContextType {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({ currentUser: null, setCurrentUser: () => { } });

export default UserContext;