'use strict'
import Markup from 'telegraf/markup'
import Extra from 'telegraf/extra'

import Text from './messageText'

class Keyboard {
    get mainKeyboard() {
        return Markup.keyboard([
                [Text.mainKeyboard]
            ])
            .oneTime()
            .resize()
            .extra()
    }
    get userKeyboard() {
        return Markup.keyboard([
                [Text.createPost_key]
                [Text.mainKeyboard]
            ])
            .oneTime()
            .resize()
            .extra()
    }
    get createWall() {
        return Extra.markup(Markup.inlineKeyboard([
            Markup.callbackButton('Создать стену', `createWall`)
        ]))
    }
    get about() {
        return Extra.markup(Markup.inlineKeyboard([
            Markup.callbackButton('Узнать подробнее', `about`)
        ]))
    }
    get chooseUsername() {
        return Extra.markup(Markup.inlineKeyboard([
            Markup.callbackButton('дальше', `nextUsername`)
        ]))
    }
    chooseChannel(id) {
        return Extra.markup(Markup.inlineKeyboard([
            Markup.switchToChatButton('канал', Text.createChannelCommand(id))
        ]))
    }
    get _readyToPost() {
        return Extra.markup(Markup.inlineKeyboard([
            Markup.callbackButton('post', 'postIt')
        ]))
    }
    // get shareKeyboard() {
    //   return Extra.markup(
    //     Markup.inlineKeyboard([Markup.switchToChatButton('  ↗️  ', Text.inlineShareCommand)])
    //   )
    // }
    // queryKeyboard(url, mes) {
    //   return Markup.inlineKeyboard([
    //     Markup.urlButton('  🤖  ', `https://telegram.me/google_me_bot?start=${mes}`),
    //     Markup.urlButton('  ↗️  ', url)
    //   ])
    // }
    // get inlineShareKeyboard() {
    //   return Markup.inlineKeyboard([
    //     Markup.urlButton('  🔜  ', 'https://telegram.me/google_me_bot?start=share')
    //   ])
    // }
}
export default new Keyboard()
