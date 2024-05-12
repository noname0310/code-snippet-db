/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentUser
// ====================================================

export interface GetCurrentUser_currentUser_ranking {
  __typename: "UserRanking";
  totalRanking: number;
}

export interface GetCurrentUser_currentUser {
  __typename: "User";
  id: string;
  username: string;
  createdAt: any;
  ranking: GetCurrentUser_currentUser_ranking;
}

export interface GetCurrentUser {
  currentUser: GetCurrentUser_currentUser;
}
