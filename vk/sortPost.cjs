let check_list = [
    'красноярск-казачинское.',
    'казачинское-красноярск.',
    'казачинское-красноярск',
    'казачинское',
    'красноярска',
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
    'аренда']


function sortPost(post){
    let post_list = []
    post.items.forEach(element => {
    //проверка по ключевым словам в массивах check_list\check_list_exc      

    const even = (i) =>  element.text.toLowerCase().indexOf(i) != -1;
            if (check_list.some(even) && !check_list_exc.some(even)) {
                    
                    //берем посты за последние 2 суток
                    let today_date = new Date();
                    let post_date = new Date(element.date * 1000);
                    
                    if (today_date - post_date < 129600000) {
                            post_list.push(element)}
            }
    })
    return post_list
}
           
module.exports = sortPost;