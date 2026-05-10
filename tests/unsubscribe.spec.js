import { test, expect } from '@playwright/test';

test.describe('Unsubscribe Test', () => {
  
    test('displays invalid state when URL parameters are missing', async ({ page }) => {
        await page.goto('/wypisz');

        await expect(page.getByRole('heading', { name: 'Brak danych' })).toBeVisible();
        await expect(page.getByText('Wygląda na to, że link jest niepełny.')).toBeVisible();
    });

    test('successfully unsubscribes and displays success message', async ({ page }) => {
        await page.route('**/unsubscribe', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ message: "Success!" })
        });
        });

        await page.goto('/wypisz?email=test@gmail.com&url=https://perfumehub.pl/test&token=fake-token');

        await expect(page.getByRole('heading', { name: 'Subskrypcja anulowana.' })).toBeVisible();
        await expect(page.getByText('dziękujemy za skorzystanie z usług')).toBeVisible();
    });

    test('displays error state when API request fails', async ({ page }) => {
        await page.route('**/unsubscribe', route => {
        route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({ detail: "Invalid or Expired token." })
        });
        });

        await page.goto('/wypisz?email=test@gmail.com&url=https://perfumehub.pl/test&token=bad-token');

        await expect(page.getByRole('heading', { name: 'Błąd' })).toBeVisible();
    });
});
