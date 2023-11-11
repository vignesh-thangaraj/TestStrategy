import { TestFixture, test as base } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";

type TestFixtures = {
    loginPage: LoginPage
}

export const test = base.extend<TestFixtures>({
    page: async ({baseURL, page}, use) => {
        await page.goto(baseURL || '');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForLoadState('networkidle');
        await use(page);
    },
    loginPage: async( { page }, use) =>{
        await use(new LoginPage(page));
    }
});