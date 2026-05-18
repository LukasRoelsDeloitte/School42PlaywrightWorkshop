import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
   
   // Navigate to the login page URL.
   await page.goto('https://bitheap.tech')
   await page.click('#menu-item-2330')
   
   // Enter a valid username and password.
   await page.locator("[name='xoo-el-username']").fill('lukas.roels')
   await page.locator("[name='xoo-el-password']").fill('lroels')
   
   // Click the login button.
   await page.locator('xpath=/html/body/div[8]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button').click()
   
   // Verify successful login by checking for a specific element on the landing.
   await expect(page.locator('css=#menu-item-2333 > a')).toHaveText('Hello, lukas');

   // Take screenshot for documentation
   await page.screenshot({path: 'login-test.png'})
});
