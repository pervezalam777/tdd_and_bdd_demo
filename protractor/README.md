# End To End Testing
This project use protractor as a End to End application test for individual pages.

## Prerequisites 
Step 1: You should have node installed in your local system
Step 2: Install protractor npm package globally *npm install -g protractor*
Step 3: Update webdriver on your local system *webdriver-manager update*

## How to up and running protractor
### Manually run each module
Step 1: Run your application client and server on your local machine. Please find instruction in client and server README.md files.
Step 2: Run web driver manager and command window using *webdriver-manager start* and keep it running.
Setp 3: Run protractor with configuration file *protractor conf/conf.js*

Or
### Run build will concurrently
```bash
# The following command will install concurrently in local project folder.
# **Run only if following command not ran previously
> npm run e2e:install 

# The following command will start end to end testing at once
> npm run e2e
```