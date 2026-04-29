import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ShopPage } from "../pages/ShopPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";



test.describe('Challenge 5 - Page Object Model', () => {

    let loginPage: LoginPage;
    let shopPage: ShopPage;
    let productPage: ProductPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        shopPage = new ShopPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await loginPage.launch();
        await loginPage.authenticate('Playwright', 'playwright');
        await cartPage.emptyCart();

    });

    test('Add product to cart', async () => {
        await shopPage.goToProduct('Useful ChatGPT Prompts');

        await productPage.setProductQuantity(3);
        await productPage.addToCart();

        await cartPage.verifyProductInCart('Useful ChatGPT Prompts', 3);
    });
});