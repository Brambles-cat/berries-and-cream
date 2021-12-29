module.exports = {
	name: 'settime',
	execute(message, args) {
		if(args.length > 1 && args[0].includes(':')) {
			const time = args[0].split(':');
			if(parseInt(time[0]) <= 12 && (time[1].length === 2 && parseInt(time[1]) < 60) && (args[1].toUpperCase() === 'AM' || args[1].toUpperCase() === 'PM')) {
				message.client.usingData(data => {
					data.time = parseInt(time[0]) + ':' + time[1] + ' ' + args[1].toUpperCase();
					message.client.writeData(data);
				});
				message.reply('Pinging at ' + parseInt(time[0]) + ':' + time[1] + ' ' + args[1].toUpperCase());
			} else {
				message.reply('not a valid time');
			}
		}
	},
};