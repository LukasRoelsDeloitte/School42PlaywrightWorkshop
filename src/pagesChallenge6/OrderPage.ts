import { expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { Locator, Page } from "@playwright/test";
import { User } from "../dataClass/User";
import { Product } from "../dataClass/Product";

export class OrderPage extends BasePage {
    private pageContent: Locator

    constructor(page: Page) {
        super(page);
        this.pageContent = page.locator('content');
    }

    async verifyOrderSuccess(user: User, products: Product[]) {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.locator('h1')).toContainText('Order received');
        for (const product of products) {
            await expect(this.pageContent).toContainText(product.name);
        }
        await expect(this.pageContent).toContainText(products.reduce((accumulator, currProd) => accumulator + (currProd.price * currProd.quantity), 0).toString())
        await expect(this.pageContent).toContainText(user.firstName);
        await expect(this.pageContent).toContainText(user.lastName);
        await expect(this.pageContent).toContainText(user.email);
        await expect(this.pageContent).toContainText(user.address.street);
        await expect(this.pageContent).toContainText(user.address.town);
        await expect(this.pageContent).toContainText(user.address.zipcode);
        await expect(this.pageContent).toContainText(user.address.country);
    }
}