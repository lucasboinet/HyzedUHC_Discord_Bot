const { MessageEmbed } = require('discord.js');
const { support_channel } = require('../config.json');

module.exports = {
    name: 'setsupport',
    description: "Set the support channel",
    callback: (message, args) => {
        if(args.length == 0)
        {
            if(message.channel.id == support_channel)
            {
                const embed = new MessageEmbed()
                .setAuthor('Support', 'https://i.imgur.com/VgVtVns.png')
                .setDescription('> Pour ouvrir un ticket, veuillez réagir à ce message')
                .setColor("#9B59B6")

                message.channel.bulkDelete(99).then(() => {
                    message.channel.send(embed).then((msg) => {
                        msg.react('🟪');
                    })
                });
            }
        }
        else
        {
            message.reply('Aucun arguments requis pour cette commande')
        }

        message.client.on('messageReactionAdd', async (reaction, user) => {
            if(reaction.message.channel.id === support_channel)
            {
                if(reaction.partial)
                {
                    try {
                        await reaction.fetch();
                    } catch(err) {
                        console.error("setsupport: ", err)
                        return;
                    }
                }
                if(!user.bot)
                {
                    reaction.users.remove(user.id);
                    let staff_role = reaction.message.guild.roles.cache.find((role) => {return role.name === `Staff`})
                    let helper_role = reaction.message.guild.roles.cache.find((role) => {return role.name === `Helper`})
                    let everyone = reaction.message.guild.roles.cache.find(r => r.name === 'Joueur');
                    if(reaction.message.guild.channels.cache.find((channel) => {return channel.name === `support-${user.id}`}))
                    {
                        user.send('Vous avez deja ouvert un ticket pour le support. Veuillez d\'abord fermer ce dernier avant de recommencer!');
                        return;
                    }
                    reaction.message.guild.channels.create(`support-${user.id}`, { type: "text"}).then(channel => {
                        channel.setParent("858510532118052886");
                        channel.overwritePermissions([
                            {
                                id: everyone.id,
                                deny: ['VIEW_CHANNEL']
                            },
                            {
                                id: staff_role.id,
                                allow: ['VIEW_CHANNEL']
                            },
                            {
                                id: helper_role.id,
                                allow: ['VIEW_CHANNEL']
                            },
                            {
                                id: user.id,
                                allow: ['VIEW_CHANNEL']
                            }
                        ]);
                        channel.send(`${staff_role} ${helper_role}`);
                        const embed = new MessageEmbed()
                        .setAuthor(`Ticket ${user.id}`, 'https://i.imgur.com/wSTFkRM.png')
                        .setDescription('**Vous avez ouvert un ticket, merci d\'indiquer les informations suivantes :**\n\n\n Pseudo en jeu :\n\n  Personne(s) impliqué(s) :\n\n  Explication du problème : ')
                        .addFields([
                            {name: '\u200B', value: 'Quelqu\'un vous répondra dans les plus brefs délai'}
                        ])
                        .setFooter('Pour fermer le ticket, mettez la réaction ci-dessous')
                        .setColor("#9B59B6")
                        channel.send(embed).then(message => message.react('✅'));
                        channel.send(`${user}`);
                    })
                }
            }else if(reaction.message.channel.name.includes('support-')){
                if(reaction.partial)
                {
                    try {
                        await reaction.fetch();
                    } catch(err) {
                        console.error("setsupport: ", err)
                        return;
                    }
                }
                if(!user.bot)
                {
                    reaction.message.channel.delete();
                }
            }
        })
        
    }

}