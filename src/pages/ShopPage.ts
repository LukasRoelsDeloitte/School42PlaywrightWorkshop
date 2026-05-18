import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShopPage extends BasePage {
    private nextPageArrow: Locator

    constructor(page: Page) {
        super(page);
        this.nextPageArrow = this.page.getByRole('link', { name: '→' });
    }

    async goToProduct(productName: string) {
        await this.navigateToShop();
        while(!(await this.page.getByAltText(productName).isVisible())) {
            await this.nextPageArrow.click();
            await this.page.waitForLoadState('domcontentloaded');
        }
        await this.page.getByAltText(productName).click();
    }
}