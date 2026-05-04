import { IUserRepository } from './IUserRepository';

//--- Infrastructure Layer: In-memory data store for customers ---
export class InMemoryCustomerRepository implements IUserRepository {
    private customers = [{ id: 1, email: 'customer@example.com', password: '456', role: 'customer' }];

    async findByCredentials(identity: string, secret: string): Promise<boolean> {
        const customer = this.customers.find(c => c.email === identity && c.password === secret);
        return customer !== undefined;
    }
}
