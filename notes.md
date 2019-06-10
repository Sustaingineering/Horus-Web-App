## Some obervations
I think that this type of app would work better as a web-app (unless we need SD card functionality?)
User authentication is all client-side without hashing the password
Are we going to have the users stored elsewhere?

WHat is the expected userflow of the app? 

The Arduino will send data to the SD card in a CSV (get the format of it) which will have all the data, whereas the sent data will be an average of the past 30 minutes (or whatever rate we can set). 

The GUI should be a single page app that maybe we can authenticate with firebase (login that way) which will give access to the sensors (stored in the firebase list?) and display it that way.

It should also have the ability to upload the SD card data to the app, which will not replace the data. 

Specification of the data being sent. 



Flow of the app should be:
Firebase Login -> Dashboard

Dashboard should have the ability to see all sensors currently registered to account
Ability to register a sensor (maybe some sort of unique ID?)
Ability to upload data (that will match a sensor)


Stretch goals:
- Being able to change the update rate of the sensors

Should have the following routes:
/login
/dashboard <- existing dashboard
/{sensor} <- existing sensor page
/upload <- upload sensor data here
/config <- configure sensors here
/profile <- update firebase profiles?


// Profile settings
  // Profile Photo URL
  // Name
  // Phone
  // Submit Changes

// Email functions
  // Email
  // Change Email
  // Verify email (if not verified button)

// Admin functions
  // Current password
  // Password field
  // Update password
  // Send password reset
  // Delete account

// TODO
Split out buttons so they're their own props that take a color and function
Split out inputs so it's the same
Set up the auth handlers for Google and Facebook
Set up the reauthorization after 5 minutes to access admin functions
Set up the handlers to change user profile settings

## Build

`npm run react-build`
`firebase init hosting`
`firebase deploy`
