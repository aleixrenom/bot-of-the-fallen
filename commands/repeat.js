const Window = require('window');
const window = new Window();
const cf = require('../components/commonFunctions.js');

module.exports = {
	name: 'repeat',
	description: 'To test intervals.',
	execute(message, args) {
		if (!message.member.roles.has(cf.readDataFile('data').roles.admin)) return;

    let interval;
    let count = 0;
    
    switch (args[0]) {
        case "on":
        interval = window.setInterval( () => {
          count++;
          message.channel.send(count);
         }, 3000);
        break;
        case "off":
        window.clearInterval(interval);
        count = 0;
        break;
        default:
        message.channel.send("use on or off as arguments");
        break;
       } /*
		window.setInterval(()=>{

			// message.channel.send(winter.roll());

		}, 3000);*/
	},
};