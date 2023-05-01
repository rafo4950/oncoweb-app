import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import { Radiography } from 'src/@types/radiography';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type CreateRadiographyResponse = SuccessResponseData;

export type CreateRadiographyError = ErrorResponseData;

export default async function createRadiography(body: Omit<Radiography, "_id" | "createdAt">): Promise<CreateRadiographyResponse> {
  try {
    return (await apiClient.post<CreateRadiographyResponse>('/radiographs', body)).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
