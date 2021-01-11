const cf = require('../components/commonFunctions.js');

module.exports = {
	name: 'mine',
	description: 'Mining lazyness',
	execute(message, args) {
		if (!message.member.roles.has(cf.readDataFile('data').roles.admin)) return;

		// message.channel.send('<@' + message.author.id + '>  :pick:\n/r 2d20kh1+5\n/r 2d4+3 iron\n/r 1d4-1 mithrill');
		message.channel.send('`Here are your mining rolls, sir:`\n/r 2d20kh1+5\n/r 2d4+3 iron\n/r 1d4-1 mithrill');
		message.delete().then().catch(console.error);
	},
};