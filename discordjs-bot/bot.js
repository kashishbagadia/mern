require('dotenv').config();

const { Client, Intents, WebhookClient} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const data = {
    id : process.env.WEBHOOK_ID,
    token: process.env.WEBHOOK_TOKEN
}

const webhookClient = new WebhookClient(data) 

const PREFIX = "$";

client.on('ready', () =>{
    console.log(`${client.user.tag} has logged in.`);
})

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const[CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        
        //kick member
        if(CMD_NAME === 'kick'){
            if(!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('You do not have permissions to use that command')
            if(args.length === 0) 
                return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if(member){
                member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked.`))
                    .catch((err) => message.channel.send(`I do not have permissions :(`))
            }else{
                message.channel.send('That member was not found')
            }
        }
            //ban members
        else if (CMD_NAME == 'ban'){
            if(!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply('You do not have permissions to use that command')   
            if(args.length === 0) 
            return message.reply('Please provide an ID');
            try{
                message.guild.members.ban(args[0]);
                message.channel.send('User was banned succesfully')
            }catch(err){
                console.log(err);
                message.channel.send('An error occured. Either I do not have permissions or the user was not found')
            }            
        }
        else if(CMD_NAME === 'announce'){
            console.log(args);
            const msg = args.join(' ');
            console.log(msg);
            webhookClient.send(msg);
        }
        
    }
})

// client.on('messageReactionAdd', (reaction, user) => {

// })

// client.on('messageReactionRemove', (reaction, user) => {

// })

client.login(process.env.DISCORDJS_BOT_TOKEN);