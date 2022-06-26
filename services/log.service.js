import chalk from 'chalk';
import dedent from 'dedent-js';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const printError = (err) => {
    console.log(chalk.bgRed(`Error occured: `), err);
};

const printSuccess = (msg) => {
    console.log(chalk.bgGreen.black(`Success: `), msg);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgMagenta.black(' HELP ')}
        Без параметров - вывод погоды,
        -h - помощь,
        -s - [CITY] установить город
        -t - [API Key] сохранить токен
        `   
    );
};

const printWeather = (data, icon) => {
    console.log(
        dedent`${chalk.bgGray.black(' WEATHER ')}
        Погода в городе ${data.name}: 
        ${data.weather[0].description}  ${icon}${icon}${icon}
        Температура: ${data.main.temp}, ощущается как ${data.main.feels_like}
        Ветер: ${data.wind.speed} м/с
        Влажность воздуха: ${data.main.humidity} %
        `
    );
};

export { printError, printSuccess, printHelp, printWeather, getIcon };