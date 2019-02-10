const puppeteer = require('puppeteer');
const { generateText } = require('./util');

test('should output name and age', ()=> {
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');

});

test('should click around', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        agrs: ['--window-size=1920, 1080']
    });

    const page = await browser.newPage();
    page.goto(
        'https://www.google.com'
    );
});