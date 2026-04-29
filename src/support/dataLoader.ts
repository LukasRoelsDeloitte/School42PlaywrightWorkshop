import csv from 'csvtojson';
import { User } from '../dataClass/User';
import { Product } from '../dataClass/Product';

export async function loadProductData(): Promise<Product[]> {
    const products = await csv().fromFile('./src/testData/products.csv');
    return products.map(row => ({
        name: row.name,
        price: Number(row.price),
        quantity: Number(row.quantity),
        valid: row.valid.toLowercase() === 'true',
    }));
}

export async function loadUserData(): Promise<User[]> {
    const users = await csv().fromFile('./src/testData/users.csv');
    return users.map(row => ({
        username: row.username,
        password: row.password,
        firstName: row.firstname,
        lastName: row.lastname,
        address: {
            country: row.country,
            street: row.street,
            zipcode: row.zipcode,
            town: row.town,
        },
        email: row.email,
        valid: row.valid.toLowerCase() === 'true',
    }));
}