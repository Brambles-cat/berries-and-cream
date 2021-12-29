const time = [1000, 60000, 3600000, 86400000];
const units = {'sec': time[0], 'seconds': time[0], 'min': time[1], 'mins': time[1], 'minute': time[1], 'minutes': time[1], 'hour': time[2], 'hours': time[2], 'day': time[3], 'days': time[3]};
module.exports = {
	name: 'pingin',
	execute(message, args) {
		if(args.length >= 2 && parseInt(args[0]) >= 0 && Object.keys(units).includes(args[1].toLowerCase())) {
			message.client.usingData(data => {
				setTimeout(() => {
					message.reply('<@&' + data.role + '>');
				}, parseInt(args[0]) * units[args[1].toLowerCase()]);
			});
		} else {
			message.channel.send('not a valid time');
		}
	},
};