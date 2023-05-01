import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type LoginResponse = SuccessResponseData<{ token: string }>;

export type LoginError = ErrorResponseData;

export default async function login(data: {
  email: string,
  password: string,
}): Promise<LoginResponse> {
  try {
    return (await apiClient.post<LoginResponse>('/accounts/login', data)).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
