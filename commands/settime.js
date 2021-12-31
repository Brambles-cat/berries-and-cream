function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
	name: 'settime',
	async execute(message, args) {
		if(args.length > 1 && args[0].includes(':')) {
			const timeArr = args[0].split(':');
			if(parseInt(timeArr[0]) <= 12 && (timeArr[1].length === 2 && parseInt(timeArr[1]) < 60) && (args[1].toUpperCase() === 'AM' || args[1].toUpperCase() === 'PM')) {
				let id;
				await message.client.usingData.then(data => {
					id = data.role;
					data.time = parseInt(timeArr[0]) + ':' + timeArr[1] + ' ' + args[1].toUpperCase();
					message.client.writeData(data);
				}, (reject) => {
					console.log(reject);
					id = null;
				});
				if(!id) {
					message.reply('No role set to ping, use !setrole <role>');
					return;
				}
				let time = parseInt(timeArr[0]) + parseInt(timeArr[1]) / 60;
				let now = (((new Date()).getTime() / 3600000) + 11) % 24;
				if(args[1].toLowerCase() === 'pm') time += 12;
				let d = args[0];
				message.reply('Pinging at ' + parseInt(timeArr[0]) + ':' + timeArr[1] + ' ' + args[1].toUpperCase());
				while(true) {
					await sleep((time - now >= 0 ? time - now : time + 24 - now) * 3600000);
					message.client.usingData.then(d2 => {
						d = d2.time.slice(0, -3);
					}, reject => {
						console.log(reject);
						message.channel.send('An error has occured');
						d = null;
					});
					if(args[0] != d) break;
					await message.channel.send('<@&' + id + '> go take ur meds before u forget idiots');
					now = (((new Date()).getTime() / 3600000) + 11) % 24;
				}
			} else {
				message.reply('not a valid time');
			}
		}
	},
};
