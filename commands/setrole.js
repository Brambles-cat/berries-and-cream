module.exports = {
	name: 'setrole',
	execute(message, args) {
		if (!(message.mentions.roles.first()) || args[0].slice(3, -1) != message.mentions.roles.first().id) {
			message.reply('Not a valid role (it must be mentioned instead of the name being typed)');
			return;
		}
		message.client.usingData.then(data => {
			data.role = args[0].slice(3, -1);
			message.client.writeData(data);
			message.channel.send('set <@&' + data.role + '> as role to be pinged');
		}, reject => {
			console.log(reject);
			message.channel.send('An error has occured');
		});
	},
};
