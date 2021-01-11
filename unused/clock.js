const moment = require('moment');
const Window = require('window');
const window = new Window();
let clockChannel;
let interval;
const cf = require('../components/commonFunctions.js');

module.exports = {
	name: 'clock',
	execute(message, args) {
		if (!message.member.roles.has(cf.readDataFile().roles.admin)) return;

		if (clockChannel) {
			clockChannel.delete()
				.then(console.log("Clock deleted at " + new Date()))
				.catch(console.error);
			clockChannel = "";
			window.clearInterval(interval);
		} else {
			clock(message);
		}
	},
};

function clock(message) {	
	
	message.guild.createChannel(makeDate(), {
		type: 'voice',
		permissionOverwrites: [
			{
				id: message.guild.defaultRole,
				deny: ['CONNECT'],
			},
		],
	})
		.then(returnedChannel => { clockChannel = message.client.channels.get(returnedChannel.id); })
		.catch(error => { console.log(error); });

	interval = window.setInterval(()=>{
		clockChannel.setName(makeDate());
	}, 60000);

}

function makeDate() {
	let month = moment().format("MMM");
	let day = moment().format("Do");
	let time = moment().format('LT');

	return month + " " + day + " " + time;
}