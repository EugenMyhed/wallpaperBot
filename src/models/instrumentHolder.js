'use strict'

export default class {
    asyncAnswer(ctx, answerArray) {
        return new Promise(async (res, rej) => {
            const promiseArray = []
            answerArray.forEach((element, i) => {
                promiseArray.push(ctx.reply(element.text))
                if (i != answerArray.length - 1)
                    promiseArray.push(awaiter(element.time))
            })
            Promise.all(promiseArray)
                .then(data => res())
                .catch(err => rej(err))
        })
    }
    awaiter(time) {
        return new Promise((resolve) => {
            setTimeout(() => resolve('дождались😛'), time)
        })
    }
}
