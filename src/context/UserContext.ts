import { User } from "firebase/auth";
import { createContext } from "react";

interface UserContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;