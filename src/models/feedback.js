'use strict'

import MessageText from './botLook/messageText'
import Keyboard from './botLook/keyboard'
import logger from './logger'

import {
  getFire,
  nullFire
} from './bot'

const Text = new MessageText()
const keyboard = new Keyboard()

let chatId = '-1001253958588'
export default function (bot) {

  bot.hears(Text.setChannelCommand, ctx => {
    ctx.reply(Text.channelSetText)
    chatId = ctx.message.chat.id
    logger.debug(chatId)
  })

  bot.hears(Text.mainKeyboard, (ctx, next) => {
    if (!ctx.session.feedback) {
      ctx.session.feedback = true
      ctx.reply(Text.feedbackInstinctivization, keyboard.emptyKeyboard)
    }else next()
  })
  bot.on('text', (ctx, next) => {
    if (ctx.session.feedback) {
      ctx.session.feedback = false
      ctx.reply(Text.afterFeedback, keyboard.mainKeyboard)
      if (chatId && ctx.message.chat.id != chatId) {
        const tag = ctx.session.tag
        ctx.session.tag = ''
        ctx.telegram.sendMessage(
          chatId,
          `Wallpaper from: @${ctx.message.chat.username} \n=>${ctx.message.text}`
        )
      }
    } else next()
  })
}
export function getChatId() {
  return chatId
}