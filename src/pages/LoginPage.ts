import { BasePage } from "./BasePage";
import { Locator, Page, expect } from "@playwright/test";


export class LoginPage extends BasePage {

    private usernameField: Locator
    private passwordField: Locator
    private signInButton: Locator

    constructor(page: Page) {
        super(page);
        this.usernameField = page.locator("[name='xoo-el-username']");
        this.passwordField = page.locator("[name='xoo-el-password']");
        this.signInButton = page.locator('xpath=/html/body/div[8]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button');
    }

    async authenticate(username: string, password: string) {
        await this.navigateToLogin();
        await this.page.waitForLoadState('load');
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('load');
        await expect(this.page.locator('#menu-item-2333 > a')).toHaveText(`Hello, ${username.split('.')[0]}`);
    }
}