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

export function getSession(): { token: string | null } {
    return {
        token: localStorage.getItem(JWT_LOCAL_STORAGE_KEY),
    };
}

const httpLink = createHttpLink({
    uri: 'https://api.hkt-2022.kro.kr/graphql',
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
            <ThemeProvider theme={LIGHT_THEME || DARK_THEME}>
                <ToastProvider>
                    <JwtTokenRefresher />
                    <App/>
                </ToastProvider>
            </ThemeProvider>
        </AuthProvider>
    </ApolloProvider>
    // </React.StrictMode>
);
