module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb+srv://jdhl27:tCke6MyoEXqHxpKP@cluster0.wrmrdts.mongodb.net/?retryWrites=true&w=majority',
    dbLocal: process.env.MONGODB || 'mongodb://localhost:27017/diappbetes',
    SECRET_TOKEN: 'miclavedetokens'
}