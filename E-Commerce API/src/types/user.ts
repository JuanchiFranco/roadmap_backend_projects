export interface UserRaw {
    id: string;
    email: string;
    name: string;
    password: string;
    role: string;
    refreshToken?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserResponse {
    id: string;
    email: string;
    name: string;
    role: string;
}
