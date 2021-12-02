const http = require("./index")
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5555;

http.server.listen( PORT , () => { console.log( `Server started PORT => ${PORT}` ) });
