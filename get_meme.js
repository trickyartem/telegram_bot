const axios = require('axios');

module.exports = (function() {
    const pick_random_element = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const make_api_req = (query) => `https://www.google.com/search?q=meme+${query}&source=lnms&tbm=isch&biw=1000bih=1000`;
    const regexp = /<img.*?src="(.*?)"[^\>]+>/g;

    return {

        // Just for test if module imported well

        echo(...args) {
            console.log("Your args -> ", args);
        },

        // Fetch memes from google
        // @param {message}: String - request to google will be: meme + message

        async fetch(message) {
            if (!message) return;
            const query = message.split(" ").filter((el) => el !== '').join("+");
            let response;
            try {
                response = await axios.get(make_api_req(query));
            } catch (err) {
                return ;
            }
            const {data} = response;
            let match;
            let matches = [];
            while ((match = regexp.exec(data)) !== null) {
                matches.push(match[1]);
            }
            return pick_random_element(matches);
        }
    }
})();