import { expect, test } from '@playwright/test';
import {loginPage, shopPage, productPage, cartPage, checkoutPage, orderPage, setupHooks, userData, ProductData} from '../support/E2ELoginHooks';


setupHooks();

// test('data correctly loaded', async () => {
//     expect(userData.length).toBeGreaterThan(0);
//     expect(ProductData.length).toBeGreaterThan(0);
// });

userData.forEach(user => {
    test(`E2E test for user: ${user.username}`, async () => {
        await loginPage.launch();
        await loginPage.acceptCookies();
        await loginPage.authenticate(user.username, user.password);

        for (const product of ProductData) {
            await shopPage.navigateToShop();
            await shopPage.goToProduct(product.name);

            await productPage.setProductQuantity(product.quantity);
            await productPage.addToCart();
            await productPage.navigateToCart();

            await cartPage.verifyProductInCart(product.name, product.quantity);
        }

        await cartPage.checkout();

        await checkoutPage.fillDetails(user);
        await checkoutPage.placeOrder();
        await orderPage.verifyOrderSuccess(user, ProductData);
        await loginPage.logout();
    });
});