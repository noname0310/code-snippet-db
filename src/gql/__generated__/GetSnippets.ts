/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSnippets
// ====================================================

export interface GetSnippets_snippets_author {
  __typename: "User";
  id: string;
  username: string;
}

export interface GetSnippets_snippets {
  __typename: "CodeSnippet";
  id: number;
  name: string;
  author: GetSnippets_snippets_author;
  description: string;
  content: string;
  contentLanguage: string;
  createdAt: any;
}

export interface GetSnippets {
  snippets: GetSnippets_snippets[];
}
