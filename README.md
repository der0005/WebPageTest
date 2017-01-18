# Information
This is a test webpage that interacts with the Rest API project "ApiTest" located in repository "ApiTest".

The login for admin (CRUD operations) is:

|username:| password:|
|---|---|
|admin| admin|

If any other combinations are entered the "user" page is loaded.

This webpage can’t do requests if the API is used on a local server (the same-origin policy). 
If same-origin policy, there are options (buttons) on the main page, to bypass login either as “user” or “admin”. In that case test route information is defined from file.

# Installation
1. Copy all files to your computer.
2. The "rootURL" needs to be defined so it point to the API (see repository "ApiTest").
3. Open main.html (first page).

If the same-origin policy is NOT an issue, make sure to set the correct path (rootURL) in “settings.js” (the pathname to the directory in which testapi is placed).
