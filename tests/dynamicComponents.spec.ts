import { test, expect } from '@playwright/test';
import { delay, validateTimeElapsed } from '../utils/utils';

(async () => {
    test.describe('Dynamic title in JF portfolio', () => {
        test('Verifying list of test types in a dinamic component', async ({ page }) => {
            const types = ["Automation", "Manual", "Security", "Performance"]

            await test.step('Go to the JF site', async () => {
                await page.goto('');
            })

            await test.step('Find testing type coincidences', async () => {
                const currentType = await page.locator('.Intro_word__VWCdZ[data-plus="true"]').textContent()
                await expect(types).toContain(currentType);
            })

            await test.step('Find testing types by using polling techinque', async () => {
                let typesFound: string[] = [];
                let typesFoundCount = 0;
                const timeout = 20000;
                const pollInterval = 600;
                const startTime = Date.now();

                while (typesFoundCount < types.length) {
                    validateTimeElapsed(Date.now() - startTime, timeout, 'types not found');

                    const currentType = await page.locator('.Intro_word__VWCdZ[data-plus="true"]').first().textContent()
                    if (currentType != null && isValidType(currentType, types, typesFound)) {
                        typesFound.push(currentType);
                        typesFoundCount++;
                    }

                    await delay(pollInterval);
                }
                await expect(types).toEqual(typesFound);
            })
        })
    })
})();

function isValidType(currentType: string, types: string[], typesFound: string[]): boolean {
    return currentType !== '' && types.includes(currentType) && !typesFound.includes(currentType);
}