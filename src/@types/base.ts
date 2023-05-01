import { z } from "zod";

export const DocumentTimestampSchema = z.object({
    createdAt: z.date().or(z.string().transform((s) => new Date(s))).optional(),
    updatedAt: z.date().or(z.string().transform((s) => new Date(s))).optional(),
})

export type DocumentTimestamp = z.infer<typeof DocumentTimestampSchema>;

export const DocumentSchema = z.object({
    _id: z.string()
})

export type Document = z.infer<typeof DocumentSchema>;