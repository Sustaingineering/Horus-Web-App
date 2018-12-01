const Application = require('spectron').Application
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
const resetPassword = require('../electron/modules/resetPassword.js')
const assert = require('chai').assert;
const datastore = require('../electron/datastore.js');

describe('Account Functionality Testing', function () {
  this.timeout(10000)

  // beforeEach(function () {
  //   this.app = new Application({
  //     // Your electron path can be any binary
  //     // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
  //     // But for the sake of the example we fetch it from our node_modules.
  //     path: electronPath,

  //     // Assuming you have the following directory structure

  //     //  |__ my project
  //     //     |__ ...
  //     //     |__ main.js
  //     //     |__ package.json
  //     //     |__ index.html
  //     //     |__ ...
  //     //     |__ test
  //     //        |__ spec.js  <- You are here! ~ Well you should be.

  //     // The following line tells spectron to look and use the main.js file
  //     // and the package.json located 1 level above.
  //     args: [path.join(__dirname, '..')]
  //   })
  //   return this.app.start()
  // })

  // afterEach(function () {
  //   if (this.app && this.app.isRunning()) {
  //     return this.app.close()
  //   }
  // })

  it('Calls generate password token', async function() {
    let passwordReset = await resetPassword.generatePasswordToken({email: TEST_DATA.user.email})
    assert.equal(passwordReset.success, 'Verification Email sent', 'The verification email was sent')
  })

  it('Email Does not exist', async function(){
    let passwordReset = await resetPassword.generatePasswordToken({email: "randomEmail"})
    assert.equal(passwordReset.error, "Email does not exist")
  })

  it('Validates and changes password for a user', async function() {
    let passwordToken = await datastore.getPasswordToken({email: TEST_DATA.user.email});
    let passwordReset = await resetPassword.verifyAndUpdatePassword({email: TEST_DATA.user.email, token: passwordToken[0].token, password: TEST_DATA.user.newPassword});
    assert.equal(passwordReset.success, 'Password changed!')
  })

  it('Attempts and fails to change password given a wrong token', async function() {
    let passwordReset = await resetPassword.verifyAndUpdatePassword({email: TEST_DATA.user.email, token: 'wrong token', password: TEST_DATA.user.password});
    assert.equal(passwordReset.error, 'Wrong Verification Code entered')
  })

})

const TEST_DATA = {
  user: {
    email: 'test@gmail.com',
    password: 'testpass123',
    newPassword: 'newPass'
  }
}