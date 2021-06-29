const { MessageEmbed } = require('discord.js');
const { games_channel, gamemodes } = require('../utils/config.json');

module.exports = {
    name: 'host',
    description: "Manage host",
    callback: (message, args) => {
        if(message.channel.id != games_channel) return;

        if(args[0] === 'create')
        {
            let gamemode;
            let date;
            if(!args[1] || !args[2] || !args[3])
            {
                message.author.send('Verifier les arguments! Voir !help pour plus d\'informations');
                message.delete();
                return;
            }

            gamemode = gamemodes.find(g => g.slug == args[1]);

            if(!gamemode){
                message.author.send(`Aucun mode de jeu correspondant à ${args[1]}! Voir !help pour plus d'informations`);
                message.delete();
                return;
            }

            date = new Date(args[2].split('/').reverse().join('-') + 'T' + args[3] + ':00');

            if(date === 'Invalid Date')
            {
                message.author.send(`Format de date incorrect! Voir !help pour plus d'informations`);
                message.delete();
                return;
            }

            if(date < new Date())
            {
                message.author.send(`Vous ne pouvez pas mettre une date déjà passée! Voir !help pour plus d'informations`);
                message.delete();
                return;
            }

            let month = date.getMonth() > 9 ? date.getMonth() : "0"+date.getMonth();
            let hours = date.getHours() > 9 ? date.getHours() : "0"+date.getHours();
            let dateMessage = `${date.getDate()}/${month}/${date.getFullYear()} à ${hours}h${date.getMinutes()}`;

            const embed = new MessageEmbed()
                .setAuthor('Annonce Game', 'https://i.imgur.com/VgVtVns.png')
                .setTitle(`Host de ${message.author.username}`)
                .setColor("#9B59B6")
                .addFields([
                    { name: 'Mode de jeu : ', value: `${gamemode.icon} ${gamemode.text}` },
                    { name: 'Date : ', value: `🕒 ${dateMessage}` },
                    { name: 'Scénarios et règles : ', value: `📚 Voir channel #règles` },
                    { name: 'IP du serveur : ', value: `🎮 play.hyzed.fr` },
                    { name: 'Mumble : ', value: `☎️ 37.187.48.175:1030` },
                    { name: '\u200B', value: '\u200B' }
                ])
                .setThumbnail('https://i.imgur.com/VgVtVns.png')
                .setFooter('IP: play.hyzed.fr | Mumble: /mumble')
            
            message.channel.send(embed).then(msg => {
                msg.react('✅');
                msg.react('❓');
                msg.react('❌');
            });
            let alert_role = message.channel.guild.roles.cache.find(role => role.name === `${gamemodes[0].icon} Alerts`);
            message.channel.send(`${alert_role}`)
                .then(msg => {
                    msg.delete();
                })
                .catch(err => console.error("host create: ", err));
            message.delete();
        }
    }

}