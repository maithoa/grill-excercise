import { CustomerAuthProvider } from '../src/improve/CustomerAuthProvider';
import { InMemoryCustomerRepository } from '../src/improve/InMemoryCustomerRepository';
import { IUserRepository } from '../src/improve/IUserRepository';

describe('CustomerAuthProvider', () => {
    let provider: CustomerAuthProvider;

    beforeEach(() => {
        const repository = new InMemoryCustomerRepository();
        provider = new CustomerAuthProvider(repository);
    });

    it('should return correct provider type', () => {
        expect(provider.getType()).toBe('Customer');
    });

    describe('verify', () => {
        it('should return AuthUser for valid customer credentials', async () => {
            const result = await provider.verify('customer@example.com', '456');
            expect(result).toMatchObject({ id: 1, identity: 'customer@example.com', role: 'customer' });
        });

        it('should return null for invalid customer email', async () => {
            const result = await provider.verify('wrong@example.com', '456');
            expect(result).toBeNull();
        });

        it('should return null for invalid customer password', async () => {
            const result = await provider.verify('customer@example.com', 'wrongpassword');
            expect(result).toBeNull();
        });

        it('should delegate credential verification to the injected repository', async () => {
            const mockUser = { id: 1, identity: 'any@example.com', role: 'customer' };
            const mockRepository: IUserRepository = {
                findByCredentials: jest.fn().mockResolvedValue(mockUser)
            };
            const providerWithMock = new CustomerAuthProvider(mockRepository);
            const result = await providerWithMock.verify('any@example.com', 'anypassword');
            expect(mockRepository.findByCredentials).toHaveBeenCalledWith('any@example.com', 'anypassword');
            expect(result).toEqual(mockUser);
        });
    });
});
