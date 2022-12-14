require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB,
    dbLocal: process.env.MONGODB || 'mongodb://localhost:27017/diappbetes',
    SECRET_TOKEN: 'miclavedetokens'
}