import axios from 'axios';
import request from './axios.connection';
import {
  CheckEmailExistDataResponse,
  CheckEmailExistResponse,
  CreateNewAccountBody,
  CreateNewAccountDataResponse,
  CreateNewAccountResponse,
  DistrictData,
  DistrictResponse,
  LoginToExistedAccountBody,
  LoginToExistedAccountData,
  LoginToExistedAccountResponse,
  ProvinceData,
  ProvinceResponse,
  WardData,
  WardResponse
} from './client.interface';

export const createNewAccount = async (
  params: CreateNewAccountBody
): Promise<CreateNewAccountDataResponse> => {
  const response: CreateNewAccountResponse = await request.post(
    '/api/user/sign-up',
    params
  );
  return response.data;
};

export const validateEmailExist = async (
  email: string
): Promise<CheckEmailExistDataResponse> => {
  const response: CheckEmailExistResponse = await request.post(
    '/api/user/email-check',
    { email }
  );
  return response.data;
};

export const getProvince = async (): Promise<ProvinceData> => {
  const response: ProvinceResponse = await axios.get(
    'https://vapi.vnappmob.com/api/province'
  );
  return response.data;
};

export const getDistrict = async (
  provinceId: string
): Promise<DistrictData> => {
  const response: DistrictResponse = await axios.get(
    `https://vapi.vnappmob.com/api/province/district/${provinceId}`
  );
  return response.data;
};

export const getWard = async (districtID: string): Promise<WardData> => {
  const response: WardResponse = await axios.get(
    `https://vapi.vnappmob.com/api/province/ward/${districtID}`
  );
  return response.data;
};

export const loginToExistedAccount = async (
  params: CreateNewAccountBody
): Promise<LoginToExistedAccountData> => {
  const response: LoginToExistedAccountResponse = await request.post(
    '/api/user/log-in',
    params
  );
  return response.data;
};
