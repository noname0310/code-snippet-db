/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocalUserInput } from "./../../../codegen/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RegisterLocal
// ====================================================

export interface RegisterLocal_registerLocal {
  __typename: "User";
  id: string;
}

export interface RegisterLocal {
  registerLocal: RegisterLocal_registerLocal | null;
}

export interface RegisterLocalVariables {
  user: LocalUserInput;
}
