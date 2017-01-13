# Information
This is a webpage test that uses "ApiTest".

If no changes to the "test" data on the server the login for admin is:

|username:| password:|
|---|---|
|admin| admin|

If any other combinations are entered the "user" page is loaded.

The test data is defined in:
RouteService.java (route test data)
UserService.java (user test data)

A simple database is used for test purposes which limits the number of users. 
The database is not thread safe. 

# Installation
main.html (first page)

In JavaMain.js the "rootURL" needs to be defined so it point to the API.
