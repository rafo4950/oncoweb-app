import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type RemovePatientResponse = SuccessResponseData;

export type RemovePatientError = ErrorResponseData;

export default async function removePatient(id: string): Promise<RemovePatientResponse> {
  try {
    return (await apiClient.delete<RemovePatientResponse>(`/patients/${id}`)).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
