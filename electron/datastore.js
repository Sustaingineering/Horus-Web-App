const Datastore = require('nedb');
const _ = require('lodash');
const sensors = require('./modules/sensors.js');

var user_id = exports.user_id = null;
let user_sensors = {};

const DATA_ENV = process.env.DATA_ENV === 'TEST' ? 'test' : 'local'

const udb = {
    userInfo: new Datastore({
        filename: `${__dirname}/datastore/${DATA_ENV}/userInfo`,
        autoload: true
    }),
    dataCollection: new Datastore({
        filename: `${__dirname}/datastore/${DATA_ENV}/dataCollection`,
        autoload: true
    }),
    userSettings: new Datastore({
        filename: `${__dirname}/datastore/${DATA_ENV}/userSettings`,
        autoload: true
    }),
    passwordTokens: new Datastore({
        filename: `${__dirname}/datastore/${DATA_ENV}/passwordTokens`,
        autoload: true
    }),
    userSensors: new Datastore({
        filename: `${__dirname}/datastore/${DATA_ENV}/userSensors`,
        autoload: true
    })
};

var initializeDataStore = exports.initializeDataStore = () => {
    return new Promise((resolve, reject) => {
        udb.userInfo.find({
            _id: '0000000000000001'
        }, (error, docs) => {
            if (error) {
                return reject(error)
            }
            if (docs.length !== 0) {
                return resolve();
            }
            var doc = {
                _id: '0000000000000001'
            };
            udb.userInfo.insert(doc, error => { // Callback is optional
                if (error) {
                    return reject(error)
                }
                return resolve();
            });
        });
    })
}

exports.findUser = function (email) {
    return new Promise((resolve, reject) => {
        udb.userInfo.find({
            email: email
        }, (error, docs) => {
            if (error) {
                return reject(error)
            }
            if (docs.length === 0) {
                return resolve(false)
            }
            return resolve(true);
        })
    })
}

exports.getUserSensors = function (userId) {
    return new Promise(async (resolve, reject) => {
        try {
            let sensors = await find({
                userId: userId
            }, 'userSensors')
            return resolve(sensors)
        } catch (error) {
            console.log(error);
            return reject(error);
        }
    })
}

exports.expireSessions = function () {
    return new Promise(async (resolve, reject) => {
        try {
            let currentTime = Math.round((new Date()).getTime() / 1000);
            let activeSession = await update({
                session: true,
                session_expire: {
                    $lte: currentTime
                }
            }, {
                $set: {
                    session: false
                }
            }, {
                multi: true
            }, 'userSettings')
            return resolve();
        } catch (error) {
            return reject(error)
        }
    })
}

var clearUserData = function () {
    user_id = exports.user_id = null
    user_sensors = {};
}

exports.restoreSession = function (userId) {
    return new Promise(async (resolve, reject) => {
        try {
            let activeSession = await find({
                session: true
            }, 'userSettings')
            if (activeSession.length === 0) {
                return resolve(false)
            }
            user_id = activeSession[0].userId
            return resolve(true)
        } catch (error) {
            return reject(error)
        }
    })
}

//TODO: Check
exports.getUserName = function() {
    return new Promise(async (resolve, reject) => {
        try {
            if(user_id === null) {
                return reject("User not signed-in")
            }
            return resolve(user_id.username);
        } catch (error){
            return reject(error);
        };
    });
};

//TODO: Check
exports.getUserEmail = function() {
    return new Promise(async (resolve, reject) => {
        try {
            if(user_id === null) {
                return reject("User not signed-in")
            }
            return resolve(user_id.email);
        } catch (error){
            return reject(error);
        };
    });
};

//TODO: Check
exports.getUserOrganization = function() {
    return new Promise(async (resolve, reject) => {
        try {
            if(user_id === null) {
                return reject("User not signed-in")
            }
            return resolve(user_id.organization);
        } catch (error){
            return reject(error);
        };
    });
};

exports.findUserSensor = function(userId, sensorId) {
    return new Promise(async (resolve, reject) => {
        try {
            //Query database for sensor and user id
            const sensor = await find({
                userId: userId,
                sensorId: sensorId
            }, 'userSensors');
            if(sensor.length === 0) {return resolve(false)}
            return resolve(true)
        } catch (error){
            console.log(error);
            return reject(error);
        }  
    })
}

