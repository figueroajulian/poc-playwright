import { test, expect } from '@playwright/test';

(async () =>{

	test.describe('Navigation in JF portofolio site', () => {
		const sections = [
			{ name:'Experience', url: '/#experience', titleExpected: 'Test Engineer', locator: 'experience-title'},
			{ name:'Tech-Stack', url: '/#techstack', titleExpected: 'Tech Stack', locator: 'techstack-title'},
			{ name:'Me', url: '/#me', titleExpected: 'Hi there', locator: 'me-title'}
		];

		test.beforeEach(async ({ page }) => {
			await page.goto('')
		})

		for (const section of sections){

			test(`Redirection to the section ${section.name} is working as expected`, async ({ page }) => {
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