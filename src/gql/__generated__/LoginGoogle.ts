/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginGoogle
// ====================================================

export interface LoginGoogle_loginGoogle {
  __typename: "InitJWT";
  refreshToken: string;
  accessToken: string;
}

export interface LoginGoogle {
  loginGoogle: LoginGoogle_loginGoogle;
}

export interface LoginGoogleVariables {
  idToken: string;
  rememberMe: boolean;
}
