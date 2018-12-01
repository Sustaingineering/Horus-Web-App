const Datastore = require('nedb');
const _ = require('lodash');

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
    return new Promise((resolve, reject) => {
        try {

        } catch (error) {

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

exports.logOut = function () {
    return new Promise(async (resolve, reject) => {
        try {
            let loggedOutSession = await update({
                session: true,
                userId: user_id
            }, {
                $set: {
                    session: false,
                    session_expire: undefined
                }
            }, {
                multi: true
            }, 'userSettings')
            clearUserData();
            return resolve(true);
        } catch (error) {
            return reject(error);
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

//TODO: Check
exports.loginUser = function(userName, password, isRemember) {
    return new Promise(async (resolve, reject) => {
        try {    
            let user;
            var validator = require("email-validator");
            if(validator.validate(userName)) {
                user = await find({ email: userName, password: password }, 'userInfo');
                if (user.length === 0) {
                    return reject('Incorrect email or password');
                }
            }
            else {
                user = await find({ username: userName, password: password }, 'userInfo');
                if(user.length === 0) {
                    return reject('Incorrect username or password');
                }
            }
            user_id = user[0]._id;

            const setting = await find({
                userId: user_id
            }, 'userSettings')
            const uSettDoc = {
                userId: user[0]._id,
                isRemembered: isRemember,
                session: true,
                session_expire: Math.round((new Date()).getTime() / 1000) + 86400
            }
            if (setting.length === 0) {
                uSettDoc.created_at = Math.round((new Date()).getTime() / 1000);

                udb.userSettings.insert(uSettDoc, (error, newDoc) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(true);
                });
            } else {
                uSettDoc.updated_at = Math.round((new Date()).getTime() / 1000);

                udb.userSettings.update(setting[0], uSettDoc, {}, (error, settingReplaced) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(true)
                })
            }

        } catch (error) {
            if (error) {
                return reject(error)
            }
        }
    })
}

exports.newUser = function (msg) {
    return new Promise(async (resolve, reject) => {
        try {
            // Document object declaration
            var uInfoDoc = {
                email: msg.email,
                password: msg.password,
                username: msg.username,
                organization: msg.organization,
                created_at: Math.round((new Date()).getTime() / 1000),
            };
            // Insert document into database
            let newDoc = await insert(uInfoDoc, "userInfo")
            return resolve();
        } catch (error) {
            console.log(error)
            return reject(error)
        }
    })
}

//TODO: Check
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

exports.storeSensorData = function (data) {
    return new Promise(async (resolve, reject) => {
        try {
            data.createdAt = Math.round(new Date().getTime() / 1000);
            data.userId = user_id;
            let newDoc = await insert(data, "dataCollection");

            return resolve()
        } catch (error) {
            console.log(`error: ${error}`);
            return reject(error);
        }
    })
}

var addSensor = exports.addSensor = function (sensorId) {

}

exports.getSummaryData = function (pumpId) {
    return new Promise((resolve, reject) => {
        try {
            let userId = user_id;
            udb['dataCollection']
                .findOne({
                    userId: userId,
                    pumpId: pumpId
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

exports.getRealTime = function (data) {
    return new Promise((resolve, reject) => {
        try {
            let userId = user_id;
            let pumpId = data.pumpId;
            let count = 5
            udb['dataCollection']
                .find({
                    userId: userId,
                    pumpId: pumpId
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
                        voltageList.push(data[i].voltage)
                        currentList.push(data[i].current)
                        powerList.push(data[i].power)
                        opTempList.push(data[i].opTemp)
                        suTempList.push(data[i].suTemp)
                        waterBreakerList.push(data[i].waterBreaker)
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
                    pumpId: pumpId,
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
                        voltageList.push(data[i].voltage)
                        currentList.push(data[i].current)
                        powerList.push(data[i].power)
                        opTempList.push(data[i].opTemp)
                        suTempList.push(data[i].suTemp)
                        waterBreakerList.push(data[i].waterBreaker)
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