//--- Domain Layer: Interfaces and business logic ---
// The "Contract" that defines how an authentication provider should behave
import { AuthUser } from './IUserRepository';

export interface IAuthProvider {
    verify(identity: string, secret:string): Promise<AuthUser | null>;
    getType(): string;
}


