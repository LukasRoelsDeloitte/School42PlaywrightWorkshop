import { Locator, Page } from "@playwright/test"

export class BasePage {
    private shopButton: Locator
    private cartButton: Locator
    private loginButton: Locator
    private logOutButton: Locator

    constructor(protected page: Page) {
        this.shopButton = page.locator('#menu-item-1310');
        this.cartButton = page.locator('xpath=html/body/nav/div[1]/div[3]/div/a');
        this.loginButton = page.locator('#menu-item-2330');
        this.logOutButton = page.locator('#menu-item-2332').getByRole('link', { name: 'Logout' });
    }

    async launch() {
        await this.page.goto('https://bitheap.tech', { waitUntil: 'domcontentloaded' });
    }

    async acceptCookies() {
        try {
            await this.page.getByRole('button', {name: 'Accept All'}).click({timeout: 1000});
            await this.page.getByRole('button', {name: 'Consent', exact: true}).click();
        } catch (error) {
            try {
                await this.page.getByRole('button', {name: 'Consent', exact: true}).click({timeout: 1000});
            } catch (error) {
                // No cookie banner found, proceed without accepting cookies
            }
        }        
    }

    async navigateToShop() {
        await this.shopButton.click();
    }

    async navigateToCart() {
        await this.cartButton.click();
    }

    async navigateToLogin() {
        await this.loginButton.click();
    }

    async logout() {
        await this.logOutButton.click();
    }
}