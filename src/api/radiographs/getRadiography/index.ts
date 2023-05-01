import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import { Radiography } from 'src/@types/radiography';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type GetRadiographyResponse = SuccessResponseData<{ radiography: Radiography }>;

export type GetRadiographyError = ErrorResponseData;

export default async function getRadiography(id: string): Promise<GetRadiographyResponse> {
  try {
    return (await apiClient.get<GetRadiographyResponse>(`/radiographs/${id}`)).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
