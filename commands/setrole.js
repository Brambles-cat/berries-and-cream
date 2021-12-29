module.exports = {
	name: 'setrole',
	execute(message, args) {
		message.channel.send(args[0].slice(3, -1));
		if (!(message.mentions.roles.first()) || args[0].slice(3, -1) != message.mentions.roles.first().id) return;
		message.client.usingData(data => {
			data.role = args[0].slice(3, -1);
			message.client.writeData(data);
			message.channel.send('set <@&' + data.role + '> as role');
		});
	},
};