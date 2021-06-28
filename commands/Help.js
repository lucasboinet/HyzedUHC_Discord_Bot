
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: "Commands list",
    callback: (message, args) => {
        const embed = new MessageEmbed()
                .setAuthor('HyzedUHC', 'https://i.imgur.com/VgVtVns.png')
                .setTitle(`Liste des commandes`)
                .setThumbnail('https://i.imgur.com/VgVtVns.png')
                .addFields([
                    { name: '!host :', value: '\u200B' },
                    { name: 'create <gamemode> <date>', value: 'Permet d\'annoncer un host avec \n gamemode<lg|aot|ds> et date<dd/mm/yyy xx:xx>' },
                ])
                .setFooter('IP: play.hyzed.fr | Mumble: /mumble')
                .setColor("#9B59B6")
            message.author.send(embed);
            message.delete();
    }
}