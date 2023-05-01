import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import { Patient } from 'src/@types/patient';
import { Radiography } from 'src/@types/radiography';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type ListRadiographsResponse = SuccessResponseData<{ radiographs: Radiography[] }>;

export type ListRadiographsError = ErrorResponseData;

export default async function listRadiographs(patientId: string): Promise<ListRadiographsResponse> {
  try {
    return (await apiClient.get<ListRadiographsResponse>(`/radiographs/list/${patientId}`)).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
