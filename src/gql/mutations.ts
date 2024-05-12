import { ApolloClient, gql } from '@apollo/client';

import { IssueEmailToken, IssueEmailTokenVariables } from './__generated__/IssueEmailToken';
import { LoginGoogle, LoginGoogleVariables } from './__generated__/LoginGoogle';
import { LoginLocal, LoginLocalVariables } from './__generated__/LoginLocal';
import { RefreshAccessToken, RefreshAccessTokenVariables } from './__generated__/RefreshAccessToken';
import { RegisterLocal, RegisterLocalVariables } from './__generated__/RegisterLocal';
import { RequestEmailCheck, RequestEmailCheckVariables } from './__generated__/RequestEmailCheck';
import { RequestResetPasswordEmail, RequestResetPasswordEmailVariables } from './__generated__/RequestResetPasswordEmail';
import { ResetPassword, ResetPasswordVariables } from './__generated__/ResetPassword';
import { UpdateUser, UpdateUserVariables } from './__generated__/UpdateUser';
import { VerifyEmail, VerifyEmailVariables } from './__generated__/VerifyEmail';

export function registerLocal(
    apolloClient: ApolloClient<any>,
    variables: RegisterLocalVariables
) {
    return apolloClient.mutate<RegisterLocal>({
        mutation: gql`
            mutation RegisterLocal($user: LocalUserInput!) {
                registerLocal(user: $user) {
                    id
                }
            }
        `,
        variables
    });    
}

export function loginLocal(
    apolloClient: ApolloClient<any>,
    variables: LoginLocalVariables
) {
    return apolloClient.mutate<LoginLocal>(
        {
            mutation: gql`
                mutation LoginLocal($email: String!, $password: String!, $rememberMe: Boolean!) {
                    loginLocal(email: $email, password: $password, rememberMe: $rememberMe) {
                        refreshToken,
                        accessToken
                    }
                }
            `,
            variables
        }
    );
}

export function loginGoogle(
    apolloClient: ApolloClient<any>,
    variables: LoginGoogleVariables
) {
    return apolloClient.mutate<LoginGoogle>(
        {
            mutation: gql`
                mutation LoginGoogle($idToken: String!, $rememberMe: Boolean!) {
                    loginGoogle(idToken: $idToken, rememberMe: $rememberMe) {
                        refreshToken,
                        accessToken
                    }
                }
            `,
            variables
        }
    );
}

export function refreshAccessToken(
    apolloClient: ApolloClient<any>,
    variables: RefreshAccessTokenVariables
) {
    return apolloClient.mutate<RefreshAccessToken>({
        mutation: gql`
            mutation RefreshAccessToken($refreshToken: String!) {
                refreshAccessToken(refreshToken: $refreshToken)
            }
        `,
        variables
    });
}

export function updateUser(
    apolloClient: ApolloClient<any>,
    variables: UpdateUserVariables
) {
    return apolloClient.mutate<UpdateUser>({
        mutation: gql`
            mutation UpdateUser($user: UserUpdate!) {
                updateUser(user: $user) {
                    id
                }
            }
        `,
        variables
    });
}

export function resetPassword(
    apolloClient: ApolloClient<any>,
    variables: ResetPasswordVariables
) {
    return apolloClient.mutate<ResetPassword>({
        mutation: gql`
            mutation ResetPassword($password: String!, $emailToken: String!) {
                resetPassword(password: $password, emailToken: $emailToken) {
                    id
                }
            }
        `,
        variables
    });
}

export function requestEmailCheck(
    apolloClient: ApolloClient<any>,
    variables: RequestEmailCheckVariables
) {
    return apolloClient.mutate<RequestEmailCheck>({
        mutation: gql`
            mutation RequestEmailCheck($email: String!) {
                requestEmailCheck(email: $email) {
                    id
                }
            }
        `,
        variables
    });
}

export function verifyEmail(
    apolloClient: ApolloClient<any>,
    variables: VerifyEmailVariables
) {
    return apolloClient.mutate<VerifyEmail>({
        mutation: gql`
            mutation VerifyEmail($verifyId: String!) {
                verifyEmail(verifyId: $verifyId)
            }
        `,
        variables
    });
}

export function issueEmailToken(
    apolloClient: ApolloClient<any>,
    variables: IssueEmailTokenVariables
) {
    return apolloClient.mutate<IssueEmailToken>({
        mutation: gql`
            mutation IssueEmailToken($emailCheckId: String!) {
                issueEmailToken(emailCheckId: $emailCheckId)
            }
        `,
        variables
    });
}

export function requestResetPasswordEmail(
    apolloClient: ApolloClient<any>,
    variables: RequestResetPasswordEmailVariables
) {
    return apolloClient.mutate<RequestResetPasswordEmail>({
        mutation: gql`
            mutation RequestResetPasswordEmail($email: String!) {
                requestResetPasswordEmail(email: $email)
            }
        `,
        variables
    });
}
