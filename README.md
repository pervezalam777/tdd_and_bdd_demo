# User Authentication
This demo project will showcase Unit testing and Integration testing following the TDD and BDD approach.

## Requirement
### UI login and Dashboard
* Create a login page which has an username and password field.
* A login button which will authenticate the credentials and directs the user to a dashboard screen.
* No specific requirement for UI implementation.

### Unit testing using Jasmine / Karma
* Write the unit test cases for this application in Jasmine.
* Write negative test cases to ensure the all the aspects of the feature are tested/covered.

### Integration testing using Protractor.
* Write integration test cases using protractor.
* Open the login page through protractor conf.js
* Add user credential in the required field
* perform authentication through login button

## Login credentials
The following are 2 user credentials that are used in this application.

| User Name   | Password      |
|-------------| --------------|
| pervez      | password123   |
| vijay       | password123   |

NOTE: You can add more user credentials via adding object in ***server/db/data.js*** file

## How to run
**Prerequisites**
<br/>
Step 1: You should have node installed in your local system
<br/>
Step 2: Run ***npm install*** command in each folder 'client', 'server', 'e2e' and root folder.

```bash
#root folder
tdd_and_bdd_demo> npm install

#server folder 
tdd_and_bdd_demo/server> npm install

#client folder
tdd_and_bdd_demo/client> npm install

#e2e folder
tdd_and_bdd_demo/e2e> npm install
```

### **Setup development environment**
You can run development environment from the project root folder
```bash
#If you have node >= 13.0.0 

tdd_and_bdd_demo> npm run dev

#  Or

#Previous version of node has experimental support for es module
#So run the following command if your version below 13.0.0

tdd_and_bdd_demo> npm run dev:lower
```

### **Setup client unit test cases**
The following command will start karma in development mode which means any changes in the test cases will auto trigger the test runner again.
```bash
tdd_and_bdd_demo> npm run client:test
```

### **Setup End to end test**
**Prerequisites**
You should have Java 8 and above installed on your machine.

Step 1: Open terminal window at project root level
```bash
# The following two command would required only once 
tdd_and_bdd_demo> cd e2e
tdd_and_bdd_demo/e2e> npm run update


# The following command will start client, server, and webdriver
#If you have node >= 13.0.0 

tdd_and_bdd_demo> npm run ne2e:env

#  Or

#Previous version of node has experimental support for es module
#So run the following command if your version below 14.0.0

tdd_and_bdd_demo> npm run e2e:envlower
```

Step 2: Open another terminal window at project root level
```bash
tdd_and_bdd_demo> npm test
```

> **NOTE**: If your local npm package setup does not work for webdriver-manager, please install it globally. You would also need admin writes on your machine before executing the following commands
```bash

tdd_and_bdd_demo> npm install -g protractor

#Then

tdd_and_bdd_demo> webdriver-manager update

#Then run following command on separate terminal window
tdd_and_bdd_demo> webdriver-manager start

#Run client and server via following command in another terminal window
tdd_and_bdd_demo> npm run dev
#OR
tdd_and_bdd_demo> npm run dev:lower

#Then open new terminal window and go inside e2e folder and run the following command
tdd_and_bdd_demo/e2e> npm test

```


## Out of scope 
This involves a basic login functionality, so the following feature are not part of this demo. The below may be implemented, if there is a specific requirement.
1) User name validation for email id (only if user name required to be email)
2) At least 3 character validation at front end for both username and password.
3) Two factor authentication via sending OTP on email or Mobile or any other medium.
4) Error handling if there are more than 5 consecutive attempt (attempt will be configurable). The actual implementation will be done on server side which will send error to user if max limit has been reached.
5) Adding captcha after first invalid attempt (this could be alternative approach of point 3)
6) Accessibility implemented partially.
7) Keeping user session alive i.e. in case an user reloads the application or closes the browser. This feature require cookie or local storage where user token can be preserved.
8) JWT token is best approach for stateless session and it may carry expiry time which can be checked at both end client and server.