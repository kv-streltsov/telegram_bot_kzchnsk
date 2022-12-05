const insertPerson = require('./db/db')
const easyvkInit = require('./vk/vkinit.cjs')
const getWeather = require('./weather/weather.cjs')
const getRide = require('./vk/getRide.cjs')
const user = require('./login')

const TelegramBot = require('node-telegram-bot-api');
const token = user.telegram_token;
const bot = new TelegramBot(token, { polling: true });

const vk = easyvkInit()


let stickerId = 'CAACAgIAAxkBAAEGZvBjcJVpuKLB6JYqG0ryrjT_jnn4BAACTQADrWW8FPa2bPRlMeYaKwQ' //стикер дорога, потос делать список и рандомный выбор перед отправкой 
let promisDataRide = getRide(vk) // получаем попутки при старте бота
let weatherPromis = getWeather() // получаем погоду при старте бота

let count_callback_query = 0
//обработка кнопки для показа попуток енисейкск-красноярск
bot.on('callback_query', query => {
    let id = query.message.chat.id
    if (count_callback_query == 1) {

        count_callback_query = 0
        promisDataRide.then(value => {

            let data = new Array
            data.push(value.ens);

            for (let index = 0; index < data[0].length; index++) {
                let text = data[0][index].text +
                    '\n' + '\n' +
                    data[0][index].date +
                    '\n' + 'https://vk.com/' +
                    data[0][index].signer

                bot.sendMessage(id, text,
                    { disable_web_page_preview: true })
            }

        })
    }



})


//кнопка
const opts = {
    "reply_markup": {
        "inline_keyboard": [[
            {
                "text": "Вперед!  🚗",
                "callback_data": "A1"
            }]
        ]
    }
}



// с интервалом обновляем данные попуток и погоды
setInterval(() => {
    promisDataRide = getRide(vk)
}, 1000 * 60 * 5);

setInterval(() => {
    weatherPromis = getWeather()
}, 1000 * 60 * 30);


// команды бота
bot.setMyCommands([
    { command: '/info', description: 'out info' },
    { command: '/ride', description: 'Найти попутки' },
    { command: '/weather', description: 'Погода' },
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
            { disable_web_page_preview: true })
    }

    if (text === '/info') {
        let text = 'Бот, который ищет попутки из/в с. Казачинское' + '\n' +
            'Функционал, вероятно, будет расширяться' + '\n' +
            'Вопросы и предложения - @strkir'
        bot.sendMessage(id, text,
            { disable_web_page_preview: true })
    }

    if (text === '/weather') {
        weatherPromis.then(data => {
            let text = ('Температура:  ' + data.temp + '\n' +
                'Скорость ветра: ' + data.wind_speed + ' м/с' + '\n' +
                'Давление: ' + data.pressure_mm + ' мм рт. ст.' + '\n' +
                data.condition)
            bot.sendMessage(id, text)
        })
    }

    if (text === '/ride') {

        count_callback_query = 1
        bot.sendMessage(id, 'Один момент...')
        setTimeout(() => { bot.sendSticker(id, stickerId) }, 500);

        setTimeout(() => {

            promisDataRide.then(value => {

                let data = new Array
                if (!value.kzc.length) {
                    data.push(value.ens);

                    for (let index = 0; index < data[0].length; index++) {
                        let text = data[0][index].text +
                            '\n' + '\n' +
                            data[0][index].date +
                            '\n' + 'https://vk.com/' +
                            data[0][index].signer

                        bot.sendMessage(id, text,
                            { disable_web_page_preview: true })
                    }
                    return
                }
                data.push(value.kzc);

                for (let index = 0; index < data[0].length; index++) {
                    let text = data[0][index].text +
                        '\n' + '\n' +
                        data[0][index].date +
                        '\n' + 'https://vk.com/' +
                        data[0][index].signer

                    bot.sendMessage(id, text,
                        { disable_web_page_preview: true })
                }

                setTimeout(() => {
                    count_callback_query
                    bot.sendMessage(id, 'Показать еще?', opts);
                }, 1500);
            })


        }, 3000)



    }
})


bot.on("polling_error", (msg) => console.log(msg));
