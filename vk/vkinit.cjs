//Инициализируем подключение к вк
const logFnc = require('../log/log')
const easyvk = require('easyvk');
const path = require('path');
const user = require('../login')



module.exports = function easyvkInit() {

    try {

        return new Promise((resolve, reject) => {

            easyvk({

                username: user.vk.login,
                password: user.vk.pass,
                sessionFile: path.join(__dirname, '.my-session')
            })
                .then(async vk => {
                    logFnc('VK INIT SUCCESS')
                    resolve(vk)
                })
                .catch(error => {
                    logFnc(`VK INIT ERROR ${error.error_msg}`)
                })
        })
    }

    catch (error) {
        logFnc('VK INIT error')
    }


}
