module.exports = async function send_info(id, bot){
	let text = 'Бот, который ищет попутки из/в с. Казачинское' + '\n' +
            'Функционал, вероятно, будет расширяться' + '\n' +
            'Вопросы и предложения - @strkir'

        bot.sendMessage(id, text,
            { disable_web_page_preview: true })
}