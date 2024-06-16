'use client';
import React, { useContext, useState, createContext, ReactNode } from "react";

// Define the User interface
interface User {
    createdAt: string;
    email: string;
    id: string;
    image_url: string | null;
    updatedAt: string;
    username: string;
}

// Define the context properties interface
interface AppContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
    token: string;
    setToken: (token: string) => void;
    logout: () => void;
}

// Create the context with default values
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Custom hook to use the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}

// Define the provider's props interface
interface AppProviderProps {
    children: ReactNode;
    initialUser?: User | null;
    initialAccessToken?: string;
}

export default function AppProvider({ children, initialUser = null, initialAccessToken = '' }: AppProviderProps) {
    const [user, setUser] = useState<User | null>(initialUser);
    const [token, setToken] = useState<string>(initialAccessToken);

    const logout = () => {
        setUser(null);
        setToken('');
    };

    return (
        <AppContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </AppContext.Provider>
    );
}
