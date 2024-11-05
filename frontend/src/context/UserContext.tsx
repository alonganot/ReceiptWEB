import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { User } from "../types/User";

interface iUserContext {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    clearUser: () => void,
    isUserPresent: () => boolean
}
const UserContext = React.createContext<iUserContext | null>(null)

export const useUserContext = () => useContext(UserContext) as iUserContext
const defaultUser: User = {
    id: 'empty',
    nickname: 'אורח',
    picture: ''
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(defaultUser);

    const isUserPresent = () => {
        return user.id !== 'empty'
    }

    const clearUser = (): void => {
        setUser(defaultUser)
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearUser, isUserPresent }}>
            {children}
        </UserContext.Provider>
    )
}