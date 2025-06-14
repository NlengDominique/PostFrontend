import { createContext, useState, useEffect } from "react";

export const AppContext = createContext()

export default function AppProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token'))

    const [user, setUser] = useState(null)

    const getUser = async () => {

        const res = await fetch('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await res.json()

        if (res.ok) {
            setUser(data)
        }




    }

    useEffect(() => {
        if (token) {
            getUser()
        }
    }, [token])


    return (
        <AppContext.Provider value={{ token, setToken, user,setUser }}>

            {children}

        </AppContext.Provider>
    )
}