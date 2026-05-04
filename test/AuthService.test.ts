import { AuthService } from '../src/improve/AuthService';
import { IAuthProvider } from '../src/improve/IAuthProvider';

describe('AuthService', () => {
    let authService: AuthService;
    let mockProvider: IAuthProvider;

    beforeEach(() => {
        mockProvider = {
            verify: jest.fn(),
            getType: jest.fn().mockReturnValue('test-type')
        };

        const providers = new Map<string, IAuthProvider>();
        providers.set('test-type', mockProvider);

        authService = new AuthService(providers);
    });

    it('should return invalid provider type when provider is not found', async () => {
        const result = await authService.login('user1', 'secret1', 'unknown-type');
        expect(result).toEqual({ success: false, message: 'Invalid provider type' });
    });

    it('should return invalid credentials when verify fails', async () => {
        (mockProvider.verify as jest.Mock).mockResolvedValue(false);

        const result = await authService.login('user1', 'wrong-secret', 'test-type');
        
        expect(mockProvider.verify).toHaveBeenCalledWith('user1', 'wrong-secret');
        expect(result).toEqual({ success: false, message: 'Invalid credentials' });
    });

    it('should return login successful when verify succeeds', async () => {
        (mockProvider.verify as jest.Mock).mockResolvedValue(true);

        const result = await authService.login('user2', 'correct-secret', 'test-type');
        
        expect(mockProvider.verify).toHaveBeenCalledWith('user2', 'correct-secret');
        expect(result).toEqual({ success: true, message: 'Login successful' });
    });
});
