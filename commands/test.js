const Discord = require('discord.js');
const cf = require('../components/commonFunctions.js');
const scheduling = require('../components/scheduling.js');

module.exports = {
	name: 't',
	description: 'To test anything quickly.',
	execute(message, args) {
		if (!message.member.roles.has(cf.readDataFile('data').roles.admin)) return;
		
		let rollText = "";
		args.forEach(element => {
			rollText = rollText + element + " ";
		});
		const toSend = rollText.trim();

		// cf.roll(toSend);
		message.channel.send(cf.roll(toSend));

		// const resultsArray = d20.verboseRoll(toSend);
		// let result = "";
		// resultsArray.forEach(element => {
		// 	result = result + element + " "
		// })
		// message.channel.send(result);
		
	},
};