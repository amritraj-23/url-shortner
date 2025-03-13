const crypto = require('crypto');

const shortener = {
    CHARACTERS: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    // Function to generate a random 6-character code
    generateShortCode: function() {
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += this.CHARACTERS.charAt(crypto.randomInt(0, this.CHARACTERS.length));
        }
        return code;
    }
};

module.exports = shortener;