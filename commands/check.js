module.exports = {
	name: 'check',
	execute(message, args) {
		message.client.usingData.then(data => {
			const timeArr = data.time.split(':');
			let time = parseInt(timeArr[0]) + parseInt(timeArr[1].slice(0, 2)) / 60;
			const now = (((new Date()).getTime() / 3600000) + 11) % 24;
			if(timeArr[1].slice(3, 5) === 'PM') time += 12;
			const timeUntil = time - now >= 0 ? time - now : time + 24 - now;
			message.reply(`Role id: ${data.role}\nPing time: ${data.time}\nTime until next ping: ${Math.floor(timeUntil)} hours, ${Math.floor(60 * (timeUntil % 1))} minutes, ${Math.floor(3600 * (timeUntil % 0.01))} seconds`);
		}, reject => {
			console.log(reject);
			message.channel.send('An error has occured');
		});
	},
};
