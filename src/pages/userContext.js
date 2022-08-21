import { createContext, useState, useEffect, useContext } from "react";
import {onAuthStateChanged, 
    signInWithEmailAndPassword
    } from "firebase/auth";
import {auth} from "../firebase-config";

const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
      setLoading(true);
      const unsubscribe = onAuthStateChanged(auth, (res) => {
        res ? setUser(res) : setUser(null);
        setError("");
        setLoading(false);
      });
      return unsubscribe;
    }, []);

    const signIn = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((res) => console.log(res))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }

    const contextValue = {
        user,
        loading,
        error,
        signIn
    };
    
    return <UserContextProvider value={contextValue}>
        {children}
    </UserContextProvider>
}