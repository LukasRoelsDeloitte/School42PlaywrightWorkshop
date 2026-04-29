import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {

    private quantityInput: Locator
    private addToCartButton: Locator

    constructor(page: Page) {
        super(page);
        this.quantityInput = this.page.getByRole('spinbutton', {name: 'Product quantity'});
        this.addToCartButton = this.page.getByRole('button', {name: '+ Add to cart'});
    }

    async setProductQuantity(quantity: number) {
        await this.quantityInput.click();
        await this.quantityInput.fill(quantity.toString());
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}