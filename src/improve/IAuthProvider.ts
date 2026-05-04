//--- Domain Layer: Interfaces and business logic ---
// The "Contract" that defines how an authentication provider should behave

export interface IAuthProvider {
    verify(identity: string, secret:string): Promise <boolean>;
    getType(): string;
}


