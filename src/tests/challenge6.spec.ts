import { test } from '@playwright/test';
import {userData, productData, loginPage, shopPage, productPage, cartPage, checkoutPage, orderPage, setupHooks} from '../support/E2ELoginHooks';

setupHooks();

userData.filter(user => user.valid).forEach(user => {    
    test(`E2E test for user: ${user.username}`, async () => {       
        await loginPage.launch();       
        await loginPage.acceptCookies();       
        await loginPage.authenticate(user.username, user.password);        
        for (const product of productData) {           
            if (product.valid) {             
                await shopPage.goToProduct(product.name);             
                await productPage.setProductQuantity(product.quantity);             
                await productPage.addToCart();             
                await cartPage.verifyProductInCart(product.name, product.quantity);           
            }       
        }       
        await cartPage.checkout();       
        await checkoutPage.fillDetails(user);       
        await checkoutPage.placeOrder();       
        await orderPage.verifyOrderSuccess(user, productData);       
        await loginPage.logout();    
    });}
);