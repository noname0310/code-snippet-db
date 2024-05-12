/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginLocal
// ====================================================

export interface LoginLocal_loginLocal {
  __typename: "InitJWT";
  refreshToken: string;
  accessToken: string;
}

export interface LoginLocal {
  loginLocal: LoginLocal_loginLocal;
}

export interface LoginLocalVariables {
  email: string;
  password: string;
  rememberMe: boolean;
}
