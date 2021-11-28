const path = require('path');
let mode = "development"
console.log(process.env.NODE_ENV.length)
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV.trim() === "production"){
    mode = "production"
}
console.log(mode)
module.exports = () => ({
    // mode: 'development',
    // mode: 'production',

    // "start:prod": "webpack && node dist/bundle.js",
    // "start:dev": "nodemon src/server.js"

    mode: mode,
    target: 'node',

    entry: './src/server.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js', '.json'],
    },

    
});