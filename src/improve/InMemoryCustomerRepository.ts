import * as bcrypt from 'bcrypt';
import { IUserRepository, AuthUser } from './IUserRepository';

//--- Infrastructure Layer: In-memory data store for customers ---
export class InMemoryCustomerRepository implements IUserRepository {
    // Passwords are stored as bcrypt hashes (never in plaintext)
    private customers = [{ id: 1, email: 'customer@example.com', passwordHash: '$2b$10$25XUw7CSsLaasV0M9n7ZsOPldfA4x66.Nh6Bhq8FoZVGSKOlkZU5i', role: 'customer' }];

    async findByCredentials(identity: string, secret: string): Promise<AuthUser | null> {
        const customer = this.customers.find(c => c.email === identity);
        if (!customer) return null;
        const isValid = await bcrypt.compare(secret, customer.passwordHash);
        if (!isValid) return null;
        return { id: customer.id, identity: customer.email, role: customer.role };
    }
}
