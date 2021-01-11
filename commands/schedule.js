const schedule = require('node-schedule');
const cf = require('../components/commonFunctions.js');

module.exports = {
	name: 'schedule',
	description: 'To test scheduling.',
	execute(message, args) {
		if (!message.member.roles.has(cf.readDataFile('data').roles.admin)) return;

		message.channel.send("Theorically scheduled.");

		schedule.scheduleJob('*/5 * * * *', () => {
			message.channel.send("It's " + new Date());
		});
	},
};