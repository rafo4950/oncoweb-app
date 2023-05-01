import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import { Patient } from 'src/@types/patient';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type GetPatientResponse = SuccessResponseData<{ patient: Patient }>;

export type GetPatientError = ErrorResponseData;

export default async function getPatient(id: string): Promise<GetPatientResponse> {
  try {
    return (await apiClient.get<GetPatientResponse>(`/patients/${id}`)).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
