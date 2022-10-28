import { createContext, useState, useEffect } from 'react';
import { Encrypt, Decrypt } from '../components';
export const userContext = createContext({
    user: null,
    setUser: (user) => { },
})

const App = ({ children }) => {
    const storage = sessionStorage; //localStorage;
    const [user, addUser] = useState(storage.getItem('user') ? Decrypt(storage.getItem('user')) : null);
    const setUser = (user) => {
        addUser(prevState => (user))
    }
    //
    useEffect(() => {
        user ? storage.setItem('user', Encrypt(user)) : storage.removeItem('user')
    }, [storage, user])
    //
    return (
        <userContext.Provider
            value={{
                user,
                setUser,
            }}>
            {children}
        </userContext.Provider>
    )
}

export default App;