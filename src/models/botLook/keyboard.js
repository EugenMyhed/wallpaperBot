'use strict'
import Markup from 'telegraf/markup'
import Extra from 'telegraf/extra'

import Text from './messageText'

class Keyboard {
    //#botttom
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
                [Text.createPost_key],
                [Text.share_key],
                [Text.mainKeyboard]
            ])
            .oneTime()
            .resize()
            .extra()
    }
    //#after message
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
    get post_key() {
        return Extra.markup(Markup.inlineKeyboard([
            Markup.callbackButton('🔥', 'fire'),
            // Markup.callbackButton('post', 'postIt')
        ]))
    }
    get afterSend() {
        return Extra.markup(Markup.inlineKeyboard([
            Markup.callbackButton('Отправить еще', `sendMore`)
        ]))
    }
    shareMyWall(user_id) {
        return Extra.markup(Markup.inlineKeyboard([
            Markup.switchToChatButton('  ↗️  ', `${Text.shareMyWall_c}${user_id}`)
        ]))
    }
    //#inline in query
    get inline_post_key() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('🔥', 'fire'),
        ])
    }
    inlineShareKeyboard(user_id) {
        return Markup.inlineKeyboard([
            Markup.urlButton('  🏗  ', `https://telegram.me/wallpaperNewsBot?submit=${user_id}`)
        ])
    }
}
export default new Keyboard()
