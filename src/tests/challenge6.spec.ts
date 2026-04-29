import { test } from '@playwright/test';
import {userData, ProductData, loginPage, shopPage, productPage, cartPage, checkoutPage, orderPage, setupHooks} from '../support/E2ELoginHooks';

test.describe('Challenge 6 - E2E Testing', async () => {
    setupHooks();

    test('E2E', async () => {
        for (const user of userData.filter(u => u.valid)) {
            await test.step(`E2E test for user: ${user.username}`, async () => {
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
        }
    });
});