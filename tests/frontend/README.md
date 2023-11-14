# About Frontend Tests

It is created based of POM type(Page Object Model).
# Setup

### Technology 

Install Node and local git client.

### Node Packages

1. **TypeScript**: It is used to define the Types to make sure errors should catch up in early. e.g., `type Status = 'success' | 'failure' | 'serverIssue'`
is used to define that, these are valid server status used. 
2. **Faker**: For test data generation/usage purpose we used faker. It provides variety of test data types to pass on to the test.
3. **Playwright** : Why playwright is already explained in the project readMe file and here we used intercept & UI capabilities to make that the UI works as expected. Config used is `/playwright.config.ts`

### Starting the project locally

1. Clone the git repo
2. Run the following commands

```bash
  npm install
  npm run frontend-tests
```

### TestCase Details [Execution Status]

* I picked up Login page of the LambdaTest page, and automate below scenarios with our mocked API capabilites from Playwright.
   * **200 Response [Passed]** - If you server give green signal for the given credentials. Validate that, once the success message received, create response to your server to pull the relevant information for the user. 
   * **422 Response [Passed]** - If you server gives you unauthorized signal. Usually developers intend to respond with 401 [Unauthoerized] response code, but here developers responds 422 [Unprocessable content]. I passed a message string `Custom Error Message` and validate that, it should diplay in the UI. 
   * **500 Response [Failed]** - If your server gives 500 for some reason. that scenario is not handled in the UI, so  i failed the test case. 
   * **Validate Invalid Input** - If the user types invalid email/password length, UI should display valid message for it.
   * **Visibility of Links** - validates that page have signup, forget password, footer links in the page.

Why fail the test case? If something broken it should fail. Test case 3 should fail. it is intentional. 

### Considerations

We used Fixtures feature of playwright. Using fixtures, you can decide what should happen Before/After your test gets starts and end and initialize your page object in one place and use it across all the test cases. You can use Before/After hooks but it requires you to import the PageClasses in every single test, and you need to initialize in all tests. But Playwright helps to initialize your pages and destructing it and pass it as props/arguments for the test function. you can find it here `./tests/frontend/testFixtures.ts`


