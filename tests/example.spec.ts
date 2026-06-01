import { test, expect } from '@playwright/test';

test.describe('Author Website', () => {
  test('should load homepage with site name and navigation', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('.siteName')).toContainText('Anzar Ali Khan');
    
    await expect(page.locator('nav >> a[href="/"]')).toContainText('Home');
    await expect(page.locator('nav >> a[href="/writings"]')).toContainText('Writings');
    await expect(page.locator('nav >> a[href="/about"]')).toContainText('About');
  });

  test('should display hero section on homepage', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('.heroSection')).toBeVisible();
    await expect(page.locator('.heroSection h1')).toContainText('Heaven Behind The Mountain Pass');
    await expect(page.locator('.ctaButton')).toBeVisible();
  });

  test('should display updates section on homepage', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('.updatesSection')).toBeVisible();
    await expect(page.locator('.updatesSection h2')).toContainText('Updates');
    
    await expect(page.locator('.timelineDate').first()).toBeVisible();
    await expect(page.locator('.updateLink').first()).toBeVisible();
  });

  test('should navigate to update page from timeline', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('.updateLink').first().click();
    
    await expect(page).toHaveURL(/\/update\/\d+/);
    await expect(page.locator('h1, h2, h3').first()).toBeVisible();
  });

  test('should navigate to Writings page', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav >> a[href="/writings"]').click();
    
    await expect(page).toHaveURL('/writings');
    await expect(page.locator('.pageTitle')).toContainText('My Library');
  });

  test('should display books in Writings page', async ({ page }) => {
    await page.goto('/writings');
    
    await expect(page.locator('.sectionHeading').first()).toContainText('Books');
    await expect(page.locator('.storyLink').first()).toContainText('Heaven Behind The Mountain Pass');
  });

  test('should navigate to story page from Writings', async ({ page }) => {
    await page.goto('/writings');
    
    await page.locator('.storyLink').first().click();
    
    await expect(page).toHaveURL(/\/story\/\d+/);
  });

  test('should navigate to About page', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav >> a[href="/about"]').click();
    
    await expect(page).toHaveURL('/about');
    await expect(page.locator('.aboutTitle')).toContainText('About the Author');
  });

  test('should display author information on About page', async ({ page }) => {
    await page.goto('/about');
    
    await expect(page.locator('.aboutContainer')).toBeVisible();
    await expect(page.locator('.aboutContainer p').first()).toContainText('Anzar Ali Khan');
    await expect(page.locator('.email')).toContainText('khananzarali7@gmail.com');
  });

  test('should have working social media links in footer', async ({ page }) => {
    await page.goto('/');
    
    const instagramLink = page.locator('footer a[aria-label="Instagram"]');
    await expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com');
    await expect(instagramLink).toHaveAttribute('target', '_blank');
    
    const twitterLink = page.locator('footer a[aria-label="Twitter"]');
    await expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
    
    const redditLink = page.locator('footer a[aria-label="Reddit"]');
    await expect(redditLink).toHaveAttribute('href', 'https://www.reddit.com');
  });
});
