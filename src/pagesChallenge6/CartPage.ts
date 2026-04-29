import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

export class CartPage extends BasePage {

    private quantityInput: Locator
    private checkoutButton: Locator

    constructor(page: Page) {
        super(page);
        this.quantityInput = page.getByRole('spinbutton', {name: 'Product quantity'});
        this.checkoutButton = page.getByRole('link', {name: 'Proceed to checkout'});
    }

    async verifyProductInCart(productName: string, expectedQuantity: number) {
        await this.navigateToCart();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.locator('content')).toContainText(productName);
        await expect(
            this.page.getByRole('cell', {name: `${productName} quantity`}).getByLabel('Product quantity')
        ).toHaveValue(expectedQuantity.toString());
    }

    async checkout() {
        this.checkoutButton.click()
    }

    async emptyCart() {
        await this.navigateToCart();
        
        await this.page.waitForLoadState('domcontentloaded');
        const amountInCart = await this.quantityInput.count();

        for (let i = 0; i < amountInCart; i++) {
            await this.quantityInput.first().click();
            await this.quantityInput.first().fill('0');
            await this.quantityInput.first().press('Enter');
        }
    }
}