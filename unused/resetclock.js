const Discord = require('discord.js');
const cf = require('../components/commonFunctions.js');
const scheduling = require('../components/scheduling.js');
const Window = require('window');
const window = new Window();
const moment = require('moment-timezone');


module.exports = {
	name: 'resetclock',
	description: 'Resets the clock and its interval.',
	execute(message, args) {
    try {
      window.clearInterval(cf.clockInterval);
      clock();
      
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
      
      message.channel.send('Reset successful.');
      message.channel.send('Time that should be displayed: ' + makeDate());
    } catch(err) {
      message.channel.send('Error: ' + err);
    }
	}, // end execute
};