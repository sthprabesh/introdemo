import { test, expect } from '@playwright/test';

const appAddress = 'http://localhost:5173';

test.describe('User Management Tests', () => {
    let name: string;

    test('adds a new user', async ({ page }) => {
        // Generate random user data
        name = (Math.random() + 1).toString(36).substring(7); // Store name for later use
        const age = Math.floor(Math.random() * 60) + 18;
        const sex = ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)];

        console.log("Generated user details for add test:", { name, age, sex });

        // Navigate to the page
        await page.goto(appAddress);
        await page.pause(); // Pause here to inspect the page after navigation

        // Fill in the user details
        await page.fill('input[placeholder="Name"]', name);
        await page.pause(); // Pause to inspect Name field after filling
        await page.fill('input[placeholder="Age"]', age.toString());
        await page.pause(); // Pause to inspect Age field after filling
        await page.selectOption('select[class="form-select"]', sex);
        await page.pause(); // Pause to inspect Sex dropdown after selection

        // Submit the form
        await page.click('button:has-text("Add User")');
        await page.pause(); // Pause to inspect form submission and its effects

        // Verify user addition
        const userRowLocator = page.locator(`table tr:has-text("${name}")`);
        await userRowLocator.waitFor({ state: 'visible', timeout: 60000 });
        await page.pause(); // Pause to inspect the new user row
        const userDetails = await userRowLocator.textContent();
        expect(userDetails).toContain(name);
        expect(userDetails).toContain(age.toString());
        expect(userDetails).toContain(sex);
    });

    test('deletes the user', async ({ page }) => {
        // Navigate to the page
        await page.goto(appAddress);
        await page.pause(); // Pause to inspect the page after navigation

        // Locate the row of the previously added user
        const userRowLocator = page.locator(`table tr:has-text("${name}")`);
        const deleteButtonLocator = userRowLocator.locator('button.btn-danger');
        await deleteButtonLocator.waitFor({ state: 'visible' });
        await page.pause(); // Pause to inspect Delete button before clicking

        // Delete the user
        console.log("Attempting to delete user:", name);
        await deleteButtonLocator.click();
        await page.pause(); // Pause to inspect the table after clicking Delete

        // Verify user removal
        await userRowLocator.waitFor({ state: 'hidden', timeout: 60000 });
        const isUserPresent = await userRowLocator.isVisible();
        expect(isUserPresent).toBeFalsy();
    });
});
