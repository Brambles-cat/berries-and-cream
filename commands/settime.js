const minute = 1000 * 60;
const hour = minute * 60;
module.exports = {
	name: 'time',
	execute(message, args) {
		let time;
		const d = new Date();
		let hr = Math.floor(((d.getTime() / hour) + 11) % 24);
		const min = Math.floor((d.getTime() / minute) % 60);
		const sec = Math.floor((d.getTime() / 1000) % 60);
		if (hr >= 13) {
			hr -= 12;
			time = 'PM';
		} else {
			time = 'AM';
		}
		message.reply('time: \n' + hr + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec) + ' ' + time);
	},
};
