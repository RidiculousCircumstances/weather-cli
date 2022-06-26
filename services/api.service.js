import axios from 'axios';
import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';



const getWeather = async () => {

    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    const city = await getKeyValue(TOKEN_DICTIONARY.city);

    if (!token) {
        throw new Error('Не задан ключ API, задайте ключ через команду -t [API_KEY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric',
        }
    });

    return data;

};

export { getWeather };