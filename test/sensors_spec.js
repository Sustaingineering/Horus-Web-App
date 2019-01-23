//getUserSensors
//FindUserSensor
//Add user sensor
const expect = require('chai').expect
const datastore = require('../electron/datastore')

//Testing constants
let TEST_DATA = {
    userId: 'test',
    sensorIds: [
        '1',
        'S1'
    ]
}

describe('Sensor datastore api test', function() {
    this.timeout(10000)
    it('Succesfully get a list of sensors owned by the user', async function() {
        let sensorList = await datastore.getUserSensors(TEST_DATA.userId)
        expect(sensorList.sort()).to.deep.equal(TEST_DATA.sensorIds)
    })

})
