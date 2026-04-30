import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { User } from '../dataClass/User';
import { Product } from '../dataClass/Product';

export function loadProductData(): Product[] {
    return parse(fs.readFileSync('./src/testData/products.csv', 'utf-8'), {
        columns: true,
        skip_empty_lines: true
    });
}

export function loadUserData(): User[] {
    return parse(fs.readFileSync('./src/testData/users.csv', 'utf-8'), {
        columns: true,
        skip_empty_lines: true
    }).map((user: any) => {
        return {
            username: user.username,
            password: user.password,
            firstName: user.firstname,
            lastName: user.lastname,
            address: {
                country: user.country,
                street: user.street,
                zipcode: user.zipcode,
                town: user.town,
            },
            email: user.email,
            valid: user.valid === 'true',
        }
    });
}