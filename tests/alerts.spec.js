import { test, expect } from '@playwright/test';

test.describe('Alerts Page Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/alerty');
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/alerty');
    });

    test('header and paragraph should be visible', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Twój Panel Zapachów' })).toBeVisible();
        await expect(page.getByText('Podaj swój e-mail')).toBeVisible();
    });

    test('prevents form submission without an email', async ({ page }) => {
        const submitButton = page.getByRole('button', { name: 'Wyślij link dostępu' });
        
        await submitButton.click();
        
        await expect(page.getByText('Sprawdź pocztę!')).not.toBeVisible();
        await expect(page.getByText('Twój Panel Zapachów')).toBeVisible();
    });

    test('submits request and displays success screen upon providing email', async ({ page }) => {
        await page.route('**/request-access', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ message: "Link sent." })
        });
        });

        await page.getByPlaceholder('Twój e-mail...').fill('test@gmail.com');
        await page.getByRole('button', { name: 'Wyślij link dostępu' }).click();

        await expect(page.getByRole('heading', { name: 'Sprawdź pocztę!' })).toBeVisible();
        await expect(page.getByText('test@gmail.com')).toBeVisible();
    });
});


test.describe('Alerts Page - Dashboard (Authenticated)', () => {
  
    test('fetches and displays tracked fragrances from the API', async ({ page }) => {
        const fakeAlerts = {
        alerts: [
            {
            fragrance: "Dior Sauvage",
            price: "450 zł",
            low_30d: "400 zł",
            url: "https://perfumehub.pl/dior",
            picture: "https://fake-image.com/dior.png"
            }
        ]
    };

    await page.route('**/my-alerts*', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeAlerts)
        });
    });

    await page.goto('/alerty?email=test@gmail.com.com&token=fakeToken');

    await expect(page.getByRole('heading', { name: 'Zarządzanie Alertami' })).toBeVisible();
    await expect(page.getByText('test@gmail.com')).toBeVisible();
    
    await expect(page.getByRole('heading', { name: 'Dior Sauvage' })).toBeVisible();
    await expect(page.getByText('Aktualna: 450 zł')).toBeVisible();
  });

    test('displays empty state correctly when no alerts exist', async ({ page }) => {
        await page.route('**/my-alerts*', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ alerts: [] })
        });
    });

    await page.goto('/alerty?email=empty.test@gmail.com&token=fakeToken');

    await expect(page.getByText('Nie obserwujesz jeszcze żadnych zapachów.')).toBeVisible();
    await expect(page.getByText('test@gmail.com')).toBeVisible();
    });
    
});