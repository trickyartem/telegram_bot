const axios = require('axios');
const token = process.env.TG_KEY;


module.exports = (() => {
    return {
        async sendPhoto (res, req, meme) {
            await axios.post(`https://api.telegram.org/bot${token}/sendPhoto`, {
                chat_id: req.body.message.chat.id,
                photo: meme
            });
            await (() => {
                console.log('photo posted');
                res.end();
            })()
            }
        }
})();