//Update Password
exports.newPassword = function (msg) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await find({
                email: msg.email
            }, 'userInfo')
            var uInfoDoc = {
                email: msg.email,
                password: msg.password,
                username: user[0].username,
                organization: user[0].organization,
                created_at: user[0].created_at
            };
            udb.userInfo.update(user[0], uInfoDoc, {}, (error, passwordReplace) => {
                if (error) {
                    return reject(error)
                }
                return resolve(true)
            })
        } catch (error) {
            if (error) {
                return reject(error)
            }
        }
    })
}

//Updated to deal with JSON format
exports.storeSensorData = function (data) {
    return new Promise(async (resolve, reject) => {
        try {
            sensors.identifySensor(user_id, data.data.pumpId)
            data.createdAt = Math.round(new Date().getTime() / 1000);
            //TODO: Check for new User ID
            data.userId = user_id;
            let newDoc = await insert(data, "dataCollection");

            return resolve()
        } catch (error) {
            console.log(`error: ${error}`);
            return reject(error);
        }
    })
}

exports.addUserSensor = function (userId, sensorId) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            data.userId = userId;
            data.sensorId = sensorId;
            data.createdAt = Math.round(new Date().getTime() / 1000);
            await insert(data, 'userSensors');
            return resolve();
        } catch(error) {
            return reject(error)
        }
    })
}

//Testing Purposes
exports.initializeUserId = function (userID) {
    user_id = userID;
} 

exports.getSummaryData = function (pumpId) {
    return new Promise((resolve, reject) => {
        try {
            let userId = user_id;
            udb['dataCollection']
                .findOne({
                    userId: userId,
                    "data.pumpId": pumpId
                })
                .sort({
                    createdAt: -1
                }) // OR `.sort({ updatedAt: -1 })` to sort by last modification time
                .limit(1)
                .exec(function (error, data) {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(data)
                });
        } catch (error) {
            console.log(error)
        }
    })
}

exports.getRealTime = function (data, n) {
    return new Promise((resolve, reject) => {
        try {
            let userId = user_id;
            let pumpId = data.pumpId;
            let count = n ? n : 5;
            udb['dataCollection']
                .find({
                    userId: userId,
                    "data.pumpId": pumpId
                })
                .sort({
                    createdAt: -1
                }) // OR `.sort({ updatedAt: -1 })` to sort by last modification time
                .limit(count)
                .exec((error, data) => {
                    if (error) {
                        return reject(error)
                    }

                    let voltageList = new Array();
                    let currentList = new Array();
                    let powerList = new Array();
                    let opTempList = new Array();
                    let suTempList = new Array();
                    let waterBreakerList = new Array();
                    for (i = data.length - 1; i >= 0; i--) {
                        //Update Data Referencing from NEW JSON File
                        voltageList.push({ name: data[i].createdAt, voltage: data[i].data.loadVoltage })
                        currentList.push({ name: data[i].createdAt, current: data[i].data.loadCurrent })
                        powerList.push({ name: data[i].createdAt, power: data[i].data.power })
                        opTempList.push({ name: data[i].createdAt, opTemp: data[i].data.atmosphericTemperature })
                        suTempList.push({ name: data[i].createdAt, suTemp: data[i].data.solarPanelTemperature })
                        waterBreakerList.push({ name: data[i].createdAt, waterBreaker: data[i].data.waterBreakerFlag })
                    }
                    let response = [
                        voltageList,
                        currentList,
                        powerList,
                        opTempList,
                        suTempList,
                        waterBreakerList
                    ]
                    return resolve(response)
                });
        } catch (error) {
            console.log(error)
            return reject(error)
        }
    })
}

