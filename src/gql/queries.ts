import { ApolloClient, gql } from '@apollo/client';

import { GetCurrentUser } from './__generated__/GetCurrentUser';
import { GetUser, GetUserVariables } from './__generated__/GetUser';
import { IsEmailUsed, IsEmailUsedVariables } from './__generated__/IsEmailUsed';

export function isEmailUsed(
    apolloClient: ApolloClient<any>,
    variables: IsEmailUsedVariables
) {
    return apolloClient.query<IsEmailUsed>({
        query: gql`
            query IsEmailUsed($email: String!) {
                isEmailUsed(email: $email)
            }
        `,
        variables
    });
}

export function getUser(
    apolloClient: ApolloClient<any>,
    variables: GetUserVariables
) {
    return apolloClient.query<GetUser>({
        query: gql`
            query GetUser($id: String!) {
                User(id: $id) {
                    id,
                    username,
                    createdAt,
                    ranking {
                        totalRanking
                    }
                }
            }
        `,
        variables
    });
}

export function getCurrentUser(
    apolloClient: ApolloClient<any>
) {
    return apolloClient.query<GetCurrentUser>({
        query: gql`
            query GetCurrentUser {
                currentUser {
                    id,
                    username,
                    createdAt,
                    ranking {
                        totalRanking
                    }
                }
            }
        `
    });
}
