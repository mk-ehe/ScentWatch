import { test, expect } from '@playwright/test';

test.describe('ContactPage Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/kontakt');
  });

  test('header and paragraph should be visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Bądźmy w kontakcie' })).toBeVisible();
    await expect(page.getByText('Masz problem z działaniem aplikacji')).toBeVisible();
  });

  test('mailto link should be visible and redirecting', async ({ page }) => {
    const mailLink = page.getByRole('link', { name: 'kontakt.mateusz.kudas@gmail.com' });
    
    await expect(mailLink).toBeVisible();
    await expect(mailLink).toHaveAttribute('href', 'mailto:kontakt.mateusz.kudas@gmail.com');
  });

  test('proper github link redirect that opens in new card', async ({ page }) => {
    const githubLink = page.getByRole('link', { name: 'github.com/mk-ehe' });
    
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/mk-ehe');
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });
});
