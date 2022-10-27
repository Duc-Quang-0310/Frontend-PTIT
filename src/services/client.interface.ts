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
  onComplete?: Function;
}

export interface CreateNewAccountDataResponse {
  success: boolean;
  message: string;
}

export interface CreateNewCommentDataResponse
  extends CreateNewAccountDataResponse {}

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

export interface LoginToExistedAccountBody {
  email: string;
  password: string;
  onComplete?: Function;
}

export interface Profiles {
  _id: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  address?: string;
  province?: string;
  district?: string;
  ward?: string;
  updatedAt?: Date;
  avatar?: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: UserRole;
  status: UserStatus;
  token?: string;
}

export interface LoginToExistedAccountData {
  data?: {
    userInfo: User;
    profile: Profiles;
  };
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface Laptop {
  _id: string;
  laptopID?: string;
  brand?: string;
  type?: string;
  partNumber?: string;
  color?: string;
  chip?: string;
  chipSet?: string;
  rom?: string;
  connector?: string;
  ram?: string;
  vga?: string;
  disk?: string;
  lightDisk?: string;
  cardReader?: string;
  technology?: string;
  screen?: string;
  webcam?: string;
  audio?: string;
  internet?: string;
  noWires?: string;
  connectionPort?: string;
  battery?: string;
  size?: string;
  weight?: string;
  window?: string;
  accessory?: string;
  updatedAt?: Date;
  review?: string;
  cpu: string;
  keyboard: string;
  productName: string;
  sku: string;
  productImg: string[];
  price: string;
}

export enum PaginationSize {
  FIVE = '5',
  TEN = '10',
  FIFTEEN = '15',
  TWENTY = '20',
  FIFTY = '50',
  HUNDRED = '100'
}

export interface GetListLaptopPaginateBody {
  page: string;
  size: PaginationSize;
}

export interface FavoriteItem {
  img: string;
  title: string;
  date: string | Date;
  id: string;
}

export interface Receipt {
  _id: string;
  userId: User;
  items: Laptop[];
  cash: string;
  telephone: string;
  address: string;
  lastModify: string;
  quantity?: number[];
  __v: number;
}

export interface Comment {
  _id: string;
  laptopId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  userId: string;
  userProfile?: Profiles[];
}

export type CommentList = Omit<Comment, 'userId'> & { userId: User };

export type CommentWithoutId = Omit<Comment, '_id' | 'userProfile'>;

export interface CreateNewAccountResponse
  extends AxiosResponse<CreateNewAccountDataResponse, any> {}

export interface CheckEmailExistResponse
  extends AxiosResponse<CheckEmailExistDataResponse, any> {}

export interface LoginToExistedAccountResponse
  extends AxiosResponse<LoginToExistedAccountData, any> {}

export interface ProvinceResponse extends AxiosResponse<ProvinceData, any> {}
export interface DistrictResponse extends AxiosResponse<DistrictData, any> {}
export interface WardResponse extends AxiosResponse<WardData, any> {}
export interface ListProfileResponse extends AxiosResponse<Profiles[], any> {}
export interface LaptopListResponse
  extends AxiosResponse<{ data: Laptop[] }, any> {}
export interface LaptopDetailResponse
  extends AxiosResponse<{ laptop: Laptop }, any> {}
export interface LaptopPaginationResponse
  extends AxiosResponse<Laptop[], any> {}
export interface CommentResponse
  extends AxiosResponse<{ data: Comment }, any> {}
export interface CommentListResponse
  extends AxiosResponse<{ comments: CommentList[] }, any> {}
