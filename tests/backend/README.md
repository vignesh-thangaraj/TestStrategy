# About Backend Tests

# Setup
### Technology

Install Node and local git client.

### Node Packages

1. **TypeScript**: It is used to define the Types to make sure errors should catch up in early.
2. **Faker**: For test data generation/usage purpose we used faker. It provides variety of test data types to pass on to the test.
3. **Playwright** : We used API capabilities to make that the API works as expected. Config used is `/playwright.config.api.ts`

### Starting the project locally

1. Clone the git repo
2. Run the following commands

```bash
  npm install
  npm run backend-tests
```

### TestCase Details [Execution Status]

* I picked up Login API of the LambdaTest page, and automate below scenarios with real server responses using Playwright.
    * **valid Credentials** - If you provide valid credentials, make sure you are getting 200 response. Valid UserName should present in the response.
    * **Invalid Credentials** - If you provide invalid credentials, make sure are getting 422 response code with an expected error message.
    * **Leave Email value Empty** - If you leave the email empty in the request body, make sure you are getting 422 response code with an expected error message.
    * **Leave Password value empty** - If you leave the password empty in the request body, make sure you are getting 422 response code with an expected error message.

### Considerations

I am fetching the data from testdata folder under `./tests/backend-tests/testdata/login`. We are planning to execute the test case in multiple environments and each required specific data to present in the system.
For this purpose, I am using env argument in the config file and configure the test to pick up the right data set from the JSON file. e.g,.
If I pass production as my env variable in the test, it will pick up data using `require('./testdata/login.json')[process.env.ENV || ''] `