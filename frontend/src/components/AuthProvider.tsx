import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({} as boolean);

export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }: { children: JSX.Element }) {
  const isMounted = useRef<boolean | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    onAuthStateChanged(auth, (user) => {
      if (user && isMounted.current) {
        setLoggedIn(true);
      } else if (isMounted.current) {
        setLoggedIn(false);
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={loggedIn}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
