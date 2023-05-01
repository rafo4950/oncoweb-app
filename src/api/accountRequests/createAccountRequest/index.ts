import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type CreateAccountRequestResponse = SuccessResponseData;

export type CreateAccountRequestError = ErrorResponseData;

export default async function createAccountRequest(body: {
  fullName: string;
  email: string;
  medicalCenter: string;
  linkedinID: string;
  message: string;
}): Promise<CreateAccountRequestResponse> {
  try {
    return (await apiClient.post<CreateAccountRequestResponse>('/account-requests', body)).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
