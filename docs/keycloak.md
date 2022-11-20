1 - Once you create your keycloak deployment using `cloud-iam` you'll receive the admin credentials in your email inbox.

2 - Create a realm
A realm in Keycloak is the equivalent of a tenant. It allows creating isolated groups of applications and users. By default there is a single realm in Keycloak called master. This is dedicated to manage Keycloak and should not be used for your own applications.

Realm name: meetup

2 - Create a user
Initially there are no users in a new realm, so let’s create one:

Username: gbrotas
First Name: Gabriel
Last Name: Brotas

2.1 - The user will need an initial password set to be able to login. To do this:
Click Credentials (top of the page)
Fill in the Set password form with a password

3 - Login
$KEYCLOAK_URL/realms/meetup/account

4 - Secure your first app
Let’s try to secure our first application. First step is to register this application with your Keycloak instance:
Open the Keycloak Admin Console
Click 'Clients'
Click 'Create client'

Fill in the form with the following values:

Client type: OpenID Connect
Client ID: meetup-client
Click 'Next'
Make sure 'Standard flow' is enabled
Click 'Save'

5 - Set Client Authentication to ON - to confidential access type
5.1 - Redirect url = http://localhost:4002/auth/callback