import { IAuthProvider } from './IAuthProvider';
//--- Infrastructure Layer: Concrete implementations ---
// A concrete implementation of the IAuthProvider for internal users
export class InternalAuthProvider implements IAuthProvider {
    private users = [{ id: 1, username: 'admin', password: '123', role: 'internal' }];

    async verify (identity: string, secret:string): Promise<boolean> {
        const user = this.users.find(u => u.username === identity && u.password === secret);
        return user !== undefined;
    }

    getType(): string {
        return 'Internal';
    }
}
