const { MessageEmbed } = require('discord.js');
const { games_channel, notifications_icons } = require('../config.json');

module.exports = {
    name: 'host',
    description: "Create host message",
    callback: (message, args) => {
        if(args[0] == "create")
        {
            if(message.channel.id != games_channel) return;

            const embed = new MessageEmbed()
                .setAuthor('Annonce Game', 'https://i.imgur.com/VgVtVns.png')
                .setTitle(`Host de ${message.author.username}`)
                .setColor("#9B59B6")
                .setThumbnail('https://i.imgur.com/VgVtVns.png')
                .setFooter('IP: play.hyzed.fr | Mumble: /mumble')
            
            message.channel.send(embed);

            message.channel.send('@annonces')
                .then(msg => msg.delete())
                .catch(err => console.error("host create: ", err));
            message.delete();
        }
    }

}