import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import { UserDocument } from 'src/@types/user';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type GetUserResponse = SuccessResponseData<UserDocument>;

export type GetUserError = ErrorResponseData;

export default async function getUser(): Promise<GetUserResponse> {
  try {
    return (await apiClient.get<GetUserResponse>('/accounts/user')).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
