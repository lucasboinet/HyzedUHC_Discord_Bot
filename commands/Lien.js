
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
                    { name: 'Site web :', value: '[hyzed.fr](https://hyzed.fr/)' },
                    { name: 'Twitch : ', value: '[twitch.tv](https://www.twitch.tv/hyzed__)' },
                    { name: 'Twitter : ', value: '[twitter.com]()' },
                    { name: 'Youtube : ', value: '[youtube.com](https://www.youtube.com/channel/UCxtXmQTvgkK5a2y1s9K1s3g)' },
                ])
                .setFooter('IP: play.hyzed.fr | Mumble: /mumble')
                .setColor("#9B59B6")
            message.author.send(embed);
            message.delete();
    }
}