const { Client, Intents } = require('discord.js');
const axios = require('axios');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
const token = process.env['token']
const API_KEY = process.env['api_key']
const API_URL = process.env['api_url']
const GUILD_ID = process.env['guild_id']
const API_TOKEN_ID = process.env['token_id']

bot.on('ready', () => {

    setInterval(() => {
      let data;
      get_price().then((data) => {bot.user.setActivity('$'+data);});
    }, 20000);

});

async function get_price()
{
    try {
        let res = await axios.get(`${API_URL}=${API_KEY}&id=${API_TOKEN_ID}`);
        let data = res.data;
        data = data['data'][API_TOKEN_ID]['quote']['USD']['price'];
        data = Math.round(data * 10000000) / 10000000;
        console.log(data);
        data = String(data)
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

bot.login(token);
