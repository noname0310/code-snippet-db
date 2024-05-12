import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../gql/queries';
import { GetCurrentUser } from '../gql/__generated__/GetCurrentUser';

function useCurrentUser(): GetCurrentUser['currentUser'] | null {
    const apolloClient = useApolloClient();
    const [user, setUser] = useState<GetCurrentUser['currentUser'] | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await getCurrentUser(apolloClient);
                setUser(res.data.currentUser);
            } catch(e) {
                setUser(null);
            }
        })();
    }, [apolloClient]);

    return user;
}

export default useCurrentUser;