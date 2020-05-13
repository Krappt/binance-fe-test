import puppeteer from 'puppeteer';
import { TEST_URL } from '../../config';

describe('Test the APP', () => {
  let browser = null;
  let page = null;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    page.emulate({ viewport: { width: 500, height: 2400 }, userAgent: '' });
    await page.goto(TEST_URL);
    await page.waitForSelector('[data-testid="app-inner"]');
  }, 16000);

  test('renders a table', async () => {
    const table = await page.$eval('table', (el) => !!el);
    expect(table).toBe(true);

    browser.close();
  });

  test('loads data', async () => {
    const tds = await page.$$eval('table td', (el) => el.length);
    expect(tds > 1).toBe(true);

    browser.close();
  });

  test('select BTC market', async () => {
    await page.click('[data-testid="BTC"]');
    const html = await page.$eval('table td:first-child', (el) => el.innerHTML);
    expect(html).toContain('BTC');

    browser.close();
  });

  test('select Volume column', async () => {
    await page.click('[data-testid="volume"]');
    const html = await page.$eval('table th:last-child', (el) => el.innerHTML);
    expect(html).toContain('Volume');

    browser.close();
  });

  test('search a symbol', async () => {
    const searchKey = 'XRP';
    await page.type('[data-testid="search"]', searchKey);
    const html = await page.$eval('table td:first-child', (el) => el.innerHTML);
    expect(html).toContain(searchKey);

    browser.close();
  });
});
