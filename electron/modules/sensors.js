const cache = require('../services/cache.service.js')

var identifySensor = exports.identifySensor = (userId, sensorId) => {
    return new Promise (async (resolve, reject) => {
        try {
            // 1) Check if in cache
            let value = await isSensorInCache(userId)
            if (value) {
                if (value === sensorId) {
                    return resolve(true)
                }
            }
            // TODO: Initialize new database in datastore.js for sensor data
            // 

            // 2) Not in cache
            // -- Check if in db
            // --- If in db, true then add to cache

            // 3) Not in db or cache
            // -- Add to db and to cache
            

            return reject(false)
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
            return reject(value)
        } catch (error) {
            console.log(error)
            return reject(error)
        }
    }) 
}

var insertSensorToCache = exports.insertSensorToCache = (userId, sensorId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await cache.set(userId, sensorId)
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

