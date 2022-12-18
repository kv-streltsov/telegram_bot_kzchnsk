const fs = require("fs")

module.exports = function logFnc(data) {

    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hours = date.getHours() - 2;
    let minutes = date.getMinutes();

    let logDate = `${day}.${month} ${hours}.${minutes}====${data}\n`
    fs.appendFileSync(__dirname + '/' + 'log.log', logDate)
}
