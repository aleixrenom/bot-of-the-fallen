const cf = require('../components/commonFunctions.js');

module.exports = {
	name: 'say',
	execute(message, args) {
		if (!message.member.roles.has(cf.readDataFile('data').roles.admin)) return;

		let channelToMessage = message.client.channels.get("591479902033674263");
		let messageToSend = "";

		for (let i of args) {
			messageToSend += i + " ";
		}

		channelToMessage.send(messageToSend);
		message.delete().then().catch(console.error);
	},
};