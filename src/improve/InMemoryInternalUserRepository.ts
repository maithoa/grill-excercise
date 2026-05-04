import { IUserRepository } from './IUserRepository';

//--- Infrastructure Layer: In-memory data store for internal users ---
export class InMemoryInternalUserRepository implements IUserRepository {
    private users = [{ id: 1, username: 'admin', password: '123', role: 'internal' }];

    async findByCredentials(identity: string, secret: string): Promise<boolean> {
        const user = this.users.find(u => u.username === identity && u.password === secret);
        return user !== undefined;
    }
}
