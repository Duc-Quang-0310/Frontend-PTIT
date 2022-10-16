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

export interface ProvinceData {
  results: {
    province_id: string;
    province_name: string;
    province_type: string;
  }[];
}

export interface DistrictData {
  results: {
    district_id: string;
    district_name: string;
    district_type: string;
    province_id: string;
  }[];
}

export interface WardData {
  results: {
    district_id: string;
    ward_id: string;
    ward_name: string;
    ward_type: string;
  }[];
}

export type Province =
  | {
      province_id: string;
      province_name: string;
      province_type: string;
    }[]
  | null;

export type District =
  | {
      district_id: string;
      district_name: string;
      district_type: string;
      province_id: string;
    }[]
  | null;

export type Ward =
  | {
      district_id: string;
      ward_id: string;
      ward_name: string;
      ward_type: string;
    }[]
  | null;

export type CartItem = {
  id: string;
  img: string;
  price: string;
  quantity: number;
  name: string;
}[];

export interface CreateNewAccountResponse
  extends AxiosResponse<CreateNewAccountDataResponse, any> {}

export interface CheckEmailExistResponse
  extends AxiosResponse<CheckEmailExistDataResponse, any> {}

export interface ProvinceResponse extends AxiosResponse<ProvinceData, any> {}
export interface DistrictResponse extends AxiosResponse<DistrictData, any> {}
export interface WardResponse extends AxiosResponse<WardData, any> {}
