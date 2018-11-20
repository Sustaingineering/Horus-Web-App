const assert = require('chai').assert;
const datastore = require('../electron/datastore.js');


describe('Application launch', function () {
    this.timeout(10000)


  it('Signs up a user', async function() {
    await datastore.newUser(TEST_DATA.user);
    let newUser = await datastore.findUser(TEST_DATA.user.email);
    assert.equal(newUser, true, 'User created successfully');
  })

})

const TEST_DATA = {
    user: {
        email: 'test@gmail.com',
        password: 'testpass123',
        username: 'test',
        organization: 'UBC'
    }
}