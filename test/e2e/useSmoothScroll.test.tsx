// import fs from 'fs'
import expectP from 'expect-puppeteer';
import { ElementHandle } from 'puppeteer';
const getItem = async (id: string) => {
  const res = await page.$(`#${id}`);
  return res;
};
// isIntersectingViewport: allow to judge by threshold
// https://github.com/puppeteer/puppeteer/issues/1665#issuecomment-429356629
async function isIntersectingViewport(
  elm: ElementHandle<Element>,
  options?: {
    threshold?: number;
  }
): Promise<boolean> {
  return await elm.evaluate<(element: Element, options) => Promise<boolean>>(
    async (element, options) => {
      const { threshold = 0 } = options || {};
      const visibleRatio = await new Promise(resolve => {
        const observer = new IntersectionObserver(entries => {
          resolve(entries[0].intersectionRatio);
          observer.disconnect();
        });
        observer.observe(element);
      });
      return Number(visibleRatio) + threshold > 0;
    },
    options
  );
}

// const url = 'https://ron0115.best/react-smooth-scroll-hook';
const url = 'http://localhost:6006';

describe('useSmoothScroll', () => {
  // jest.setTimeout(30000);
  beforeEach(async () => {
    // const headlessUserAgent = await page.evaluate(() => navigator.userAgent);
    // const chromeUserAgent = headlessUserAgent.replace(
    //   'HeadlessChrome',
    //   'Chrome'
    // );
    // await page.setUserAgent(chromeUserAgent);
    await page.setExtraHTTPHeaders({
      'accept-language': 'en-US,en;q=0.8',
    });
    await page.setViewport({
      width: 800,
      height: 4000,
    });
    // hack：must load storybook's iframe directly
    await page.goto(
      `${url}/iframe.html?id=main-usesmoothscroll--docs&viewMode=docs#stories`
    );
    await page.waitForSelector('#root');
    // test code below
    // await page.waitFor(3000);
    // const test = await page.content();
    // fs.writeFileSync('writeMe.html', test);
  });

  test('showld scrollTo 400 distance', async () => {
    const demoWrapElm = await page.$(`#demo-stories`);
    await expectP(page).toClick('button', {
      text: `scrollTo(400)`,
    });
    await page.waitFor(1000);
    expect(await page.evaluate(element => element.scrollTop, demoWrapElm)).toBe(
      400
    );
  });

  test('should scrollTo target node y-item-20', async () => {
    expect(await (await getItem('x-item-20')).isIntersectingViewport()).toBe(
      false
    );

    await expectP(page).toClick('button', {
      text: `scrollTo('#y-item-20')`,
    });

    await page.waitFor(1000);

    expect(await (await getItem('y-item-20')).isIntersectingViewport()).toBe(
      true
    );
    expect(await (await getItem('y-item-19')).isIntersectingViewport()).toBe(
      false
    );
  });
  const DirectionXCommon = async (speed = 200) => {
    test('scrollTo Bottom', async () => {
      await expectP(page).toClick('button', {
        text: `scrollTo Bottom`,
      });
      await expectP(page).toMatch('reachedTop: false');
      await expectP(page).toMatch('reachedBottom: true');

      await expect(
        await (await getItem('x-item-49')).isIntersectingViewport()
      ).toBe(true);
    });
    test('scrollTo Top', async () => {
      await expectP(page).toClick('button', {
        text: `scrollTo Top`,
      });
      await expectP(page).toMatch('reachedTop: true');
      await expectP(page).toMatch('reachedBottom: false');

      await expect(
        await (await getItem('x-item-0')).isIntersectingViewport()
      ).toBe(true);
    });
    test('scrollTo #x-item-20', async () => {
      await expectP(page).toFill('input[name="speed"]', String(speed));
      await expect(
        await (await getItem('x-item-20')).isIntersectingViewport()
      ).toBe(false);

      await expectP(page).toClick('button', {
        text: `scrollTo('#x-item-20')`,
      });

      await page.waitFor(2000);

      await expect(
        await (await getItem('x-item-20')).isIntersectingViewport()
      ).toBe(true);

      await expect(
        await isIntersectingViewport(await getItem('x-item-19'), {
          threshold: -0.01,
        })
      ).toBe(false);
    });
  };
  DirectionXCommon();
  DirectionXCommon(400);
});
