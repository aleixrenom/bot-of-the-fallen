const cf = require('../components/commonFunctions.js');
const weather = require('../components/weather.js');
const Discord = require('discord.js');

module.exports = {
	name: 'ws',
	description: 'Perform various tasks related to the scheduling of weather.',
	rollWeather() {
		// get and save the data file
		let data = cf.readDataFile('data');

		if (data.weatherSchedule.status === "off") return;

		// if it is on, create an embed with the forecast info in the data file
		const todayWeatherEmbed = new Discord.RichEmbed()
		.setTitle(data.weatherSchedule.type)
		.addField('Temperature', data.weatherSchedule.temperature)
		.addField('Lightning', data.weatherSchedule.lightning)
		.addField('Winds', data.weatherSchedule.winds)
		.setThumbnail(data.weatherSchedule.image)
		.setColor(data.weatherSchedule.color);

		// post it in the weather channel
		cf.client.channels.get(data.weatherSchedule.weatherChannel).send(todayWeatherEmbed);

		// roll a new weather
		const rolledWeather = weather.getCurrentSeason().roll(); // this is an object with weather values

		// save the new values to the data object
		data.weatherSchedule.type = rolledWeather.type;
		data.weatherSchedule.temperature = rolledWeather.temperature;
		data.weatherSchedule.lightning = rolledWeather.lightning;
		data.weatherSchedule.winds = rolledWeather.winds;
		data.weatherSchedule.image = rolledWeather.image;
		data.weatherSchedule.color = rolledWeather.color;

		// create an embed with the newly rolled weather values
		const tomorrowWeatherEmbed = new Discord.RichEmbed()
		.setTitle(rolledWeather.type)
		.addField('Temperature', rolledWeather.temperature)
		.addField('Lightning', rolledWeather.lightning)
		.addField('Winds', rolledWeather.winds)
		.setThumbnail(rolledWeather.image)
		.setColor(rolledWeather.color);

		// post it into the weather channel
		cf.client.channels.get(data.weatherSchedule.forecastChannel).send("**Next weather:**");
		cf.client.channels.get(data.weatherSchedule.forecastChannel).send(tomorrowWeatherEmbed);
		// if (rolledWeather.type === "Something's different...") {
		// 	cf.client.channels.get(data.weatherSchedule.forecastChannel).send("@Admin");
		// }

		// save the new values to the data file
		cf.writeDataFile(data,'data');
	},
	execute(message, args) {
		// if (!message.member.roles.has(cf.readDataFile('data').roles.admin)
		// && !message.member.roles.has(cf.readDataFile('data').roles.weatherman)) return;

		switch (args[0]) {
			case "forceRoll":
				if (!message.member.roles.has(cf.readDataFile('data').roles.admin)) {
					message.channel.send("This command is only avaliable to Admins.");
					return;
				} else {
					if (cf.readDataFile('data').weatherSchedule.status === "off") {
						message.channel.send("The weather scheduling is turned off.");
						return;
					}
					this.rollWeather();
				}
				break;
      case "unprotectedforceroll":
          this.rollWeather();
          message.delete().then().catch(console.error);
        break;
			case "on":
				try {
					let data = cf.readDataFile('data');

					if (data.weatherSchedule.status === "on") {
						message.channel.send("The scheduling is already on.");
						return;
					}

					data.weatherSchedule.status = "on";
					cf.writeDataFile(data,'data');

					message.channel.send("Scheduling turned on.")
				} catch(err) {
					message.channel.send("There was an error turning the scheduling on.");
					console.log("There was an error turning the scheduling on: " + err);
				}
				break;
			case "off":
				try {
					let data = cf.readDataFile('data');

					if (data.weatherSchedule.status === "off") {
						message.channel.send("The scheduling is already off.");
						return;
					}

					data.weatherSchedule.status = "off";
					cf.writeDataFile(data,'data');

					message.channel.send("Scheduling turned off.")
				} catch(err) {
					message.channel.send("There was an error turning the scheduling off.");
					console.log("There was an error turning the scheduling off: " + err);
				}
				break;
			case "status":
				try {
					message.channel.send("The weather scheduling is " + cf.readDataFile('data').weatherSchedule.status + ".");
				} catch(err) {
					message.channel.send("There was an error checking the scheduling status.");
					console.log("There was an error checking the scheduling status: " + err);
				}
				break;
			default:
				message.channel.send("Avaliable arguments: forceRoll (admin), on, off, status.");
				break;
		}
	}
}