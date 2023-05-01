import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import { Patient } from 'src/@types/patient';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type UpdatePatientResponse = SuccessResponseData;

export type UpdatePatientError = ErrorResponseData;

export default async function updatePatient(id: string, body: Omit<Patient, "_id" | "owner" | "xRays">): Promise<UpdatePatientResponse> {
  try {
    return (await apiClient.put<UpdatePatientResponse>(`/patients/${id}`, body)).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
