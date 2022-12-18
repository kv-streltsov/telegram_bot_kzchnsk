module.exports = async function sens_weather(id, bot, weatherPromis){

	weatherPromis.then(data => {

            let text = (
				'Температура:  ' + data.temp + '\n' +
                'Скорость ветра: ' + data.wind_speed + ' м/с' + '\n' +
                'Давление: ' + data.pressure_mm + ' мм рт. ст.' + '\n' +
                data.condition
            )

            bot.sendMessage(id, text)
        })

}

