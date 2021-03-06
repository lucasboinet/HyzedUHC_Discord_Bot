const fs = require('fs');//
const discord = require('discord.js');
const { token } = require('./utils/token.json');
const { prefix, notifications_channel, support_channel, rules_channel } = require('./utils/config.json');
const client = new discord.Client();

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.channels.cache.get(support_channel).send('!setsupport');
    client.channels.cache.get(notifications_channel).send('!setnotif');
    client.channels.cache.get(rules_channel).send('!setrules');

    client.user.setActivity('play.hyzed.fr', { type: 'WATCHING' })
})

client.on('message', message => {
    if(!message.content.startsWith(prefix)) return;

    if(message.content === prefix+"stop" && (message.author.id === '578995125892415558' || message.author.id === '208147912839004161'))
    {
        message.delete();
        process.exit();
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).callback(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Impossible d\'executer cette commande...');
	}
})

client.login(token);