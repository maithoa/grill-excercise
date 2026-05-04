import request from 'supertest';
import { app } from '../src/server';

describe('Authentication API Endpoints', () => {

    describe('POST /api/customer/login', () => {
        it('should return 200 and success for valid customer credentials', async () => {
            const response = await request(app)
                .post('/api/customer/login')
                .send({ email: 'customer@example.com', pin: '456' });
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ success: true, message: 'Login successful' });
        });

        it('should return 401 for invalid customer credentials', async () => {
            const response = await request(app)
                .post('/api/customer/login')
                .send({ email: 'customer@example.com', pin: 'wrongpin' });
            
            expect(response.status).toBe(401);
            expect(response.body).toEqual({ success: false, message: 'Invalid credentials' });
        });

        it('should return 400 when missing required fields (email or pin)', async () => {
            const response = await request(app)
                .post('/api/customer/login')
                .send({ email: 'customer@example.com' }); // missing pin
            
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Missing required fields');
        });
    });

    describe('POST /api/internal/login', () => {
        it('should return 200 and success for valid internal user credentials', async () => {
            const response = await request(app)
                .post('/api/internal/login')
                .send({ username: 'admin', password: '123' });
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ success: true, message: 'Login successful' });
        });

        it('should return 401 for invalid internal user credentials', async () => {
            const response = await request(app)
                .post('/api/internal/login')
                .send({ username: 'admin', password: 'wrongpassword' });
            
            expect(response.status).toBe(401);
            expect(response.body).toEqual({ success: false, message: 'Invalid credentials' });
        });

        it('should return 400 when missing required fields (username or password)', async () => {
            const response = await request(app)
                .post('/api/internal/login')
                .send({ password: '123' }); // missing username
            
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Missing required fields');
        });
    });

});