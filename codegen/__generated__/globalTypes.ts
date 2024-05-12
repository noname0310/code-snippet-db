/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface LocalUserInput {
  password: string;
  username: string;
  emailToken: string;
}

export interface TodoGroupInput {
  name: string;
  description: string;
}

export interface TodoInput {
  content: string;
  priority: number;
}

export interface TodoUpdate {
  content: string;
  priority: number;
  completed: boolean;
}

export interface UserUpdate {
  username: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
