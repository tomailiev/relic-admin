import { createContext, Dispatch, SetStateAction } from "react";
interface MenuContextType {
    mobileOpen: boolean,
    setMobileOpen: Dispatch<SetStateAction<boolean>>
}
const MenuContext = createContext<MenuContextType>({ mobileOpen: false, setMobileOpen: () => { } });

export default MenuContext;