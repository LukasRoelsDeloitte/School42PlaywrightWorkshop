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

export function setupHooks(user?: User) { 
    if (userData.length === 0) {
        userData = loadUserData();
    }
    if (ProductData.length === 0) {
        ProductData = loadProductData();
    }

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        checkoutPage = new CheckoutPage(page);
        orderPage = new OrderPage(page);
        shopPage = new ShopPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        
        if (user && user.valid) {
            await loginPage.launch();
            await loginPage.authenticate(user.username, user.password);
            await cartPage.emptyCart();
            await loginPage.logout();
        }
    });
}