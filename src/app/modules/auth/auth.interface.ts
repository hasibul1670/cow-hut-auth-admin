import { ENUM_USER_ROLE } from '../../../enums/user';

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  logInUserRole?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  phoneNumber: string;
  role: ENUM_USER_ROLE;
};
