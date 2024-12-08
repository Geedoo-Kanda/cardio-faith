export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    acces: number;
    adresse: string;
    disable: string;
    email_verified_at: string;
    roles: any
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
