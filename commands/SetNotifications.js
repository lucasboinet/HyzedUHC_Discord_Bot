const { MessageEmbed } = require('discord.js');
const { notifications_channel, gamemodes } = require('../utils/config.json');
const { setRole } = require('../utils/utils');

module.exports = {
    name: 'setnotif',
    description: "Set the notifications channel",
    callback: (message, args) => {
        if(args.length == 0)
        {
            if(message.channel.id == notifications_channel)
            {
                let fields = [];
                gamemodes.forEach(gamemode => {
                    fields.push({ name: '\u200B', value: `${gamemode.icon} - ${gamemode.text}`},)
                });
                const embed = new MessageEmbed()
                .setAuthor('Notifications',  'https://i.imgur.com/VgVtVns.png')
                .setDescription('> Réagis à ce message pour choisir tes notifications')
                .addFields(fields)
                .setColor("#9B59B6")

                message.channel.bulkDelete(99).then(() => {
                    message.channel.send(embed).then((msg) => {
                        gamemodes.forEach(g => {
                            msg.react(g.icon);
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
                    if(target.roles.cache.find((r) => {return r === notif_role}))
                    {
                        setRole(target, notif_role, false);
                        user.send(`** Notifications pour ${reaction.emoji.name} désactivée ! **`).then(() => reaction.users.remove(user.id));
                    }
                    else
                    {
                        setRole(target, notif_role, true);
                        user.send(`** Notifications pour ${reaction.emoji.name} activée ! **`).then(() => reaction.users.remove(user.id));
                    }
                }
            }
        })
        
    }

}