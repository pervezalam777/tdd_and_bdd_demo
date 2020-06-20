# End To End Testing
This project utlizes Protractor as an end to end application test tool for individual pages.

## Prerequisites
Step 1: You should have node installed in your local system
Step 2: Install protractor npm package globally *npm install -g protractor*
Step 3: Update webdriver on your local system *webdriver-manager update*

## How to setup and run protractor

### Manually run each module
1) Run your application client and server on your local machine. Each will have their own cmd open and application running in it. Please find the necessary instructions in client and server README.md files.
<br />
2) Go to e2e folder > open cmd> Run web driver manager in command window using *webdriver-manager start*.
<br />
3) Go to e2e folder> open cmd > Run protractor with the following command *protractor conf/conf.js*.