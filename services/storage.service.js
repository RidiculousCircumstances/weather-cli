
import { homedir } from 'os';
import path, { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weatherData.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
}

const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
};

const isExist = async (file) => {

    try {
        await promises.stat(file);
        return true;
    } catch (e) {
        return false;
    }
};



export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };