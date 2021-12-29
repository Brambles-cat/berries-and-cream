module.exports = {
	name: 'check',
	execute(message, args) {
		message.client.usingData(data => {
			message.reply('Role: ' + data.role + '\n Ping time: ' + data.time);
		});
	},
};