const datastore = require('../datastore');

//TODO: Check
var loginUser = exports.loginUser = function(userName, password, isRemember) {
    return new Promise(async (resolve, reject) => {
        try {    
            let user;
            var validator = require("email-validator");
            if(validator.validate(userName)) {
                user = await datastore.find({ email: userName, password: password }, 'userInfo');
                if (user.length === 0) {
                    return reject('Incorrect email or password');
                }
            }
            else {
                user = await datastore.find({ username: userName, password: password }, 'userInfo');
                if(user.length === 0) {
                    return reject('Incorrect username or password');
                }
            }
            user_id = user[0]._id;

            const setting = await datastore.find({
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

var logOut = exports.logOut = function () {
    return new Promise(async (resolve, reject) => {
        try {
            let loggedOutSession = await datastore.update({
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