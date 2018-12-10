const assert = require('chai').assert;
// const datastore = require('../electron/datastore.js');
const cache = require('../electron/services/cache.service.js')
const datastore = require('../electron/datastore.js');
const sensors = require('../electron/modules/sensors.js')

describe('Cache', function () {
    this.timeout(10000)


    it(`Adds entry to cache and retrieves it`, async function() {
        let sensor_in_cache
        let set = await sensors.insertSensorToCache('omar', '001')
        if (set) {
            sensor_in_cache = await sensors.identifySensor('omar', '001')
        }
       
        // let name = await cache.get('omar')
        assert.equal(sensor_in_cache, true, 'Success')
        
    })
})
