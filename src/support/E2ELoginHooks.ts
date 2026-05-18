import { User } from "../dataClass/User"
import { Product } from "../dataClass/Product";
import { loadUserData, loadProductData } from "./dataLoader";
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pagesChallenge6/checkoutPage";
import { OrderPage } from "../pagesChallenge6/OrderPage";
import { ShopPage } from "../pages/ShopPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pagesChallenge6/CartPage";


export let loginPage: LoginPage;
export let checkoutPage: CheckoutPage;
export let orderPage: OrderPage;
export let shopPage: ShopPage;
export let productPage: ProductPage;
export let cartPage: CartPage;

export let userData: User[] = [];
export let ProductData: Product[] = [];

export function setupHooks() {
    userData = loadUserData();
    ProductData = loadProductData();

<<<<<<< HEAD
    test.beforeEach(async ({ page }) => {
=======
    test.beforeEach(async ({ page }, testInfo) => {
>>>>>>> 33be91314d00d303cb4fda59c13cf0d5efa83a75
        loginPage = new LoginPage(page);
        checkoutPage = new CheckoutPage(page);
        orderPage = new OrderPage(page);
        shopPage = new ShopPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        for (const user of userData) {
            if (user.valid) {
                await loginPage.launch();
                await loginPage.authenticate(user.username, user.password);
                await cartPage.emptyCart();
                await loginPage.logout();
            }
        }
    });
}