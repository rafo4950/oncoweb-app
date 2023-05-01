export type Radiography = {
    _id: string;
    patient: string;
    name: string;
    description?: string;
    imageUrl: string;
    category?: string;
    createdAt: Date;
}