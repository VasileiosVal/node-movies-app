const config = require("config");

module.exports = () => {
    if (!config.get("jwtPrivateKey")) {
        console.log("FATAL ERROR: jwtPrivateKey not defined");
        process.exit(1);
    }
}