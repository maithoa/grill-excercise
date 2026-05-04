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
        it('should return true for valid customer credentials', async () => {
            const result = await provider.verify('customer@example.com', '456');
            expect(result).toBe(true);
        });

        it('should return false for invalid customer email', async () => {
            const result = await provider.verify('wrong@example.com', '456');
            expect(result).toBe(false);
        });

        it('should return false for invalid customer password', async () => {
            const result = await provider.verify('customer@example.com', 'wrongpassword');
            expect(result).toBe(false);
        });

        it('should delegate credential verification to the injected repository', async () => {
            const mockRepository: IUserRepository = {
                findByCredentials: jest.fn().mockResolvedValue(true)
            };
            const providerWithMock = new CustomerAuthProvider(mockRepository);
            const result = await providerWithMock.verify('any@example.com', 'anypassword');
            expect(mockRepository.findByCredentials).toHaveBeenCalledWith('any@example.com', 'anypassword');
            expect(result).toBe(true);
        });
    });
});
