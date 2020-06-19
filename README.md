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

### End to end test
**Prerequisites**
<br/> 
Step 1: You should have node installed in your local system 
<br/>
Step 2: Install protractor npm package globally ***npm install -g protractor***
<br/>
Step 3: Update webdriver on your local system ***webdriver-manager update***
<br/>
Step 4: Run ***npm install*** command in each folder 'client', 'server', and 'protractor'

```bash
# The following command will start end to end testing at once
> npm run e2e
```
NOTE: Some times first test case gets failed, it seems concurrently picks protractor before other parallel command execution completes. ***Will find solution for the same and will update the script.