const Discord = require('discord.js');
const cf = require('../components/commonFunctions.js');

module.exports = {
	name: 'embed',
	description: 'For testing embeds.',
	execute(message, args) {
		if (!message.member.roles.has(cf.readDataFile('data').roles.admin)) return;

		let embed = new Discord.RichEmbed() // not closing because we're literally continuing in the next line
			.setTitle("Embed test")
			.setTimestamp()
			.addField("Your name", message.author.username)
			.addField("Whatever", "dsa")
			.setColor(0xF1C40F)
			.setThumbnail("https://puu.sh/EM0T1/556237f631.png");

		message.channel.send(embed);
	},
};