export type SuccessResponseData<T = undefined> = { success: true; message?: string; data: T };

export type ErrorResponseData<T = undefined> = { success: false; message?: string; name?: string; suggestion?: string; data: T };
