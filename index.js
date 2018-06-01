require('dotenv').config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

console.log(`
NODE_ENV=${process.env.NODE_ENV}
MONGO_URI:${process.env.MONGO_URI}
GOOGLE_CLIENT_ID:${process.env.GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET:${process.env.GOOGLE_CLIENT_SECRET}`)

const server = http.createServer(app);
server.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});