
export type Address = {
    country: string,
    street: string,
    zipcode: string,
    town: string,
}

export type User = {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    address: Address,
    email: string,
    valid: boolean,
}