import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction } from "react";
import { UserData } from "../types/DB";

export interface UserContextType {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
    profile: UserData | null;
}

const UserContext = createContext<UserContextType>({ currentUser: null, setCurrentUser: () => { }, profile: null });

export default UserContext;