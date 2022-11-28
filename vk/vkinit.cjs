//Инициализируем подключение к вк

const easyvk = require('easyvk');
const path = require('path');
const user = require('../login')



function easyvkInit(){
    return new Promise((resolve, reject) => {
        easyvk({
            username: user.vk.login,
            password: user.vk.pass,
            sessionFile: path.join(__dirname, '.my-session')
        })
        .then(async vk => {
            resolve(vk)
        })
    })
   
}

module.exports = easyvkInit;