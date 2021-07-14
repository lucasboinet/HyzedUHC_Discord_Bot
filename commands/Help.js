const { MessageEmbed } = require('discord.js');
const Pterodactyl = require('pterodactyl.js');
const serveur = new Pterodactyl.Builder()
    .setURL('https://panel.lguhc-astra.tk/')
    .setAPIKey('h14lbdl7Tisbtsixoafgg62SWMQnJFN9muGg4IYLkNDq7pj8')
    .asUser();

module.exports = {
    name: 'server',
    description: "server commands",
    callback: (message, args) => {
        let servername = args.shift();
        console.log(servername)
    }
}