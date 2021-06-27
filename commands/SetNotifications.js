const { MessageEmbed } = require('discord.js');
const { notifications_channel, notifications_icons } = require('../config.json');

module.exports = {
    name: 'setnotif',
    description: "Set the notifications channel",
    callback: (message, args) => {
        if(args.length == 0)
        {
            if(message.channel.id == notifications_channel)
            {
                const embed = new MessageEmbed()
                .setAuthor('Notifications',  'https://i.imgur.com/wSTFkRM.png')
                .setDescription('> Réagis à ce message pour choisir tes notifications')
                .addFields(
                    { name: '\u200B', value: `${notifications_icons[0]} - Loup Garous UHC`},
                    { name: '\u200B', value: `${notifications_icons[1]} - Demon Slayer UHC`},
                    { name: '\u200B', value: `${notifications_icons[2]} - Attack On Titans UHC`},
                )
                .setColor("#9B59B6")

                message.channel.bulkDelete(99).then(() => {
                    message.channel.send(embed).then((msg) => {
                        notifications_icons.forEach(icon => {
                            msg.react(icon);
                        });
                    })
                });
            }
        }
        else
        {
            message.reply('Aucun arguments requis pour cette commande')
        }

        message.client.on('messageReactionAdd', async (reaction, user) => {
            if(reaction.message.channel.id === notifications_channel)
            {
                if(reaction.partial)
                {
                    try {
                        await reaction.fetch();
                    } catch(err) {
                        console.error("setnotif: ", err)
                        return;
                    }
                }
                if(!user.bot)
                {
                    let target = reaction.message.guild.members.cache.get(user.id);
                    let notif_role = reaction.message.guild.roles.cache.find((role) => {return role.name === `${reaction.emoji.name} Alerts`})
                    if(!notif_role) return;
                    if(target.roles.cache.find((role) => {return role === notif_role}))
                    {
                        target.roles.remove(notif_role);
                        user.send(`** Notifications pour ${reaction.emoji.name} désactivée ! **`).then(() => reaction.users.remove(user.id));
                    }
                    else
                    {
                        target.roles.add(notif_role);
                        user.send(`** Notifications pour ${reaction.emoji.name} activée ! **`).then(() => reaction.users.remove(user.id));
                    }
                }
            }
        })
        
    }

}