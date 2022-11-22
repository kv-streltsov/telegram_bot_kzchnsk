//const downloadFile = require('./my_modules/downloadFile.cjs')
const getRide = require('./vk/getRide.cjs')
const getWeather = require('./weather/weather.cjs')
const insertPerson = require('./db/db')

const TelegramBot = require('node-telegram-bot-api');
const token = '5682061618:AAHLpwrPjtQw1ZBCuDC8fAjjHmmcDK4JWDE';
const bot = new TelegramBot(token, { polling: true });

let promisDataRide = getRide()
let weatherPromis  = getWeather()


setInterval(() => {
    promisDataRide = getRide()
}, 50000);

setInterval(() => {
    weatherPromis = getWeather()
}, 1800000);



bot.setMyCommands([
    { command: '/info',    description: 'out info' },
    { command: '/ride',    description: 'Найти попутки' },
    { command: '/weather', description: 'Погода'},
])


bot.on('message', msg => {
    const id = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        insertPerson(msg.from)

        let text = 'Привет!' + '\n' + 
                   'Это бот, который ищет попутки из/в с. Казачинское' + '\n' +
                   'Функционал, вероятно, будет расширяться' + '\n' +
                   'Вопросы и предложения - @strkir'
        bot.sendMessage(id, text,
        {disable_web_page_preview:true})}

    if (text === '/info') {
       let text = 'Бот, который ищет попутки из/в с. Казачинское' + '\n' +
                   'Функционал, вероятно, будет расширяться' + '\n' +
                   'Вопросы и предложения - @strkir'
        bot.sendMessage(id, text,
            {disable_web_page_preview:true})}

    if (text === '/weather') {
        weatherPromis.then(data=>{
            let text = ('Температура:  '   + data.temp                    + '\n' +
                       'Скорость ветра: ' + data.wind_speed + ' м/с'     + '\n' +
                       'Давление: ' + data.pressure_mm + ' мм рт. ст.' + '\n' +
                       data.condition)
            bot.sendMessage(id, text)})}

    if (text === '/ride') {
        let stickerId = 'CAACAgIAAxkBAAEGZvBjcJVpuKLB6JYqG0ryrjT_jnn4BAACTQADrWW8FPa2bPRlMeYaKwQ'
        bot.sendMessage(id,'Один момент...')
        setTimeout(() => { bot.sendSticker(id,stickerId)}, 500);
        
        setTimeout(()=>{
            promisDataRide.then(value=>{

                let data = new Array
                data.push(value);
        
                for (let index = 0; index < data[0].length; index++) {
                    let text = data[0][index].text + 
                        '\n' + '\n' + 
                        data[0][index].date + 
                        '\n' + 'https://vk.com/' + 
                        data[0][index].signer
        
                        bot.sendMessage(id,text,
                            {disable_web_page_preview: true})
                    }
                })
        },3000)
        
    }
})
bot.on("polling_error", (msg) => console.log(msg));
