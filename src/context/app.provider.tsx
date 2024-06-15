
'use client'
import { useContext, useState, createContext } from "react";
const AppContext = createContext({
    token: '',
    setToken: (token: string) => {},
})
export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context;
}

export default function AppProvider({children, initialAccessToken=''} : {children: React.ReactNode, initialAccessToken?: string}) {
    const [token, setToken] = useState(initialAccessToken)
    return (
        <AppContext.Provider value={{token, setToken}}>
            {children}
        </AppContext.Provider>
    )
};