import { IAuthProvider } from './IAuthProvider';
import { IUserRepository, AuthUser } from './IUserRepository';

//--- Infrastructure Layer: Concrete implementations ---
// A concrete implementation of the IAuthProvider for internal users
export class InternalAuthProvider implements IAuthProvider {
    constructor(private repository: IUserRepository) {}

    async verify(identity: string, secret: string): Promise<AuthUser | null> {
        return this.repository.findByCredentials(identity, secret);
    }

    getType(): string {
        return 'Internal';
    }
}
