/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_User_ranking {
  __typename: "UserRanking";
  totalRanking: number;
}

export interface GetUser_User {
  __typename: "User";
  id: string;
  username: string;
  createdAt: any;
  ranking: GetUser_User_ranking;
}

export interface GetUser {
  User: GetUser_User;
}

export interface GetUserVariables {
  id: string;
}
