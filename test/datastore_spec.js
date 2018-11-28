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
    it('initializeDataStore pass', async function() {
      await datastore.initializeDataStore()

      let find = await datastore.find({_id: "0000000000000001"}, 'userInfo');
      var id = [ { _id: '0000000000000001' } ]
      assert.equal(JSON.stringify(find), JSON.stringify(id));
    })

    // initializeDataStore Fail

    // insert fail?

    // find fail

    //if this test fails, it can be either insert or find that failed
    it('insert and find function pass', async function() {
      var l = await datastore.insert(TEST_DATA2.user, "userInfo");
      let Email = await datastore.find({email: TEST_DATA2.user.email}, 'userInfo');
      // need to get the first object as find function returns an array of objects 
      let a = Email[0];
      assert.equal(JSON.stringify(a), JSON.stringify(l));
    })

    it('update function pass', async function() {
      const data = {email: "123@gmail.com"}
      await datastore.insert(data, 'userInfo');
      let x = await datastore.update(data, {email: "456@gmail.com"}, {}, "userInfo")
      assert.equal(x, 1);
    })

    it('update function fail', async function() {
      const data = {password: "123"}
      let x = await datastore.update(data, {password: "12345"}, {}, "userInfo")
      assert.equal(x, 0);
    })

    it('remove function pass for single object', async function(){
      const data = {email: "123@gmail.com"}
      await datastore.insert(data, 'userInfo');
      let x = await datastore.remove(data, {}, 'userInfo');
      assert.equal(x, 1);
    })

    it('remove function fail for single object', async function(){
      const data = {email: "123@gmail.com"}
      let x = await datastore.remove(data, {}, 'userInfo');
      assert.equal(x, 0);
    })

    it('remove function pass for multiple objects', async function(){
      const data = {pie: "apple pie", color: "blue"}
      const data2 = {pie: "pie", color: "blue"}
      await datastore.insert(data, 'userInfo');
      await datastore.insert(data2, 'userInfo');
      let x = await datastore.remove({color: "blue"}, {multi: true}, 'userInfo');
      assert.equal(x, 2);
    })

    it('remove function fail for multiple objects', async function(){
      const data = {pie: "apple pie", color: "blue"}
      const data2 = {pie: "pie", color: "blue"}
      await datastore.insert(data, 'userInfo');
      await datastore.insert(data2, 'userInfo');
      let x = await datastore.remove({type: "fire"}, {multi: true}, 'userInfo');
      assert.equal(x, 0);
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