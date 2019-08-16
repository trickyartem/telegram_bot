const axios = require('axios');
const token = process.env.TG_KEY;

module.exports = (() => {
    return {
        async sendText (res, req, output) {
            await axios.post(`https://api.telegram.org/bot${token}/sendMessage`,
                {
                    chat_id: req.body.message.chat.id,
                    text: output
                });
            await (() => {
                console.log('message posted');
                res.end();
            })()
        }
    }
})();
