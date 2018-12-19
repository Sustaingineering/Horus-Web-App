const cache = require('../services/cache.service.js')
const datastore = require('../datastore');

var identifySensor = exports.identifySensor = (userId, sensorId) => {
    return new Promise (async (resolve, reject) => {
        try {
            // 1) Check if in cache
            let value = await isSensorInCache(userId)
            if (value) {
                if (value.sensors[sensorId]) {
                    return resolve(true)
                }
            }
            // 2) Look for sensor in local database
            let isNewSensor = await datastore.findUserSensor(userId, sensorId);
            // 3) If not in database, add to database
            if (!isNewSensor) {
                datastore.addUserSensor(userId, sensorId);
            }
            // 4) Add to cache 
            await insertSensorToCache(userId, sensorId)
            return resolve(false)
        } catch (error) {
            console.log(error)
            return reject(error)
        }
        
    })
    
};

var isSensorInCache = exports.isSensorInCache = (userId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let value = await cache.get(userId)
            if (value) {
                return resolve(value)
            }
            return resolve(false)
        } catch (error) {
            console.log(error)
            return reject(error)
        }
    }) 
}

var insertSensorToCache = exports.insertSensorToCache = (userId, sensorId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userCache = await cache.get(userId);
            if (!userCache) {
                userCache = {
                    sensors: {}
                }
            }
            userCache.sensors[sensorId] = sensorId;
            let result = await cache.set(userId, userCache)
            if (result) {
                return resolve(result)
            }
            return reject(false)
        } catch (error) {
            console.log(error)
            return reject(error)
        }
    })
};

