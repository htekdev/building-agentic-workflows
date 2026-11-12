import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('navigates stable slide links and keeps hidden links out of focus', async ({ page }) => {
  const failures: string[] = [];
  page.on('pageerror', (error) => failures.push(error.message));
  await page.goto('./');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  await expect(page.locator('#welcome')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/#\/outcomes/);
  await expect(page.locator('#welcome')).toHaveJSProperty('inert', true);
  await page.goto('./#/tool-management');
  await expect(page.locator('#tool-management')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.reveal')).toHaveClass(/overview/);
  await expect(page.locator('#welcome')).toHaveJSProperty('inert', false);
  await page.locator('#safe-outputs').click();
  await expect(page.locator('.reveal')).not.toHaveClass(/overview/);
  await expect(page).toHaveURL(/#\/safe-outputs/);
  expect(failures).toEqual([]);
});

test('opens public notes in speaker view and offers readable handout', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Speaker view' }).click();
  const popup = await popupPromise;
  await expect(popup).toHaveTitle('reveal.js - Speaker View');
  await expect(popup.locator('body')).toContainText('Purpose: set an engineering');
  await popup.close();
  await page.getByRole('link', { name: 'Handout & notes' }).click();
  await expect(page.getByRole('heading', { name: 'Research sources' })).toBeVisible();
  await expect(page.locator('.handout-notes').first()).toContainText('Purpose:');
  await expect(page.locator('article')).toHaveCount(35);
});

test('has no serious accessibility violations on the title and handout', async ({ page }) => {
  for (const route of ['./', './handout.html']) {
    await page.goto(route);
    await page.waitForSelector(route === './' ? '.reveal.ready' : '#references');
    if (route === './') {
      await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(13, 17, 23)');
      await expect(page.locator('.reveal')).toHaveCSS('font-size', '40px');
      await page.screenshot({ path: test.info().outputPath('title.png') });
    }
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  }
});

test('serves real PDFs and supports reduced motion without missing assets', async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const failed: string[] = [];
  page.on('response', (response) => { if (response.status() >= 400) failed.push(response.url()); });
  await page.goto('./#/demo-validation');
  await expect(page.locator('#demo-validation')).toContainText('not recorded');
  expect(failed).toEqual([]);
  for (const asset of ['downloads/slides.pdf', 'downloads/handout.pdf']) {
    const response = await request.get(asset);
    expect(response.ok()).toBe(true);
    expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
  }
});

test('all slides fit the presentation canvas and the handout fits a narrow screen', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  const ids = await page.locator('.slides > section').evaluateAll((slides) => slides.map((slide) => slide.id));
  for (const id of ids) {
    await page.goto(`./#/${id}`);
    const slide = page.locator(`#${id}`);
    await expect(slide).toHaveClass(/present/);
    expect(await slide.evaluate((element) => element.scrollHeight), id).toBeLessThanOrEqual(900);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('./handout.html');
  await expect(page.locator('#references')).toBeVisible();
  expect(await page.evaluate(() => document.body.scrollWidth)).toBeLessThanOrEqual(375);
});
