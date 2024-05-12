import { createContext } from 'react';
import React from 'react';

import { JWT_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import useLocalStorageRawState from '../hooks/useLocalStorageRawState';


interface AuthContextState {
    jwt: string | null;
    setJwt: (jwt: string) => void,
}
export const AuthContext = createContext<AuthContextState>({
    jwt: null,
    setJwt: _=>_,
});

interface AuthProviderProps {
    children: React.ReactNode|React.ReactNode[];
}

export function AuthProvider(props: AuthProviderProps): JSX.Element {
    const [jwt, setJwt] = useLocalStorageRawState('', JWT_LOCAL_STORAGE_KEY);
    
    const state = {
        jwt,
        setJwt,
    };

    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return React.useContext(AuthContext);
}