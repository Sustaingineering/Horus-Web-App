const NodeCache = require('node-cache')
const datastore = require('../datastore.js')

const cache = new NodeCache()

var createCache = exports.createCache = (stdTTL, checkperiod) => {
    return new NodeCache({stdTTL: stdTTL, checkperiod: checkperiod})
}

var get = exports.get = (key) => {
    return new Promise((resolve, reject) => {
        try {
            let value = cache.get(key)
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

var set = exports.set = (key, val) => {
    return new Promise((resolve, reject) => {
        try {
            const success = cache.set(key, val)
            if (success) {
                return resolve(success)
            }
            return reject(false)
        } catch (error) {
            console.log(error)
            return reject(error)
        }
    })
}

var del = exports.delete = (key) => {
    cache.del(key)
}

var keys = exports.keys = () => {
    return this.keys()
}

var flush = exports.flush = () => {
    this.flushAll()
}