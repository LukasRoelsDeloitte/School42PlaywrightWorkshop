import { BasePage } from "../pages/BasePage";
import { Locator, Page } from "@playwright/test";
import { User } from "../dataClass/User";


export class CheckoutPage extends BasePage {

    private firstNameInput: Locator
    private lastNameInput: Locator
    private countryDropdown: Locator
    private countryInput: Locator
    private addressInput: Locator
    private zipcodeInput: Locator
    private townInput: Locator
    private emailInput: Locator
    private placeOrderButton: Locator

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.getByRole('textbox', {name: 'First name'});
        this.lastNameInput = page.getByRole('textbox', {name: 'Last name'});
        this.countryDropdown = page.locator('#select2-billing_country-container');
        this.countryInput = page.getByRole('combobox').filter({ hasText: /^$/ });
        this.addressInput = page.getByRole('textbox', {name: 'Street address'});
        this.zipcodeInput = page.getByRole('textbox', {name: 'Postcode / ZIP'});
        this.townInput = page.getByRole('textbox', {name: 'Town / City'});
        this.emailInput = page.getByRole('textbox', {name: 'Email address'});
        this.placeOrderButton = page.getByRole('button', {name: 'Place order'});
    }

    async fillDetails(user: User) {
        await this.firstNameInput.fill(user.firstName);

        await this.lastNameInput.fill(user.lastName);

        await this.countryDropdown.click();

        await this.countryInput.click();
        await this.countryInput.fill(user.address.country);
        await this.page.getByRole('option', {name: user.address.country}).click();

        await this.addressInput.fill(user.address.street);

        await this.zipcodeInput.fill(user.address.zipcode);

        await this.townInput.fill(user.address.town);

        await this.emailInput.fill(user.email);
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}