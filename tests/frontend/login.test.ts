import { test } from './testFixtures';

test.describe("User", () =>{
    test("Should allow in if supplied a valid crdentials", async ({loginPage, page}) =>{
        await loginPage.loginIntoApplication('success')
        await loginPage.verifyLogin('success')
    })
    test("Should not allow in if supplied a invalid crdentials", async ({loginPage}) =>{
        await loginPage.loginIntoApplication('failure')
        await loginPage.verifyLogin('failure')
    })
})

test.describe(">= 500 response from backend", () =>{
    test("Should display a proper message in the UI", async ({loginPage}) =>{
        await loginPage.loginIntoApplication('serverIssue')
        await loginPage.verifyLogin('serverIssue')
    })
})

test.describe("Application should display valid error message", () => {
    test("if i enter invalid email", async ({loginPage})=>{
        await loginPage.validateEmailValidationMessage()
    })

    test("if i enter less than 8 characters long password", async ({loginPage})=>{
        await loginPage.validatePasswordValidationMessage()
    })  
})

test.describe("Login screen should have", () =>{
    test("Google signin login button", async ({loginPage}) =>{
        await loginPage.shouldHave('google')
    })
    test("Github signin login button", async ({loginPage}) =>{
        await loginPage.shouldHave('github')
    })
    test("SSO login button", async ({loginPage}) =>{
        await loginPage.shouldHave('sso')
    })
    test("lambdatest logo", async ({loginPage}) =>{
        await loginPage.shouldHave('logo')
    })
    test("forget password link", async ({loginPage}) =>{
        await loginPage.shouldHave('forgotPassword')
    })
    test("signup link", async ({loginPage}) =>{
        await loginPage.shouldHave('signup')
    })
    test("terms & privacy policy & cookie policy links", async ({loginPage}) =>{
        await loginPage.shouldHave('cookiePolicy')
        await loginPage.shouldHave('privacyLink')
        await loginPage.shouldHave('terms')
    })
    test("different navigation links in the bottom", async ({loginPage}) =>{
        await loginPage.footerNavbar()
    })
})
