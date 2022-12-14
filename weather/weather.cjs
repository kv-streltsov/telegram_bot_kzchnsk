const logFnc = require('../log/log')
const user = require('../login')
let url = 'https://api.weather.yandex.ru/v2/informers?lat=57.695769&lon=93.275490&lang=ru_RU'

// нужно этот  обьект в отдельнгый файлик и сделать отпраку картинки по типу погоды допилить
let condition_obj = {
    'clear': 'ясно',
    'partly-cloudy': 'малооблачно',
    'cloudy': 'облачно с прояснениями',
    'overcast': 'пасмурно',
    'drizzle': 'морось',
    'light-rain': 'небольшой дождь',
    'rain': 'дождь',
    'moderate-rain': 'умеренно сильный дождь',
    'heavy-rain': 'сильный дождь',
    'continuous-heavy-rain': 'длительный сильный дождь',
    'showers': 'ливень',
    'wet-snow': 'дождь со снегом',
    'light-snow': 'небольшой снег',
    'snow': 'снег',
    'snow-showers': 'снегопад',
    'hail': 'град',
    'thunderstorm ': 'гроза',
    'thunderstorm-with-rain': 'дождь с грозой',
    'thunderstorm-with-hail': 'гроза с градом',
}


module.exports = function getWeather() {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'X-Yandex-API-Key': user.yandex_token
            }
        }).then(resp => resp.json()).then(res => {
            if (res.message == 'forbidden') return logFnc(`WEATHER ERROR ${res.message}`)
            try {
                let weather = {
                    'temp': res.fact.temp,
                    'wind_speed': res.fact.wind_speed,
                    'pressure_mm': res.fact.pressure_mm,
                    'condition': condition_obj[res.fact.condition]
                }
                logFnc('GET WEATHER SUCCES')
                resolve(weather)
            }
            catch (error) { logFnc('GET WEATHER ERROR') }

        })
    })
}