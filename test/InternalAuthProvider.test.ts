import { InternalAuthProvider } from '../src/improve/InternalAuthProvider';
import { InMemoryInternalUserRepository } from '../src/improve/InMemoryInternalUserRepository';
import { IUserRepository } from '../src/improve/IUserRepository';

describe('InternalAuthProvider', () => {
    let provider: InternalAuthProvider;

    beforeEach(() => {
        const repository = new InMemoryInternalUserRepository();
        provider = new InternalAuthProvider(repository);
    });

    it('should return correct provider type', () => {
        expect(provider.getType()).toBe('Internal');
    });

    describe('verify', () => {
        it('should return AuthUser for valid internal user credentials', async () => {
            const result = await provider.verify('admin', '123');
            expect(result).toMatchObject({ id: 1, identity: 'admin', role: 'internal' });
        });

        it('should return null for invalid internal username', async () => {
            const result = await provider.verify('wrongadmin', '123');
            expect(result).toBeNull();
        });

        it('should return null for invalid internal password', async () => {
            const result = await provider.verify('admin', 'wrongpassword');
            expect(result).toBeNull();
        });

        it('should delegate credential verification to the injected repository', async () => {
            const mockUser = { id: 1, identity: 'anyuser', role: 'internal' };
            const mockRepository: IUserRepository = {
                findByCredentials: jest.fn().mockResolvedValue(mockUser)
            };
            const providerWithMock = new InternalAuthProvider(mockRepository);
            const result = await providerWithMock.verify('anyuser', 'anypassword');
            expect(mockRepository.findByCredentials).toHaveBeenCalledWith('anyuser', 'anypassword');
            expect(result).toEqual(mockUser);
        });
    });
});
