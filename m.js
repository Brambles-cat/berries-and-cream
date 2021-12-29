/* eslint-disable no-unused-vars */
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: Object.keys(Intents.FLAGS) });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.usingData = (callback) => {
	fs.readFile('./data.json', 'utf8', (err, jsonString) => {
		if (err) {
			console.log(err);
			return;
		}
		const data = JSON.parse(jsonString);
		callback(data);
	});
};
client.writeData = (data) => {
	fs.writeFile('./data.json', JSON.stringify(data, null, 2), err => {
		if (err) console.log(err);
	});
};

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async message => {
	if (message.author.bot) return;
	let args;
	if (message.content.slice(0, 1) === '!') {
		args = message.content.slice(1).trim().split(/ +/);
	} else if (message.content.slice(0, 23) === '<@!925608250647392276> ') {
		args = message.content.slice(23).trim().split(/ +/);
	} else return;
	const command = client.commands.get(args.shift().toLowerCase());
	if (command) {
		try {
			command.execute(message, args);
		} catch (error) {
			console.log(error);
		}
	}
});

client.login('pretend there\'s a token here');
