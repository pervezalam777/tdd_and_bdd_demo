# User Authentication
This small demo project showcase Unit testing and Integration testing with the TDD and BDD approach.

## Requirement 
### UI login and Dashboard
* Create a login page which has a username and password field. 
* A button which authenticates the credentials and takes the user into a dashboard page. 
* No Fancy UI is needed.

### Unit testing using Jasmine / Karma
* Write the unit test cases for this this application in Jasmine.
* Write negative test cases to insure the coverage of all the aspects of the required feature.

### Integration testing using Protractor
* Write integration test cases using protractor.
* Open the login page through protractor conf.js
* Add user credential in the required field
* perform authentication through login button


## How to run
**Prerequisites**
<br/> 
Step 1: You should have node installed in your local system 
<br/>
Step 2: Install protractor npm package globally ***npm install -g protractor***
<br/>
Step 3: Update webdriver on your local system ***webdriver-manager update***
<br/>
Step 4: Run ***npm install*** command in each folder 'client', 'server', and 'protractor'

### development environment
```bash
> npm run dev
```

### client unit test cases
The following command will start karma in development mode which means any change will trigger the test runner again until manual exit from the terminal
```bash
> npm run client:test
```

### End to end test
```bash
# The following command will start end to end testing at once
> npm test
```
NOTE: Some times first test case gets failed, it seems concurrently picks protractor before other parallel command execution completes. ***Will find solution for the same and will update the script.

## Out of scope 
This is very basic login functionality so did not add following feature which may or may not implement in near future
1) User name validation for email id (only if user name required to be email)
2) Tow factor authentication via sending OTP on email or Mobile or any other medium.
3) Error handling if there are more than 5 consecutive attempt (attempt will be configurable). The actual implementation will be done on server side which will send error to user if max limit has been reached. 
4) Adding captcha after first invalid attempt (this could be alternative approach of point 3)
5) Accessibility not tested properly though it should work to some extent.
6) Keeping user session even user reload the application or close the browser and come back again. This feature require cookie or local storage where user token can be preserved.
7) JWT token is best approach for stateless session and it may carry expiry time which can be checked at both end client and server.
