import { test, expect } from '@playwright/test';

test.describe('Search Page Test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('displays Perfumehub card for valid Perfumehub link', async ({ page }) => {
        const fakePerfumeData = {
        price: "299 zł",
        fragrance: "Versace Eros",
        concentration: "Woda toaletowa",
        picture: "https://fake-image.com/eros.png",
        url: "https://perfumehub.pl/versace-eros"
        };

        await page.route('**/search?url=*', route => {
        route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(fakePerfumeData) });
        });

        await page.getByPlaceholder('Wklej link...').fill('https://perfumehub.pl/versace-eros');
        await page.getByRole('button', { name: 'Szukaj' }).click();

        await expect(page.getByRole('heading', { name: 'Versace Eros' })).toBeVisible();
        await expect(page.getByText('299 zł')).toBeVisible();
        await expect(page.getByText('Najlepsza cena')).toBeVisible();
    });

    test('displays Fragrantica card for valid Fragrantica link (top notes)', async ({ page }) => {
        const fakeFragranticaData = {
        fragrance: { name: "Dior Sauvage" },
        gender: "Dla mężczyzn",
        rating: "4.5",
        amount_of_rates: "1000",
        notes: { top: [{ name: "Bergamotka" }] }
        };

        await page.route('**/search?url=*', route => {
        route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(fakeFragranticaData) });
        });

        await page.getByPlaceholder('Wklej link...').fill('https://fragrantica.pl/perfumy/Dior-Sauvage');
        await page.getByRole('button', { name: 'Szukaj' }).click();

        await expect(page.getByRole('heading', { name: 'Dior Sauvage' })).toBeVisible();
        await expect(page.getByText('Piramida zapachowa')).toBeVisible();
        await expect(page.getByText('NUTY GŁOWY')).toBeVisible();
        await expect(page.getByText('NUTY ZAPACHOWE')).not.toBeVisible();
        await expect(page.getByText('Bergamotka')).toBeVisible();
    });

    test('displays Fragrantica card for valid Fragrantica link (linear notes)', async ({ page }) => {
        const fakeFragranticaData = {
        fragrance: { name: "Dior Sauvage" },
        gender: "Dla mężczyzn",
        rating: "4.5",
        amount_of_rates: "1000",
        notes: { linear: [{ name: "Bergamotka" }] }
        };

        await page.route('**/search?url=*', route => {
        route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(fakeFragranticaData) });
        });

        await page.getByPlaceholder('Wklej link...').fill('https://fragrantica.pl/perfumy/Dior-Sauvage');
        await page.getByRole('button', { name: 'Szukaj' }).click();

        await expect(page.getByRole('heading', { name: 'Dior Sauvage' })).toBeVisible();
        await expect(page.getByText('Piramida zapachowa')).toBeVisible();
        await expect(page.getByText('NUTY GŁOWY')).not.toBeVisible();
        await expect(page.getByText('NUTY ZAPACHOWE')).toBeVisible();
        await expect(page.getByText('Bergamotka')).toBeVisible();
    });

    test('handles invalid link by showing an alert dialog', async ({ page }) => {
        page.once('dialog', async dialog => {
            expect(dialog.message()).toBe('Błędny link!');
            await dialog.accept();
        });

        await page.getByPlaceholder('Wklej link...').fill('bad-link');
        await page.getByRole('button', { name: 'Szukaj' }).click();
        
        await page.waitForTimeout(500); 
    });

    test('handles API 404 error by showing an alert dialog', async ({ page }) => {
        await page.route('**/search?url=*', route => {
            route.fulfill({ status: 404 });
        });

        const dialogPromise = page.waitForEvent('dialog');

        await page.getByPlaceholder('Wklej link...').fill('https://perfumehub.pl/does-not-exists');
        await page.getByRole('button', { name: 'Szukaj' }).click();

        const dialog = await dialogPromise;
        expect(dialog.message()).toBe('Błąd połączenia z serwerem!');
        await dialog.accept();
    });
});
