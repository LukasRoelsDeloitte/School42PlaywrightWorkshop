import { test, expect, Page } from '@playwright/test';

async function authenticate(page: Page, username: string, password: string) {
        await page.goto('https://bitheap.tech');
        await page.click('#menu-item-2330');
    
        await page.locator("[name='xoo-el-username']").fill(username);
        await page.locator("[name='xoo-el-password']").fill(password);
        
        await page.locator('xpath=/html/body/div[8]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button').click();
    
        await expect(page.locator('css=#menu-item-2333 > a')).toHaveText(`Hello, ${username.split('.')[0]}`);
}

test.beforeEach(async ({ page }) => {
    await authenticate(page, 'lukas.roels', 'lroels');

    await page.locator('xpath=html/body/nav/div[1]/div[3]/div/a').click();

    await page.waitForLoadState('domcontentloaded');
    const amountInCart = await page.getByRole('spinbutton', {name: 'Product quantity'}).count();
    
    for (let i = 0; i < amountInCart; i++) {
        await page.getByRole('spinbutton', {name: 'Product quantity'}).first().click();
        await page.getByRole('spinbutton', {name: 'Product quantity'}).first().fill('0');
        await page.getByRole('spinbutton', {name: 'Product quantity'}).first().press('Enter')
        await page.waitForLoadState('load');
    }
});


test('add to cart and verify', async ({page}) => {
    
    await page.locator('#menu-item-1310').click();

    while(!(await page.getByText('Useful ChatGPT Prompts').isVisible())) {
        await page.getByRole('link', { name: '→' }).click();
        await page.waitForLoadState('domcontentloaded');
    }

    await page.getByText('Useful ChatGPT Prompts').click();
    await page.getByRole('spinbutton', {name: 'Product quantity'}).click();
    await page.getByRole('spinbutton', {name: 'Product quantity'}).fill('3');
    await page.getByRole('button', {name: '+ Add to cart'}).click();


    await page.locator('xpath=/html/body/nav/div[1]/div[3]/div/a').click();
    await expect(page.locator('body')).toContainText('Useful ChatGPT Prompts');
    await expect(page.getByRole('cell', {name: 'Useful ChatGPT Prompts'}).getByLabel('Product quantity')).toHaveValue('3');
});
