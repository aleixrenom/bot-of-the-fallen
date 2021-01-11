const cf = require('../components/commonFunctions.js');

module.exports = {
	name: 'cname',
	execute(message, args) {
		if (!message.member.roles.has(cf.readDataFile('data').roles.staff)) return;

		let newChannelName = "";

		for (let i of args) {
			newChannelName += i + " ";
		}

		message.channel.setName(newChannelName)
		.then()
		.catch(console.error);

		message.delete().then().catch(console.error);
	},
};