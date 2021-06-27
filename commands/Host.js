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
            console.log(message.channel.guild.roles)
            let alert_role = message.channel.guild.roles.cache.find(role => role.name === `${gamemodes[0].icon} Alerts`);
            message.channel.send(`${alert_role}`)
                .then(msg => msg.delete())
                .catch(err => console.error("host create: ", err));
            message.delete();
        }else if(args[0] == 'help')
        {
            console.log("host help");
        }
    }

}