exports.getHistoryData = function (data) {
    return new Promise((resolve, reject) => {
        try {
            let userId = user_id;
            let {
                pumpId,
                from,
                to
            } = data
            udb['dataCollection'].find({
                    userId: userId,
                    "data.pumpId": pumpId,
                    //TODO: Check created At new format
                    createdAt: {
                        $lte: to,
                        $gte: from
                    }
                })
                .sort({
                    createdAt: -1
                })
                .exec((error, data) => {
                    if (error) {
                        return reject(error)
                    }
                    if (data.length <= 0) {
                        return resolve()
                    }
                    let voltageList = new Array();
                    let currentList = new Array();
                    let powerList = new Array();
                    let opTempList = new Array();
                    let suTempList = new Array();
                    let waterBreakerList = new Array();
                    let labels = new Array();
                    for (i = data.length - 1; i >= 0; i--) {
                        labels.push(i.toString())
                        //Update Data Referencing from NEW JSON File
                        voltageList.push(data[i].data.loadVoltage)
                        currentList.push(data[i].data.loadCurrent)
                        powerList.push(data[i].data.power)
                        opTempList.push(data[i].data.atmosphericTemperature)
                        suTempList.push(data[i].data.solarPanelTemperature)
                        waterBreakerList.push(data[i].data.waterBreakerFlag)
                    }
                    let response = [
                        voltageList,
                        currentList,
                        powerList,
                        opTempList,
                        suTempList,
                        waterBreakerList,
                        labels
                    ]
                    return resolve(response)
                })
        } catch (error) {
            console.log(error)
            return reject(error)
        }
    })
}

//wrappers

var find = exports.find = function (object, tableName) {
    return new Promise((resolve, reject) => {
        udb[tableName].find(object, (error, docs) => {
            if (error) {
                return reject(error)
            }
            return resolve(docs);
        })
    })
}

var insert = exports.insert = function (object, tableName) {
    return new Promise((resolve, reject) => {
        udb[tableName].insert(object, (error, newDoc) => {
            if (error) {
                return reject(error)
            }
            return resolve(newDoc);
        })
    })
}

// note this creates a new object with the same id as the one altered
var update = exports.update = function (query, updateModifier, options, tableName) {
    return new Promise((resolve, reject) => {
        udb[tableName].update(query, updateModifier, options, (error, numAffected, affectedDocuments, upsert) => {
            if (error) {
                return reject(error)
            }
            return resolve(numAffected, affectedDocuments, upsert);
        })
    })
}

var remove = exports.remove = function (query, options, tableName) {
    return new Promise((resolve, reject) => {
        udb[tableName].remove(query, options, (error, numRemoved) => {
            if (error) {
                return reject(error)
            }
            return resolve(numRemoved);
        })
    })
}

var findOne = exports.findOne = function (object, tableName) {
    return new Promise((resolve, reject) => {
        udb[tableName].findOne(object, (error, doc) => {
            if (error) {
                return reject(error)
            }
            return resolve(doc);
        })
    })
}

var count = exports.count = function (object, tableName) {
    return new Promise((resolve, reject) => {
        udb[tableName].count(object, (error, count) => {
            if (error) {
                return reject(error)
            }
            return resolve(count);
        })
    })
}

var storePasswordToken = exports.storePasswordToken = function(token, email) {
    return new Promise(async (resolve, reject) => {
        try{
        let data = {
            email: email,
            isValid: true,
        }
        
        let validTokens = await find(data, 'passwordTokens');
        if(validTokens.length > 0){
            await update({email: email}, {$set: {isValid: false}}, {multi: true}, 'passwordTokens')
        }
        data.token = token
        data.createdAt = Math.round((new Date()).getTime() / 1000);
        await insert(data, 'passwordTokens');
        return resolve()
        }catch(error){
            console.log('[ERROR]: ', error);
            return reject(error);
        }
    })
}

var checkPasswordToken = exports.checkPasswordToken = function(token, email) {
    return new Promise(async (resolve, reject) => {
        try{
            let isTokenValid = await find({token, email}, 'passwordTokens');
            if (isTokenValid.length === 0) {
                return resolve(false)
            }
            return resolve(true)
        }catch(error){
            return reject(error)
        }
    })
}

//Delete the password token at some point

var clearPasswordTokens = exports.clearPasswordTokens = function( email) {
    return new Promise(async (resolve, reject) => {
        try {
            let tokens = await find({email, isValid: true}, 'passwordTokens');
            if (tokens.length > 0) {
                await update({email: email}, {$set: {isValid: false}}, {multi: true}, 'passwordTokens')
            }
            return resolve()
        }catch(error) {
            return reject(error);
        }
    })
}

var getPasswordToken = exports.getPasswordToken = function(msg) {
    return new Promise(async (resolve,reject) => {
        try{
            let token = await find({email: msg.email, isValid: true}, 'passwordTokens');
            return resolve(token)
        }catch(error) {
            return reject(error)
        }
    })
}