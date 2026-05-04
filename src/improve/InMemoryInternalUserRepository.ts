import * as bcrypt from 'bcrypt';
import { IUserRepository } from './IUserRepository';

//--- Infrastructure Layer: In-memory data store for internal users ---
export class InMemoryInternalUserRepository implements IUserRepository {
    // Passwords are stored as bcrypt hashes (never in plaintext)
    private users = [{ id: 1, username: 'admin', passwordHash: '$2b$10$wBbyTPG39Lg/qZtCZGpt3.wu8FB1jeN4.Flml0SGaQenlguVzsDyu', role: 'internal' }];

    async findByCredentials(identity: string, secret: string): Promise<boolean> {
        const user = this.users.find(u => u.username === identity);
        if (!user) {
            return false;
        }
        return bcrypt.compare(secret, user.passwordHash);
    }
}
