import { IAuthProvider } from './IAuthProvider';
import { IUserRepository, AuthUser } from './IUserRepository';

// A concrete implementation of the IAuthProvider for customers
export class CustomerAuthProvider implements IAuthProvider {
    constructor(private repository: IUserRepository) {}

    async verify(identity: string, secret: string): Promise<AuthUser | null> {
        return this.repository.findByCredentials(identity, secret);
    }

    getType(): string {
        return 'Customer';
    }
}
