import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { User } from "../types/User";

interface iUserContext {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    clearUser: () => void,
}
const UserContext = React.createContext<iUserContext | null>(null)

export const useUserContext = () => useContext(UserContext) as iUserContext
const defaultUser: User = {
    id: 'test-id',
    nickname: 'אלונגה',
    picture: ''
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(defaultUser);

    const clearUser = (): void => {
        setUser(defaultUser)
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearUser}}>
            {children}
        </UserContext.Provider>
    )
}