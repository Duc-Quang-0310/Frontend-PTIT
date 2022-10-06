import request from './axios.connection';
import {
  CheckEmailExistDataResponse,
  CheckEmailExistResponse,
  CreateNewAccountBody,
  CreateNewAccountDataResponse,
  CreateNewAccountResponse
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
