import { AxiosResponse } from 'axios';

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
  SPECIALIST = 'Specialist'
}

export enum UserStatus {
  ACTIVE = 'Active',
  IN_ACTIVE = 'InActive',
  BAN = 'Ban'
}

export interface CreateNewAccountBody {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface CreateNewAccountDataResponse {
  success: boolean;
  message: string;
}

export interface CheckEmailExistDataResponse {
  exist: boolean;
}

export interface CreateNewAccountResponse
  extends AxiosResponse<CreateNewAccountDataResponse, any> {}

export interface CheckEmailExistResponse
  extends AxiosResponse<CheckEmailExistDataResponse, any> {}
