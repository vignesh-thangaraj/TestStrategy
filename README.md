# About
Automate the login page of a website seamlessly with decoupled systems for both frontend and backend, addressing all corner cases. This repository provides comprehensive insights and solutions for a robust and reliable login automation process.

# Why Playwright?

Selenium is the dominant player in the market, and it is a library, not an automation framework. I am testing the application in isolations of frontend & backend(we will see the reason later in the document), requires more than GUI automation library. Cypress is an equally dominating player for Playwright, and it has its own trade-offs, like 
 * You cannot test in multiple windows but can still handle it in a workaround. 
 * You cannot open multiple browsers simultaneously; Cypress runs inside a browser like an extension(imagine in that way), and it's tightly coupled with the tab instead of a window. 
 * In my experience, it is slower in performance, not in interactions as a tool. 
 * Each test is limited to only visiting domains determined to be of the same-origin.

 But Playwright sounds like a different experience as it has no restrictions like Cypress, and performance is very smooth & fast as a tool. That is the reason I picked this tool.

# Why test frontend & backend in Isolation?
 * ### Simple & easily debuggable.
   * If test is failed because of not able to click on a button, your debug steps have to identify whether it is a frontend issue or backend issue. If you isolate your tests, it reduces your failure analysis surface.
 * ### Integrate in your pipeline as scalable
   * In your frontend/backend test code base pipeline, integrate relevant test cases and they manage it. Each PR is running with more rigorous and relevant tests.
 * ### Reduce flakiness in tests
   * You decouple the systems with each other, will reduce your flakiness. If you run more tests, your backend systems will be in load and responds slow/500s will make your test flaky. Frontend isolation, read data in local and make sure tests are failed only on real DOM rendering failures.
 * ### Execution time is less
   * Your frontend tests, reads the data front local, your test will not spend anything over the internet. It is quick and rely on localhost.
 * ### Easily reproducible
   * If a test case is failed in your pipeline, you can easily reproduce the same in your local. Why because, your test data is same and test state is same across all places. You will never ended up that, it is failing randomly.
 * ### Test data generation is easy & simple
   * You don't worry about test bed creation. you generate the test data on the go and validate against the data easily without any effort. 

## CONS
  * Mocking required more effort
  * Can lead to failure because of data issues, technically not a system issue
  * Understand system from developer point of view to make sure all corner cases are covered. Actually it is positive ;). 

PS: You can read more about frontend & backend inside the folder ReadMe files.