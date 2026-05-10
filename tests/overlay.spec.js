import { test, expect } from '@playwright/test';

test.describe('Navbar & Footer Test', () => {
  
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Navbar should display logo and links with proper paths', async ({ page }) => {
        const logo = page.getByRole('link', { name: 'ScentWatch' });
        await expect(logo).toBeVisible();
        await expect(logo).toHaveAttribute('href', '/');

        const searchLink = page.getByRole('link', { name: 'Wyszukaj' });
        await expect(searchLink).toBeVisible();
        await expect(searchLink).toHaveAttribute('href', '/');

        const alertsLink = page.getByRole('link', { name: 'Alerty' });
        await expect(alertsLink).toBeVisible();
        await expect(alertsLink).toHaveAttribute('href', '/alerty');

        const contactLink = page.getByRole('link', { name: 'Kontakt' });
        await expect(contactLink).toBeVisible();
        await expect(contactLink).toHaveAttribute('href', '/kontakt');
    });

    test('Footer should have current rights and working github link', async ({ page }) => {
        const copyrightText = page.getByText('© 2026 ScentWatch.');
        await expect(copyrightText).toBeVisible();

        const creatorLink = page.getByRole('link', { name: 'mk-ehe' });
        await expect(creatorLink).toBeVisible();
        await expect(creatorLink).toHaveAttribute('href', 'https://github.com/mk-ehe');
        await expect(creatorLink).toHaveAttribute('target', '_blank');
    });

    test('Proper navbar links redirecting', async ({ page }) => {
        await page.getByRole('link', { name: 'Alerty' }).click();
        await expect(page).toHaveURL('/alerty');

        await page.getByRole('link', { name: 'Kontakt' }).click();
        await expect(page).toHaveURL('/kontakt');

        await page.getByRole('link', { name: 'ScentWatch' }).click();
        await expect(page).toHaveURL('/');
    });
});
