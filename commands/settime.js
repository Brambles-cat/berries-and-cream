module.exports = {
	name: 'settime',
	execute(message, args) {
		if(args.length > 1 && args[0].includes(':')) {
			const timeArr = args[0].split(':');
			if(parseInt(timeArr[0]) <= 12 && (timeArr[1].length === 2 && parseInt(timeArr[1]) < 60) && (args[1].toUpperCase() === 'AM' || args[1].toUpperCase() === 'PM')) {
				message.client.usingData(data => {
					data.time = parseInt(timeArr[0]) + ':' + timeArr[1] + ' ' + args[1].toUpperCase();
					message.client.writeData(data);
					let time = parseInt(timeArr[0]) + parseInt(timeArr[1]) / 60;
					const now = (((new Date()).getTime() / 3600000) + 11) % 24;
					if(args[1].toLowerCase() === 'pm') time += 12;
					setTimeout(() => {
						message.channel.send('<@&' + data.role + '>');
					}, (time - now >= 0 ? time - now : time + 24 - now) * 3600000);
				});
				message.reply('Pinging at ' + parseInt(timeArr[0]) + ':' + timeArr[1] + ' ' + args[1].toUpperCase());
			} else {
				message.reply('not a valid time');
			}
		}
	},
};
