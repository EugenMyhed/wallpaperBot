'use strict'

const config = {}

config.token = process.env.TOKEN || '616656013:AAFxVaE_Lz1N9Sq4hgQPvwvjpdCqwrRoxJA'
config.databaseURL = process.env.databaseURL || 'mongodb://admin:qwerty12345@ds217002.mlab.com:17002/googlestats'
config.REDIS = {}
config.REDIS.TELEGRAM_SESSION_HOST = '127.0.0.1'
config.REDIS.TELEGRAM_SESSION_PORT = 6379
config.sessionSnippet = 'tgb'
config.master_id = [
    222420524, //I
    364405248, //Rik
]
config.adminObject = {
    main: 222420524
}
export default config
