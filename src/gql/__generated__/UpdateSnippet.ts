/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CodeSnippetUpdate } from "./../../../codegen/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSnippet
// ====================================================

export interface UpdateSnippet_updateSnippet {
  __typename: "CodeSnippet";
  id: number;
}

export interface UpdateSnippet {
  updateSnippet: UpdateSnippet_updateSnippet;
}

export interface UpdateSnippetVariables {
  id: number;
  snippet: CodeSnippetUpdate;
}
