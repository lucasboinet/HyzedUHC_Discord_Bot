const { MessageEmbed } = require('discord.js');
const { games_channel, gamemodes } = require('../utils/config.json');

module.exports = {
    name: 'host',
    description: "Manage host",
    callback: (message, args) => {
        if(message.channel.id != games_channel) return;

        if(args[0] === 'create')
        {
            const embed = new MessageEmbed()
                .setAuthor('Annonce Game', 'https://i.imgur.com/VgVtVns.png')
                .setTitle(`Host de ${message.author.username}`)
                .setColor("#9B59B6")
                .setThumbnail('https://i.imgur.com/VgVtVns.png')
                .setFooter('IP: play.hyzed.fr | Mumble: /mumble')
            
            message.channel.send(embed);
            let alert_role = message.channel.guild.roles.cache.find(role => role.name === `${gamemodes[0].icon} Alerts`);
            message.channel.send(`${alert_role}`)
                .then(msg => msg.delete())
                .catch(err => console.error("host create: ", err));
            message.delete();
        }else if(args[0] === 'help')
        {
            const embed = new MessageEmbed()
                .setAuthor('HyzedUHC', 'https://i.imgur.com/VgVtVns.png')
                .setTitle(`Aide pour la commande !host`)
                .setThumbnail('https://i.imgur.com/VgVtVns.png')
                .addFields([
                    { name: '!host :', value: '\u200B' },
                    { name: 'create <gamemode> <date>', value: 'Permet d\'annoncer un host' },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'gamemode', value: 'lg / aot / ds', inline: true },
                    { name: 'date', value: 'dd/mm/YYYY hh:mm', inline: true },
                ])
                .setFooter('IP: play.hyzed.fr | Mumble: /mumble')
                .setColor("#9B59B6")
            message.author.send(embed);
            message.delete();
        }
    }

}