import { z } from "zod";

export const dateSchema = z.date().or(z.string().transform((v) => new Date(v)));

export const preprocessNumber = (schema: z.ZodType) => z.preprocess((val: any) => {
    if (typeof val !== "string") {
        return val;
    }
    try {
        return Number(val);
    } catch (err) {
        console.log(err);
        return val;
    }
}, schema);

export const preprocessNotEmptyValue = (schema: z.ZodType) => z.preprocess((val: any) => {
    if (val === "") {
        return;
    }
    if (Array.isArray(val) && val.length === 0) {
        return
    }
    return val;
}, schema);

export const latLngSchema = z.object({ lat: z.number(), lng: z.number() });
export type LatLng = z.infer<typeof latLngSchema>;

export const notEmptyStrOptional = z.undefined().or(z.string().transform((v) => !v ? undefined : v))
export const notEmptyStr = z.string().min(1, "The field is required")
