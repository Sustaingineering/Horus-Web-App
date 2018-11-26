const Application = require('spectron').Application
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
const datastore = require('../electron/datastore.js')
const assert = require('chai').assert;

describe('DataStore Functionality Testing', function () {
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


    const TEST_DATA = {
      user: {
          email: 'test2@gmail.com',
          password: 'testpass123',
          username: 'test',
          organization: 'UBC'
      }
    }
    
    const TEST_DATA2 = {
    user: {
        email: 'test3@gmail.com',
        password: 'testpass123',
        username: 'test',
        organization: 'UBC'
    }
    }
    
    const TEST_DATA3 = {
    user: {
        email: 'test4@gmail.com',
        password: 'testpass123',
        username: 'test',
        organization: 'UBC'
    }
    }


    // initializeDataStore Pass
    it('initializeDataStore Success', async function() {
      await datastore.initializeDataStore()

      let find = await datastore.find({_id: "0000000000000001"}, 'userInfo');
      var id = [ { _id: '0000000000000001' } ]
      assert.equal(JSON.stringify(find), JSON.stringify(id));
    })

    // initializeDataStore Fail

    it ('insert success', async function() {

    })

    //if this test fails, it can be either insert or find that failed
    it('insert and find function success', async function() {
      var l = await datastore.insert(TEST_DATA2.user, "userInfo");
      let Email = await datastore.find({email: TEST_DATA2.user.email}, 'userInfo');
      // need to get the first object as find function returns an array of objects 
      let a = Email[0];
      let Password = await datastore.find({password: TEST_DATA2.user.password}, 'userInfo');
      let b = Password[0];
      let Username = await datastore.find({username: TEST_DATA2.user.username}, 'userInfo');
      let c = Username[0];
      let Organization = await datastore.find({organization: TEST_DATA2.user.organization}, 'userInfo');
      let d = Organization[0];
      assert.equal(JSON.stringify(a), JSON.stringify(l));
      assert.equal(JSON.stringify(b), JSON.stringify(l));
      assert.equal(JSON.stringify(c), JSON.stringify(l));
      assert.equal(JSON.stringify(d), JSON.stringify(l));
    })

/**
 * FindUser Functionality Test 
 */

    it('findUser fail on empty Database', async function() {
      let findUser = await datastore.findUser(TEST_DATA.user.email)
      assert.equal(findUser, false);
    })

    it('findUser fail on Database containing multiple values', async function() {
      await datastore.newUser(TEST_DATA3.user);
      let findUser = await datastore.findUser('nomail@gmail.com')
      assert.equal(findUser, false);
    })
    
    it('findUser Pass on Database containing a single value', async function() {
      await datastore.newUser(TEST_DATA.user);
      let findUser = await datastore.findUser(TEST_DATA.user.email)
      assert.equal(findUser, true);
    })

    it('findUser Pass on Database containing multiple values', async function() {
      let findUser = await datastore.findUser(TEST_DATA.user.email)
      assert.equal(findUser, true);
    })

    // getUserSensors Pass

    // getUserSensors Fail

    it('Test for expire session', async function() {
      await datastore.expireSessions();
    })

    // logOut Fail
    it('logout fail', async function() {
     
    })

    // logOut Pass

    // clearUserData Fail

    // clearUserData Pass

    // restoreSession Fail

    // restoreSession Pass

    // getUserName Fail

    // getUserName Pass

    // getUserEmail Fail

    // getUserEmail Pass

    // getUserOrganization Fail

    // getUserOrganization Pass

    


  });