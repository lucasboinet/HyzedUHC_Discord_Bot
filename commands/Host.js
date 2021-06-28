const { MessageEmbed } = require('discord.js');
const { games_channel, gamemodes } = require('../config.json');

module.exports = {
    name: 'host',
    description: "Manage host",
    callback: (message, args) => {
        if(message.channel.id != games_channel) return;

        if(args[0] == 'create')
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
        }else if(args[0] == 'help')
        {
            const embed = new MessageEmbed()
                .setAuthor('HyzedUHC', 'https://i.imgur.com/VgVtVns.png')
                .setTitle(`Aide création d'host`)
                .setThumbnail('https://i.imgur.com/VgVtVns.png')
                .addFields([
                    { name: '!host create <gamemode=[lg|aot|ds]> <date=[dd/mm/YYYY hh:mm]>', value: 'Permet d\'annoncer un host' },
                    { name: '!host delete <id>', value: 'Permet de supprimer l\'annonce  d\'un host' }
                ])
                .setFooter('IP: play.hyzed.fr | Mumble: /mumble')
                .setColor("#9B59B6")
            message.author.send(embed);
            message.delete();
        }
    }

}