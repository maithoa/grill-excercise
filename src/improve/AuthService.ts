import { IAuthProvider } from "./IAuthProvider";

//--- Application Layer: Service that uses the IAuthProvider ---
export class AuthService {
    constructor(private providers: Map <string, IAuthProvider>) {}

    async login(identity: string, secret:string, type:string) {
        const provider = this.providers.get(type);
        if (!provider) {
            return {success: false, message: 'Invalid provider type'}
        }

        const isValid = await provider.verify(identity, secret);
        if (!isValid) {
            return {success: false, message: 'Invalid credentials'};
        }

        return {success: true, message: 'Login successful'};
    }

}