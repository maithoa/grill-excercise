import request from 'supertest';
import rateLimit from 'express-rate-limit';
import { app, createApp } from '../src/server';

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

    describe('Rate Limiting', () => {
        // Helper to create a fresh strict rate limiter (max 3 requests per window) for testing
        const makeStrictLimiter = () => rateLimit({
            windowMs: 60 * 1000,
            limit: 3,
            standardHeaders: 'draft-8',
            legacyHeaders: false,
            message: { success: false, message: 'Too many login attempts. Please try again later.' },
        });

        it('should return 429 after exceeding login attempts on /api/customer/login', async () => {
            const rateLimitedApp = createApp(makeStrictLimiter());
            // Exhaust the limit
            for (let i = 0; i < 3; i++) {
                await request(rateLimitedApp)
                    .post('/api/customer/login')
                    .send({ email: 'customer@example.com', pin: 'wrongpin' });
            }
            // Next request should be rate limited
            const response = await request(rateLimitedApp)
                .post('/api/customer/login')
                .send({ email: 'customer@example.com', pin: 'wrongpin' });

            expect(response.status).toBe(429);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Too many login attempts');
        });

        it('should return 429 after exceeding login attempts on /api/internal/login', async () => {
            const rateLimitedApp = createApp(makeStrictLimiter());

            // Exhaust the limit
            for (let i = 0; i < 3; i++) {
                await request(rateLimitedApp)
                    .post('/api/internal/login')
                    .send({ username: 'admin', password: 'wrongpassword' });
            }
            // Next request should be rate limited
            const response = await request(rateLimitedApp)
                .post('/api/internal/login')
                .send({ username: 'admin', password: 'wrongpassword' });

            expect(response.status).toBe(429);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Too many login attempts');
        });
    });

});