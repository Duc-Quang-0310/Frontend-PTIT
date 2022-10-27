import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import request from './axios.connection';
import {
  CheckEmailExistDataResponse,
  CheckEmailExistResponse,
  Comment,
  CommentList,
  CommentListResponse,
  CommentResponse,
  CommentWithoutId,
  CreateNewAccountBody,
  CreateNewAccountDataResponse,
  CreateNewAccountResponse,
  DistrictData,
  DistrictResponse,
  GetListLaptopPaginateBody,
  Laptop,
  LaptopDetailResponse,
  LaptopListResponse,
  ListProfileResponse,
  LoginToExistedAccountData,
  LoginToExistedAccountResponse,
  Profiles,
  ProvinceData,
  ProvinceResponse,
  Receipt,
  UpdateProfileBody,
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

export const getAllProfile = async (): Promise<Profiles[]> => {
  const response: ListProfileResponse = await request.get(
    '/api/user/get-all-profile'
  );
  return response.data;
};

export const getListLaptop = async (
  option?: AxiosRequestConfig
): Promise<Laptop[]> => {
  const response: LaptopListResponse = await request.get('/api/laptop', option);
  return response.data.data;
};

export const getListLaptopPaginate = async ({
  page,
  size
}: GetListLaptopPaginateBody): Promise<Laptop[]> => {
  const response: LaptopListResponse = await request.get(
    `/api/laptop/pagination?page=${page}&size=${size}`
  );
  return response.data.data;
};

export const getDetailLaptop = async (id: string): Promise<Laptop> => {
  const response: LaptopDetailResponse = await request.get(`/api/laptop/${id}`);
  return response.data.laptop;
};

export const recoverPassword = async (params: {
  email: string;
  password: string;
}): Promise<string> => {
  const response: AxiosResponse<{ message: string }> = await request.post(
    `/api/user/password-recover`,
    params
  );
  return response.data.message;
};

export const changePassword = async (params: {
  oldPassword: string;
  newPassword: string;
  userId: string;
}): Promise<string> => {
  const response: AxiosResponse<{ message: string }> = await request.post(
    `/api/user/change-password`,
    params
  );
  return response.data.message;
};

export const paymentBill = async (params: {
  userId: string;
  items: string[];
  cash: string;
  lastModify: Date;
  telephone: string;
  address: string;
  quantity: number[];
}) => {
  const response = await request.post(`/api/receipt`, params);
  return response.status;
};

export const getAllReceipt = async (userId: string): Promise<Receipt[]> => {
  const response: AxiosResponse<{ data: Receipt[] }> = await request.get(
    `/api/receipt/${userId}`
  );
  return response.data.data;
};

export const getCommentList = async (id: string): Promise<CommentList[]> => {
  const response: CommentListResponse = await request.get(`/api/laptop/${id}`);
  return response.data.comments;
};

export const addNewComment = async (
  params: CommentWithoutId
): Promise<Comment> => {
  const response: CommentResponse = await request.post(
    `/api/laptop/comment`,
    params
  );
  return response.data.data;
};

export const updateCommentById = async (
  commentId: string,
  params: CommentWithoutId
): Promise<Comment> => {
  const response: CommentResponse = await request.put(
    `/api/laptop/comment/${commentId}`,
    params
  );
  return response.data.data;
};

export const deleteCommentById = async (
  commentId: string,
  params: { userId: string }
): Promise<Comment> => {
  const response: CommentResponse = await request.delete(
    `/api/laptop/comment/${commentId}`,
    { data: params }
  );
  return response.data.data;
};

export const avatarUpload = async (data: FormData): Promise<string> => {
  const response: AxiosResponse<string> = await request.post(
    `/api/profile/avatar-upload`,
    data,
    {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    }
  );

  return response.data;
};

export const updateProfile = async (body: UpdateProfileBody, userID: string) =>
  request.put(`/api/profile/${userID}`, body);

export const getProfile = async (profileID: string) => {
  const response: AxiosResponse<Profiles> = await request.get(
    `/api/profile/${profileID}`
  );
  return response.data;
};
