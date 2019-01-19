const Application = require('spectron').Application
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
const resetPassword = require('../electron/modules/resetPassword.js')
const assert = require('chai').assert;
const datastore = require('../electron/datastore.js');

describe('Account Functionality Testing', function () {
  this.timeout(10000)

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
    email: 'horus.sustaingineering@gmail.com',
    password: 'testpass123',
    newPassword: 'newPass'
  }
}