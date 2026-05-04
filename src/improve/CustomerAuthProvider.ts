import { IAuthProvider } from './IAuthProvider';

// A concrete implementation of the IAuthProvider for customers
export class CustomerAuthProvider implements IAuthProvider {
    private customers = [{ id: 1, email: 'customer@example.com', password: '456', role: 'customer' }];

    async verify(identity: string, secret: string): Promise<boolean> {
        const customer = this.customers.find(c => c.email === identity && c.password === secret);
        return customer !== undefined;
    }

    getType(): string {
        return 'Customer';
    }
}
