export default class User {
    id: number;
    identificationNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    
    constructor(id: number, identificationNumber: number, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.identificationNumber = identificationNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}