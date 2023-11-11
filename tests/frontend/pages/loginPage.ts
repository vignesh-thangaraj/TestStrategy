import { Locator, Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

const email: string = faker.internet.email();


type PlaywrightResponseType = {
    statusCode: number,
    body: {}
}

type LoginScreenShouldHave = 'google' | 'github' | 'sso' | 'forgotPassword' | 'signup' | 'privacyLink' | 'terms' | 'cookiePolicy' | 'logo'

type Status = 'success' | 'failure' | 'serverIssue'

const successLogin:PlaywrightResponseType = {
     "statusCode": 200, 
     "body":{
        "type": "success",
        "userId": 1,
        "email": email
     }
     
}
 
const unSuccessfulLogin:PlaywrightResponseType = {
    "statusCode": 422,
    "body": {
        "type": "error",
        "title": "Bad Request Error",
        "message": {
            "email": "Custom Error Message"
        }
    } 
}

const serverIssue:PlaywrightResponseType = {
    "statusCode": 500,
    "body": {
        "type": "error",
        "title": "Server Side issue",
    } 
}


export class LoginPage {

    private page: Page;
    private userNameTextBox: Locator;
    private passwordTextBox: Locator;
    private submitButton: Locator;
    private emailErrorMessage: Locator;
    private passwordErrorMessage: Locator;
    private googleSinginButton: Locator;
    private githubSigninButton: Locator;
    private loginSSOButton: Locator;
    private forgetPasswordLink: Locator;
    private signupLink: Locator;
    private termsOfServiceLink: Locator;
    private privacyPolicyLink: Locator;
    private cookiesPolicyLink: Locator;
    private logo: Locator;
    private reviews: Locator;
    private integration: Locator;

    constructor(page: Page){
        this.page = page;
        this.userNameTextBox = page.locator('#email');
        this.passwordTextBox = page.locator('#password');
        this.submitButton = page.locator('#login-button');
        this.emailErrorMessage = page.getByTestId('errors-email');
        this.passwordErrorMessage= page.getByTestId('errors-password');
        this.googleSinginButton = page.locator('a[href^="/login/google/"]');
        this.githubSigninButton = page.locator('a[href^="/login/github/"]');
        this.loginSSOButton = page.locator('a[href="/sso"]');
        this.forgetPasswordLink = page.locator('a[href="/password/reset"]');
        this.signupLink = page.locator('a[href="/register"]');
        this.termsOfServiceLink = page.locator('a[href$="/terms-of-service"][target="_blank"]');
        this.privacyPolicyLink = page.locator('a[href$="/privacy"][target="_blank"]');
        this.cookiesPolicyLink = page.locator('a[href$="/legal/cookie"][target="_blank"]');
        this.logo = page.locator('img[src*="logo"]');
        this.reviews = page.locator('a[href$="/reviews"]');
        this.integration = page.locator('a[href$="/integrations"]');
    }


    async loginIntoApplication(status: Status): Promise<void>{
        let mockData:PlaywrightResponseType;
        switch(status){
            case 'success':
                mockData = successLogin;
                break;
            case 'failure':
                mockData = unSuccessfulLogin;
                break;
            case 'serverIssue':
                mockData = serverIssue;
                break;
        }
        this.page.route(/\/api\/login\/?/, (route) =>{
            route.fulfill({
                status: mockData.statusCode,
                body: JSON.stringify(mockData.body),
                headers: {}            
            })
        })
        await this.userNameTextBox.fill(email);
        await this.passwordTextBox.fill(faker.internet.password({length: 10}));
        await this.submitButton.click();
    }

    async verifyLogin(status: Status):Promise<void>{
        switch(status){
            case 'success':
                await this.page.waitForRequest('https://accounts.lambdatest.com/**').then(response => {
                    console.log('Mocked as valid User and application tries to fetch the acctount information from the system!')
                })
                break;
            case 'failure': 
                expect((await this.emailErrorMessage.innerHTML()).trim() === "Custom Error Message").toBeTruthy();
                break;
            case 'serverIssue': 
            expect(await this.emailErrorMessage.innerHTML() === "Oops! System error occured").toBeTruthy();
                break;
        }
    }

    async validateEmailValidationMessage():Promise<void>{
        let message = "Invalid email address"
        await this.userNameTextBox.fill(faker.internet.password({length: 10}))
        await this.passwordTextBox.click()
        expect((await this.emailErrorMessage.innerHTML()).trim() === message).toBeTruthy()
    }

    async validatePasswordValidationMessage():Promise<void>{
        let message = "Password should be at least 8 characters long"
        await this.passwordTextBox.fill(faker.internet.password({length: 5}))
        await this.userNameTextBox.click()
        expect(await this.passwordErrorMessage.innerHTML() === message).toBeTruthy()
    }

    async shouldHave(have: LoginScreenShouldHave):Promise<void>{
        let element: Locator;
        switch(have){
            case 'google':
                element = this.googleSinginButton
                break;
            case 'github':
                element = this.githubSigninButton
                break;
            case 'sso':
                element = this.loginSSOButton
                break;
            case 'signup':
                element = this.signupLink
                break;
            case 'forgotPassword':
                element = this.forgetPasswordLink;
                break;
            case 'cookiePolicy':
                element = this.cookiesPolicyLink;
                break;
            case 'privacyLink':
                element = this.privacyPolicyLink;
                break;
            case 'terms':
                element = this.cookiesPolicyLink;
                break;
            case 'logo':
                element = this.logo;
                break;
            default:
                throw Error('Invalid should have keyword passed in the test!');
        } 
        expect(await element.isEnabled()).toBeTruthy()
    }

    async footerNavbar():Promise<void>{
        expect(await this.reviews.isEnabled()).toBeTruthy();
        expect(await this.integration.isEnabled()).toBeTruthy();
    }

}