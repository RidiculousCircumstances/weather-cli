#!/usr/bin/env node

import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js';
import * as logService from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {

    if (!token.length) {
        logService.printError('Передано пустое значение токена');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        logService.printSuccess('Токен сохранен');
    } catch (e) {
        logService.printError(e.message);
    }
 
};

const saveCity = async (city) => {
    if (!city.length) {
        logService.printError('Передано пустое значение города');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        logService.printSuccess('Город сохранен');
    } catch (e) {
        logService.printError(e.message);
    }
};

const getForecast = async () => {

    try {
        const result = await getWeather(); 
        logService.printWeather(result, logService.getIcon(result.weather[0].icon));
    } catch (e) {
        if (e?.response?.status == 404) {
            logService.printError(`Такой город не найден. Уточните город, используя команду -s`);
        } else if (e?.response?.status == 401) {
                logService.printError(`Неверно указан токен. Уточните токен, используя команду -t`);
        } else {
            logService.printError(e.message);
        }
    }

};

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        logService.printHelp();
        return;
    };

    if (args.s) {
        return saveCity(args.s);
    };

    if (args.t) {
        return saveToken(args.t);
    };

    return getForecast();
};

initCLI();