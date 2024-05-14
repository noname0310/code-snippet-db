/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CodeSnippetInput } from "./../../../codegen/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSnippet
// ====================================================

export interface CreateSnippet_createSnippet {
  __typename: "CodeSnippet";
  id: number;
  name: string;
  description: string;
  content: string;
  contentLanguage: string;
}

export interface CreateSnippet {
  createSnippet: CreateSnippet_createSnippet;
}

export interface CreateSnippetVariables {
  snippet: CodeSnippetInput;
}
