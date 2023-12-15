import { test, Browser, Page, expect } from '@playwright/test';

(async () =>{
    let browser: Browser;
    let page: Page;

	test.describe('Navigation in JF portofolio site', () => {
		const sections = [
			{ name:'Experience', url: '/#experience', titleExpected: 'Test Engineer', locator: 'experience-title'},
			{ name:'Tech-Stack', url: '/#techstack', titleExpected: 'Tech Stack', locator: 'techstack-title'},
			{ name:'Me', url: '/#me', titleExpected: 'Hi there', locator: 'me-title'}
		];

		for (const section of sections){

			test(`Redirection to the section ${section.name} is working as expected`, async ({ page }) => {

				await test.step('Go to the JF site', async () => {
					page.goto('https://julianfigueroa.netlify.app');
				});

				await test.step(`When I click in "${section.name}"`, async () => {
					page.getByRole('link', { name: section.name }).click();
					await page.waitForURL(`**${section.url}`)
				});

				await test.step('Test Engineer title in the section', async () => {
					const text = await page.locator(`#${section.locator}`).textContent()
					await expect(text).toBe(section.titleExpected)
				});
			});
		};
	})
})();
