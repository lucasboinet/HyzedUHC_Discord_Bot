const { MessageEmbed } = require('discord.js');
const { rules_channel } = require('../utils/config.json');
const { setRole } = require('../utils/utils');

module.exports = {
    name: 'setrules',
    description: 'Manage verified player',
    callback: (message, args) => {
        if(args.length == 0)
        {
            if(message.channel.id == rules_channel)
            {
                const embed = new MessageEmbed()
                    .setAuthor(`Règlement`, 'https://i.imgur.com/VgVtVns.png')
                    .setDescription('**Veuillez lire et accepter le règlement ci-dessus pour acceder au reste du serveur**')
                    .setFooter('Pour accepter, mettez la réaction ci-dessous')
                    .setColor("#9B59B6");

                message.channel.bulkDelete(99).then(() => {
                    message.channel.send(embed).then(message => message.react('✅'));
                });
            }

            message.client.on('messageReactionAdd', async (reaction, user) => {
                if(reaction.message.channel.id === rules_channel)
                {
                    if(reaction.partial)
                    {
                        try {
                            await reaction.fetch();
                        } catch(err) {
                            console.error("setrules: ", err)
                            return;
                        }
                    }
                    if(!user.bot)
                    {
                        let target = reaction.message.guild.members.cache.get(user.id);
                        let rules_role = reaction.message.guild.roles.cache.find((role) => {return role.name === 'Joueur'})
                        setRole(target, rules_role, true);
                    }
                }
            })

            message.client.on('messageReactionRemove', async (reaction, user) => {
                if(reaction.message.channel.id === rules_channel)
                {
                    if(reaction.partial)
                    {
                        try {
                            await reaction.fetch();
                        } catch(err) {
                            console.error("setrules: ", err)
                            return;
                        }
                    }
                    if(!user.bot)
                    {
                        let target = reaction.message.guild.members.cache.get(user.id);
                        let rules_role = reaction.message.guild.roles.cache.find((role) => {return role.name === 'Joueur'})
                        setRole(target, rules_role, false);
                    }
                }
            })
        }else{
            message.author.send('Aucun arguments requis pour cette commande');
        }
    }
}