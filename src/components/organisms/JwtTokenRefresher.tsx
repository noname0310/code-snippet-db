import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { REFRESH_TOKEN_LOCAL_STORAGE_KEY } from '../../constants/localStorage';
import { useAuthContext } from '../../contexts/AuthContext';
import useToast from '../../contexts/ToastContext';
import * as Mutation from '../../gql/mutations';

function JwtTokenRefresher(): JSX.Element {
    const apolloClient = useApolloClient();
    const { setJwt } = useAuthContext();
    const toast = useToast();

    useEffect(() => {
        const timer = setInterval(() => {
            const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
            if (refreshToken) {
                Mutation.refreshAccessToken(
                    apolloClient,
                    { refreshToken }
                ).then(res => {
                    if (!res.data?.refreshAccessToken) throw new Error('No access token');
                    apolloClient.resetStore();
                    setJwt(res.data?.refreshAccessToken);
                }).catch(error => {
                    toast.showToast(error.message, 'error');
                });
            }
        }, 5000);

        return () => clearInterval(timer);
    }, [apolloClient, setJwt, toast]);

    return <></>;
}

export default JwtTokenRefresher;
