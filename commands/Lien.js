
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lien',
    description: "Links list",
    callback: (message, args) => {
        const embed = new MessageEmbed()
                .setAuthor('HyzedUHC', 'https://i.imgur.com/VgVtVns.png')
                .setTitle(`Retrouve nous ici : `)
                .setThumbnail('https://i.imgur.com/VgVtVns.png')
                .addFields([
                    { name: 'Site web :', value: 'url' },
                    { name: 'Twitch : ', value: 'url' },
                    { name: 'Youtube : ', value: 'url' },
                ])
                .setFooter('IP: play.hyzed.fr | Mumble: /mumble')
                .setColor("#9B59B6")
            message.author.send(embed);
            message.delete();
    }
}