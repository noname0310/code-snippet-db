import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { DARK_THEME, LIGHT_THEME } from './constants/css';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { setContext } from '@apollo/client/link/context';
import { JWT_LOCAL_STORAGE_KEY } from './constants/localStorage';
import JwtTokenRefresher from './components/organisms/JwtTokenRefresher';
import { API_URL } from './constants/apolloClient';

export function getSession(): { token: string | null } {
    return {
        token: localStorage.getItem(JWT_LOCAL_STORAGE_KEY),
    };
}

const httpLink = createHttpLink({
    uri: API_URL
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);

    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : '',
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <ApolloProvider client={client}>
        <AuthProvider>
            <ThemeProvider theme={DARK_THEME || LIGHT_THEME}>
                <ToastProvider>
                    <JwtTokenRefresher />
                    <App/>
                </ToastProvider>
            </ThemeProvider>
        </AuthProvider>
    </ApolloProvider>
    // </React.StrictMode>
);
