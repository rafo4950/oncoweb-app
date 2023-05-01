import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import { Patient } from 'src/@types/patient';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type ListPatientsResponse = SuccessResponseData<{ patients: Patient[] }>;

export type ListPatientsError = ErrorResponseData;

export default async function listPatients(): Promise<ListPatientsResponse> {
  try {
    return (await apiClient.get<ListPatientsResponse>("/patients/list")).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
