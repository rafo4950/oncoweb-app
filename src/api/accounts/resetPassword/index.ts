import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type ResetPasswordResponse = SuccessResponseData;

export type ResetPasswordEmailError = ErrorResponseData;

export default async function resetPassword(email: string): Promise<ResetPasswordResponse> {
  try {
    return (await apiClient.post<ResetPasswordResponse>('/accounts/reset-password', { email })).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
