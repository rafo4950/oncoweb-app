import { ErrorResponseData, SuccessResponseData } from 'src/@types/api';
import { Patient } from 'src/@types/patient';
import apiClient from 'src/api/apiClient';
import resolveAxiosError from 'src/api/resolveAxiosError';

export type CreatePatientResponse = SuccessResponseData;

export type CreatePatientError = ErrorResponseData;

export default async function createPatient(body: Omit<Patient, "_id" | "owner" | "xRays">): Promise<CreatePatientResponse> {
  try {
    return (await apiClient.post<CreatePatientResponse>('/patients', body)).data;
  } catch (err) {
    throw resolveAxiosError(err);
  }
}
