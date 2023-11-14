import { test , expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
const testdata = require('./testdata/login.json')[process.env.ENV || ''] ;

test.describe("API should respond", () =>{
    
    test("200 for valid credentials", async ({request}) =>{
        const response = await request.post('/api/login', {
            data: {
                "email":testdata.email,
                "password":testdata.password
            }
        });
        expect(response.ok()).toBeTruthy()
        expect((await response.json()).name).toEqual(testdata.userName)
    })

    test("422 for invalid credentials", async ({request}) =>{
        const response = await request.post('/api/login', {
            data: {
                "email": faker.internet.email(),
                "password": faker.internet.password({length: 8})
            }
        });
        expect(response.status() === 422).toBeTruthy()
        expect((await response.json()).message.email).toEqual('Please enter a correct email address and password. Note that the password is case-sensitive')
    })

    test("422 for leaving Email value empty", async ({request}) =>{
        const response = await request.post('/api/login', {
            data: {
                "email": "",
                "password": faker.internet.password({length: 8})
            }
        });
        expect(response.status() === 422).toBeTruthy()
        expect((await response.json()).message.email).toEqual("Email is a required field")
    })

    test("422 for leaving Password value empty", async ({request}) =>{
        const response = await request.post('/api/login', {
            data: {
                "email": faker.internet.email(),
                "password": ""
            }
        });
        expect(response.status() === 422).toBeTruthy()
        expect((await response.json()).message.password).toEqual("Password is a required field")
    })
})