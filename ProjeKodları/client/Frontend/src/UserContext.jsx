import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            if (!savedUser) return null;
            return JSON.parse(savedUser);
        } catch (err) {
            console.error("(My) Cannot Read LocalStorage", err);
            return null;
        }
    });


    const login = (userData) => {
        if (!userData) return;
        const userObject = typeof userData === "string" ? { email: userData } : userData;

        const existing = localStorage.getItem("user");
        if (existing === JSON.stringify(userObject)) return;

        localStorage.setItem("user", JSON.stringify(userObject));
        setUser(userObject);
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    )

}

export function useUser() {
    return useContext(UserContext);
}