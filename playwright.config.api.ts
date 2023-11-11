import { defineConfig } from '@playwright/test';

let environment;
const env = process.env.ENV;
switch(env?.toLocaleLowerCase()){
    case 'prod':
        environment = "https://auth.lambdatest.com"
        break;
    case 'dev':
        environment = "https://dev-auth.lambdatest.com"
        break;
    default:
        throw new Error('Invalid environemnt passed in the command!')
}

export default defineConfig({

    testDir: './tests/backend',
    use: {
        baseURL: environment
    }

})