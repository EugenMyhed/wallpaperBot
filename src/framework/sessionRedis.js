import redis from 'redis'
import logger from '../models/logger'
import config from '../config/config-file'
class sessionRedis {
    constructor(options) {
        this.options = Object.assign({
            sessionUndefined: undefined,
            property: 'session',
            //getSessionKey: (ctx) => ctx.message.from.id && ctx.message.chat.id && `${ctx.message.from.id}:${ctx.message.chat.id}:${config.sessionSnippet}`,
            getSessionKey: (ctx) => {
                if (ctx.message) {
                    return `${ctx.message.from.id}:${ctx.message.chat.id}:${config.sessionSnippet}`
                } else if (ctx.channelPost) {
                    return `post:${ctx.channelPost.chat.id}:${config.sessionSnippet}`
                } else return 'undefinedSession'
            },
            store: {}
        }, options)

        this.client = redis.createClient(this.options.store)
    }

    getSession(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, json) => {
                if (err) {
                    return reject(err)
                }
                if (json) {
                    try {
                        const session = JSON.parse(json)
                        // logger.debug('session state', key, session)
                        resolve(session)
                    } catch (error) {
                        logger.error('Parse session state failed' + error)
                    }
                }
                resolve({})
            })
        })
    }
    async getAll() {
        return new Promise(async (res, rej) => {
            this.client.keys('*:' + config.sessionSnippet, async (err, keys) => {
                if (err) logger.error(err)
                let pArr = keys.map(key => {
                    return new Promise(async (res, rej) => {
                        const val = await this.getSession(key)
                        res([key.replace(':' + config.sessionSnippet, ''), val])
                    })
                })
                res(await Promise.all(pArr))
            })
        })
    }

    clearSession(key) {
        // logger.debug('clear session', key)
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, json) => {
                if (err) {
                    return reject(err)
                }
                resolve()
            })
        })
    }

    saveSession(key, session) {
        if (!session || Object.keys(session)
            .length === 0) {
            return this.clearSession(key)
        }
        // logger.debug('save session', key, session)
        return new Promise((resolve, reject) => {
            this.client.set(key, JSON.stringify(session), (err, json) => {
                if (err) {
                    return reject(err)
                }
                if (this.options.ttl) {
                    // logger.debug('session ttl', session)
                    this.client.expire(key, this.options.ttl)
                }
                resolve({})
            })
        })
    }
    middlewareCustom() {
        return async (ctx, next) => {
            const key = this.options.getSessionKey(ctx)
            if (!key)
                return next()
            let session = await this.getSession(key)
            // console.log(`Get session: ${session.state}`)
            console.log('session snapshot', key, session)
            Object.defineProperty(ctx, this.options.property, {
                get: function () { return session },
                set: function (newValue) {
                    // console.log('Changed ' + newValue)
                    session = Object.assign({}, newValue)
                }
            })
            Object.defineProperty(ctx, 'save', {
                value: async () => {
                    if (!ctx.message.from.id || !ctx.message.chat.id) logger.error('Error in session Middelware')
                    return this.saveSession(this.options.getSessionKey(ctx), ctx.session)
                },
                enumerable: false
            })
            next()
        }
    }
}

module.exports = sessionRedis
