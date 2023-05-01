import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type NewPasswordResponse = SuccessResponseData;

export type NewPasswordEmailError = ErrorResponseData;

export default async function newPassword(email: string, code: string, password: string): Promise<NewPasswordResponse> {
  try {
    return (await apiClient.post<NewPasswordResponse>('/accounts/new-password', { email, code, password })).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
