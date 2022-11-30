const dateConverter = require('./dateConvert.cjs')


let check_list = [
    'красноярск-казачинское.',
    'казачинское-красноярск.',
    'казачинское-красноярск',
    'казачинск',
    'красноярск',
    'казачинское-',
    '-казачинское',
    'завтра',
    'еду']

let check_list_exc = [
    'прода',
    'куплю',
    'занятия',
    'учим',
    'коррекция',
    'подарок',
    'модели',
    'мвд',
    'познакомиться',
    'бровей',
    'снимаю',
    'одежд',
    'услуги',
    'массаж',
    'животны',
    'хозяе',
    'сдам',
    'аренда',
    'квартир']



function filterWall(post,id){

    let post_list_kzc = []
    let post_list_ens = []
    switch (id) {

        //filter kzc.
        case -170319700:
            post.items.forEach(element => {
                //проверка по ключевым словам в массивах check_list\check_list_exc      
            
                const even = (i) =>  element.text.toLowerCase().indexOf(i) != -1;
                        if (check_list.some(even) && !check_list_exc.some(even)) {
                                
                                //берем посты за последние 2 суток
                                let today_date = new Date();
                                let post_date = new Date(element.date * 1000);
                                
                                if (today_date - post_date < 129600000) {
                                    post_list_kzc.push(element)
                                }
                        }
                })
                //фильтруем уникальные значения (сделать отдельную функцию и понять как это работает)
                let post_kcz = post_list_kzc.reduce((acc, city) => {
                    if (acc.map[city.text]) // если данный город уже был
                      return acc; // ничего не делаем, возвращаем уже собранное
                
                    acc.map[city.text] = true; // помечаем город, как обработанный
                    acc.cities.push(city); // добавляем объект в массив городов
                    return acc; // возвращаем собранное
                  }, {
                    map: {}, // здесь будут отмечаться обработанные города
                    cities: [] // здесь конечный массив уникальных городов
                  })
                  .cities; // получаем конечный массив
                
                return post_kcz         
            
        //filter ens.
        case -42383055:
            post.items.forEach(element => {
                //проверка по ключевым словам в массивах check_list\check_list_exc      
            
                const even = (i) =>  element.text.toLowerCase().indexOf(i) != -1;
                        if (check_list.some(even) && !check_list_exc.some(even)) {
                                
                                //берем посты сегодня
                                let today_date = new Date();
                                let post_data = dateConverter(element.date)
                                
                                if(today_date.getDate() == post_data.split('.')[0]){
                                    post_list_ens.push(element)
                                }
                        }
                })
                //фильтруем уникальные значения 
                let post_ens = post_list_ens.reduce((acc, city) => {
                    if (acc.map[city.text]) // если данный город уже был
                      return acc; // ничего не делаем, возвращаем уже собранное
                
                    acc.map[city.text] = true; // помечаем город, как обработанный
                    acc.cities.push(city); // добавляем объект в массив городов
                    return acc; // возвращаем собранное
                  }, {
                    map: {}, // здесь будут отмечаться обработанные города
                    cities: [] // здесь конечный массив уникальных городов
                  })
                  .cities; // получаем конечный массив
                
                return post_ens   



    }
}
           
module.exports = filterWall;