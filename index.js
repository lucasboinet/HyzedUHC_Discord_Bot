const fs = require('fs');
const discord = require('discord.js');
const { token, prefix, notifications_channel } = require('./config.json');
const client = new discord.Client();

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("ready")
})

client.on('message', message => {
    if(!message.content.startsWith(prefix)) return;

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

client.on('guildMemberAdd', async member => {
    let role = member.guild.roles.cache.find(role => role.name === "Joueur");
    member.roles.add(role);
})

client.login(token);