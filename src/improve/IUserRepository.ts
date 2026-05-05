//--- Domain Layer: Repository interface ---
// The "Contract" that defines how a user data source should be accessed

export interface AuthUser {
    id: number;
    identity: string;
    role: string;
}

export interface IUserRepository {
    findByCredentials(identity: string, secret: string): Promise<AuthUser | null>;
}
