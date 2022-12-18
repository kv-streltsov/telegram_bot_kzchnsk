const opts = require('./bot_message.keyboard')

module.exports = async function send_ride(id,bot,promisDataRide){
		
	function prepating_and_send_message(data) {

		for (let index = 0; index < data[0].length; index++) {
					let text = data[0][index].text +
						'\n' + '\n' +
						data[0][index].date +
						'\n' + 'https://vk.com/' +
						data[0][index].signer

					bot.sendMessage(id, text, { disable_web_page_preview: true })
				}
	}

	bot.on('callback_query',query => {
		if(!count_callback_query) return //проверяем нажималась ли кнопка

		count_callback_query = false // что бы не нажали кнопку второй раз
		prepating_and_send_message(data_ens)
	})

	
	let data_ens 
	let data_kzc
	
	let count_callback_query = false //проверка нажатия на инлайн конопку 
	let stickerId = 'CAACAgIAAxkBAAEGZvBjcJVpuKLB6JYqG0ryrjT_jnn4BAACTQADrWW8FPa2bPRlMeYaKwQ' //стикер дорога, потом делать список и рандомный выбор перед отправкой 

	bot.sendMessage(id, 'Один момент...')
	setTimeout(async() => { bot.sendSticker(id, stickerId) }, 500);

	setTimeout(() => {
		promisDataRide.then(value => {

			data_ens = new Array(value.ens)
			data_kzc = new Array(value.kzc)

			//если в каз группе постов нет сразу выдаем енисейск
			if (!value.kzc.length) {
				prepating_and_send_message(data_ens)
				return
			}

			prepating_and_send_message(data_kzc)

			setTimeout(() => {
				count_callback_query = true
				bot.sendMessage(id, 'Показать еще?', opts);
			}, 1500);
		})
	}, 3000)
}