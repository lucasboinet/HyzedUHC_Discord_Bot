const { MessageEmbed } = require('discord.js');
const Pterodactyl = require('pterodactyl.js');
const fetch = require('node-fetch');
const serveur = new Pterodactyl.Builder()
    .setURL('https://panel.lguhc-astra.tk/')
    .setAPIKey('h14lbdl7Tisbtsixoafgg62SWMQnJFN9muGg4IYLkNDq7pj8')
    .asUser();

module.exports = {
    name: 'server',
    description: "server commands",
    callback: (message, args) => {
        let target = message.guild.members.cache.get(message.author.id);
        let target_role = message.guild.roles.cache.find(role => {return role.name === '*'})
        if(target.roles.cache.find(role => {return role === target_role}))
            return;

        let servername = args.shift();
        let status = args.shift();

        if(!servername)
        {
            message.channel.send("Les serveurs actuellement surportès sont : **LG**, **HUB**, **PVP**, **UHC**, **RUSHFFA**, **BUILD** | **ON**, **OFF**. Pour l'argument **TEST** | Chiffre commencant à 0")
            return;
        }

        if(!['on', 'off'].includes(status))
        {
            message.channel.send("Choisir 'on' ou 'off'")
            return;
        }
        
        switch(servername)
        {
            case "lg":
                message.channel.send("Machine LG : " + status); 
                changeStatus(1, status)
                break;
            case "hub":
                message.channel.send("Machine HUB : " + status); 
                changeStatus(0, status)
                break;
            case "pvp":
                message.channel.send("Machine PVP : " + status);   
                changeStatus(3, status)
                break;
            case "uhc":
                message.channel.send("Machine UHC : " + status); 
                changeStatus(2, status)
                break;
            case "rushffa":
                message.channel.send("Machine RUSHFFA : " + status); 
                changeStatus(7, status)
                break;
            case "build":
                message.channel.send("Machine BUILD : " + status); 
                changeStatus(6, status)
                break;
        }
    }
}

function changeStatus(serverID, status){
    serveur.getClientServers()
    .then(async servers => {
        let server = servers[serverID];
        console.log(server.toJSON());
        if(status === "off")
            await server.stop();
        else
            await server.start();
    }).catch(error => console.log(error)); 
}