var fs = require('fs');
describe('useSmoothScroll', () => {
  // jest.setTimeout(30000);
  const CommonUsage = async () => {
    beforeEach(async () => {
      console.log('------------beforeEach');
      const headlessUserAgent = await page.evaluate(() => navigator.userAgent);
      const chromeUserAgent = headlessUserAgent.replace(
        'HeadlessChrome',
        'Chrome'
      );
      await page.setUserAgent(chromeUserAgent);
      await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.8',
      });
      // await page.setViewport({
      //   width: 1024,
      //   height: 768,
      // });
      // hack：load storybook's iframe directly to avoid bug
      await page.goto(
        'http://localhost:6006/iframe.html?id=main-usesmoothscroll--docs&viewMode=docs#stories'
      );
      await page.waitForSelector('#root');

      // test code below
      // await page.waitFor(3000);
      // const test = await page.content();
      // fs.writeFileSync('writeMe.html', test);
    });

    it('should scrollTo target node when button clicked', async () => {
      await expect(page).toMatch('y-item-0');
      const demoWrapElm = await page.$(`#demo-stories`);
      const getItem = async num => {
        const res = await page.$(`#y-item-${num}`);
        return res;
      };
      expect(await (await getItem(20)).isIntersectingViewport()).toBe(false);

      // await expect(page).toClick('button', { text: `scrollTo('#y-item-20')` });
      await (await page.$('#demo-stories-btn-1')).click();
      await page.waitFor(1000);

      // expect(await (await getItem(28)).isIntersectingViewport()).toBe(true);
      // await expect(page).toMatchElement('#y-item-20');
      expect(
        await (await demoWrapElm.getProperty('scrollTop')).jsonValue()
      ).toBe(430);
    });
  };
  CommonUsage();
});
