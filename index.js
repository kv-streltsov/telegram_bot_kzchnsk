const easyvkInit = require('./vk/vkinit.cjs')
const getWeather = require('./weather/weather.cjs')
const getRide = require('./vk/getRide.cjs')
const user = require('./login')

const send_info = require('./bot_messgae/bot_message.info')
const send_ride = require('./bot_messgae/bot_message.ride')
const send_start = require('./bot_messgae/bot_message.start')
const send_weather = require('./bot_messgae/bot_message.weather')


const TelegramBot = require('node-telegram-bot-api');
const token = user.telegram_token;
const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
    { command: '/info', description: 'out info' },
    { command: '/ride', description: 'Найти попутки' },
    { command: '/weather', description: 'Погода' },
])

const vk = easyvkInit()

// получаем попутки при старте бота
let promisDataRide
vk.then(data => {
    console.log(data.params)
    promisDataRide = getRide(vk)
})

let weatherPromis = getWeather() // получаем погоду при старте бота

// с интервалом обновляем данные попуток и погоды
setInterval(() => { promisDataRide = getRide(vk) }, 1000 * 60 * 5);
setInterval(() => { weatherPromis = getWeather() }, 1000 * 60 * 30);


// команды бота


bot.on('message', msg => {
    const id = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {send_start(id,bot,msg)}

    if (text === '/info') {send_info(id, bot)}

    if (text === '/weather') {send_weather(id, bot, weatherPromis)}

    if (text === '/ride') {send_ride(id,bot,promisDataRide)}

})

bot.on("polling_error", (msg) => console.log(msg));
