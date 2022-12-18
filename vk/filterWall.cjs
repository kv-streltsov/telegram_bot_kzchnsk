const dateConverter = require('./dateConvert.cjs')

function dateAndCheckListFilter(hour,post){
  let post_list = []
    post.items.forEach(element => {
    //проверка по ключевым словам в массивах check_list\check_list_exc    
    const even = (i) => element.text.toLowerCase().indexOf(i) != -1;
        if (check_list.some(even) && !check_list_exc.some(even)) {

            //и проверка по дате
            let today_date = new Date();
            let post_date = new Date(element.date * 1000);
            if (today_date - post_date < 3600000 * hour) {post_list.push(element)}
        }
    })
    return post_list
}

function sortUniqueness(post_list){
      let post_list_sort = post_list.reduce((acc,value)=>{
          if (!acc.find(v => v.text == value.text)) {acc.push(value);}
          return acc;
      }, [])
      return post_list_sort
}

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
  'ремонт',
  'куплю',
  'сниму',
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
  'квартир',
  'вступить',
  'групп',
  'ресниц',
  'строитель',
  'мужск',
  'женск',
  'валенки',
  'пояса',
  'оптика',
  'зрение']


module.exports = function filterWall(post, id) {

  let post_list_kzc = []
  let post_list_ens = []

  switch (id) {

    //filter kzc.
    case -170319700:

      post_list_kzc = dateAndCheckListFilter(36, post)
      const post_kzc = sortUniqueness(post_list_kzc)

      return post_kzc

    //filter ens.
    case -42383055:

      const post_list_ens = dateAndCheckListFilter(18, post)
      const post_ens = sortUniqueness(post_list_ens)

      return post_ens

  }
}