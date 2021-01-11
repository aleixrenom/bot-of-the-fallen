const cf = require('../components/commonFunctions.js');
const weather = require('../components/weather.js');
const Discord = require('discord.js');

module.exports = {
	name: 'wr',
	description: 'Roll weather depending on the season and show it in the current channel.',
	execute(message, args) {
		if (!message.member.roles.has(cf.readDataFile('data').roles.admin)
			&& !message.member.roles.has(cf.readDataFile('data').roles.weatherman)) return;

		const rolledWeather = weather.getCurrentSeason().roll(); // this is an object with weather values
		const embed = new Discord.RichEmbed()
			.setTitle(rolledWeather.type)
			.addField('Temperature', rolledWeather.temperature)
			.addField('Lightning', rolledWeather.lightning)
			.addField('Winds', rolledWeather.winds)
			.setThumbnail(rolledWeather.image)
			.setColor(rolledWeather.color);
		
		message.channel.send(embed);
		message.delete().then().catch(console.error);
	},
};