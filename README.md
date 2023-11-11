# TestStrategy
Automate the login page of a website seamlessly with decoupled systems for both frontend and backend, addressing all corner cases. This repository provides comprehensive insights and solutions for a robust and reliable login automation process.

# Why Playwright?

Selenium is the dominant player in the market, and it is a library, not an automation framework. I am testing the application in isolations of frontend & backend(we will see the reason later in the document), requires more than GUI automation library. Cypress is an equally dominating player for Playwright, and it has its own trade-offs, like 
 * You cannot test in multiple windows but can still handle it in a workaround. 
 * You cannot open multiple browsers simultaneously; Cypress runs inside a browser like an extension(imagine in that way), and it's tightly coupled with the tab instead of a window. 
 * In my experience, it is slower in performance, not in interactions as a tool. 
 * Each test is limited to only visiting domains determined to be of the same-origin.
\But Playwright sounds like a different experience as it has no restrictions like Cypress, and performance is very smooth & fast as a tool. That is the reason I picked this tool.

