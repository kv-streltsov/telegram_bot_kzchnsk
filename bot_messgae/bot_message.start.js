const insertPerson = require('../db/db')

module.exports = async function send_start(id,bot,msg){
	    insertPerson(msg.from) //добавляем новго юзера в бд

        let user_name = 'new user @' + msg.from.username //получаю логин нового юзера
        bot.sendMessage(537471370, user_name)// отправляю себе в лс нейм нового юзера

        let text = 'Привет!' + '\n' +
            'Это бот, который ищет попутки из/в с. Казачинское' + '\n' +
            'Функционал, вероятно, будет расширяться' + '\n' +
            'Вопросы и предложения - @strkir'

        bot.sendMessage(id, text,{ disable_web_page_preview: true })
}