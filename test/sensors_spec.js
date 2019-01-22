//getUserSensors
//FindUserSensor
//Add user sensor
const assert = require('chai').assert
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
    it('Succesfully get a list of sensors owened by the user', async function() {
        let sensorList = await datastore.getUserSensors(TEST_DATA.userId)
        assert.equal(sensorList[0], TEST_DATA.sensorIds[1]) 
        assert.equal(sensorList[1], TEST_DATA.sensorIds[0]) 
    })

})
