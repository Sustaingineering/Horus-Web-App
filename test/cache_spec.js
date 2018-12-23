const assert = require('chai').assert;
// const datastore = require('../electron/datastore.js');
const datastore = require('../electron/datastore.js');
const sensors = require('../electron/modules/sensors.js')

describe('Cache', function () {
    this.timeout(10000)

    it(`Adds single entry to cache and retrieves it`, async function() {
        await sensors.insertSensorToCache(TEST_DATA.userId, TEST_DATA.sensorIds.sensorId1)
        let sensor_in_cache = await sensors.identifySensor(TEST_DATA.userId, TEST_DATA.sensorIds.sensorId1)
        // let name = await cache.get('omar')
        assert.equal(sensor_in_cache, true, 'Success')
    })

    it(`Adds two entries to cache and retrieves the second one`, async function() {
        await sensors.insertSensorToCache(TEST_DATA.userId, TEST_DATA.sensorIds.sensorId2)
        await sensors.insertSensorToCache(TEST_DATA.userId, TEST_DATA.sensorIds.sensorId3)
        let sensor_in_cache = await sensors.identifySensor(TEST_DATA.userId, TEST_DATA.sensorIds.sensorId3)
        // let name = await cache.get('omar')
        assert.equal(sensor_in_cache, true, 'Success')
    })

    it('Tries to find a sensor that is NOT in cache, and it is NOT in database', async function() {
        await sensors.identifySensor(TEST_DATA.userId, TEST_DATA.sensorIds.sensorId4);
        let sensor_in_cache = await sensors.identifySensor(TEST_DATA.userId, TEST_DATA.sensorIds.sensorId4);
        let sensor_in_db = await datastore.findUserSensor(TEST_DATA.userId, TEST_DATA.sensorIds.sensorId4)
        assert.equal(sensor_in_cache, true, 'Success')
        assert.equal(sensor_in_db,  true, 'Success')
    }) 
})

let TEST_DATA = {
    userId: 'Test-User-1',
    sensorIds: {
        sensorId1: '001',
        sensorId2: '002',
        sensorId3: '003',
        sensorId4: '004'
    }
}
