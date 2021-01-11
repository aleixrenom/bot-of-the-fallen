/*

*/

// #region requirements
const fs = require('fs');
const Discord = require('discord.js');
const moment = require('moment-timezone');
const cf = require('./components/commonFunctions.js');
const Weather = require('./components/weather.js');
const scheduling = require('./components/scheduling.js');

cf.client = new Discord.Client();
cf.client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	cf.client.commands.set(command.name, command);
}

// for timer and scheduling stuff
const Window = require('window');
const window = new Window();
const schedule = require('node-schedule');

const PREFIX = '+';

// #endregion

// #region executes on ready

cf.client.on('ready', () => {
	console.log("Bot refreshed at - " + moment.tz('Europe/Helsinki').format("dddd, MMMM Do YYYY, h:mm:ss"));
	scheduling.turnOnSchedules();
	// clock();
});

// #endregion

// #region commands

cf.client.on('message', message =>{
	
	if (!message.content.startsWith(PREFIX) 
	|| message.author.bot) return;
	const args = message.content.slice(PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	// if there is no command like that, return
	if (!cf.client.commands.has(commandName)) return;

	// get the object from the collection and call it "command"
	const command = cf.client.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.channel.send('There was an error trying to execute that command!');
	}

});

// #endregion

// #region clock
/*
function clock() {
	const clockChannel = cf.client.channels.get("656416481709522965");

	clockChannel.setName(makeDate());

	cf.clockInterval = window.setInterval(()=>{
		clockChannel.setName(makeDate());
	}, 60000);
}

function makeDate() {
	let month = moment.tz('America/New_York').format("MMM");
	let day = moment.tz('America/New_York').format("Do");
	let time = moment.tz('America/New_York').format('LT');

	return month + " " + day + " " + time;
}
*/
// #endregion

cf.client.login(process.env.TOKEN);
