const bodyParser = require('body-parser');
const express = require('express');
const get_weather = require('./get_weather');
const get_meme = require('./get_meme');
const post_text = require('./post_text');
const post_photo = require('./post_photo');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const showHelp = (res, req) => {
    const msg =
`Here is some commands which can help you to manage this bot:
/start - Helps you understand why I have designed this bot
/weather - Shows you weather.
If you want to see a funny meme, just type any word to the bot and you will see a meme`;

    post_text.sendText(res, req, msg);
};

const start_message = (res, req) => {
    const msg =
`Hey, this bot was designed to make the process of finding out the weather forecast much faster
and i want you to always be smiling, that is why i added a meme search by your word.
If you have got any problems with using this bot type command /help`;

    post_text.sendText(res, req, msg);
};

app.post('/new-message', (req, res) => {
    let { message } = req.body;

    if (!message) {
        return res.end();
    }

    const msg = message.text.toLowerCase();
    const actions = {
        '/help': showHelp,
        '/start': start_message,
        '/weather': async () => {
            const weather = await get_weather.fetch('kiev');
            post_text.sendText(res, req, weather)
            .catch(err => console.log(err));
        }
    };

    if (actions[msg] === undefined) {
        return (async () => {
            const meme = await get_meme.fetch(msg);
            post_photo.sendPhoto(res, req, meme)
            .catch(err => console.log(err));
        })();
    }

    actions[msg](res, req);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
