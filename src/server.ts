import express, { Request, Response } from 'express';
import { AuthService } from './improve/AuthService';
import { CustomerAuthProvider } from './improve/CustomerAuthProvider';
import { InternalAuthProvider } from './improve/InternalAuthProvider';
import { InMemoryCustomerRepository } from './improve/InMemoryCustomerRepository';
import { InMemoryInternalUserRepository } from './improve/InMemoryInternalUserRepository';
import { IAuthProvider } from './improve/IAuthProvider';

export const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Initialize Repositories
const customerRepository = new InMemoryCustomerRepository();
const internalUserRepository = new InMemoryInternalUserRepository();

// Initialize Providers
const customerProvider = new CustomerAuthProvider(customerRepository);
const internalProvider = new InternalAuthProvider(internalUserRepository);

// Map providers to their types
const providers = new Map<string, IAuthProvider>();
providers.set(customerProvider.getType(), customerProvider); // 'Customer'
providers.set(internalProvider.getType(), internalProvider); // 'Internal'

// Initialize the AuthService with the configured providers
const authService = new AuthService(providers);

// API Endpoint for Customer Authentication
app.post('/api/customer/login', async (req: Request, res: Response) => {
    // Customers use email and pin
    const { email, pin } = req.body;

    if (!email || !pin) {
        return res.status(400).json({ 
            success: false, 
            message: 'Missing required fields. Please provide email and pin.' 
        });
    }

    try {
        const result = await authService.login(email, pin, 'Customer');
        
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        console.error('Customer login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// API Endpoint for Internal Authentication
app.post('/api/internal/login', async (req: Request, res: Response) => {
    // Internal users use username and password
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Missing required fields. Please provide username and password.' 
        });
    }

    try {
        const result = await authService.login(username, password, 'Internal');
        
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        console.error('Internal login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
        console.log(`Test customer login: POST /api/customer/login { "email": "customer@example.com", "pin": "456" }`);
        console.log(`Test internal login: POST /api/internal/login { "username": "admin", "password": "123" }`);
    });
}
