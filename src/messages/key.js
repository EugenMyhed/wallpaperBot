'use strict'

import Markup from 'telegraf/markup'
import Extra from 'telegraf/extra'

import keyboardController from '../framework/keyboardController'
import config from '../config/config-file'

keyboardController.addKeyboardType("s", (arr) => {
    return Markup.keyboard(arr)
        .resize()
        .extra()
})

keyboardController.addKeyboardToStep(1, 's', (ctx) => {
    let keyArr = [
        ['Обмен!'],
        ['Статус заявки', 'Инструкция']
    ]
    if (config.master_id.includes(ctx.message.from.id))
        keyArr = keyArr.concat([
            ['Рассылка'],
            ['Статистика админа']
        ])
    // console.log(keyArr)
    return keyArr
})

keyboardController.addKeyboardToStep(2, 's', [
    ['Как сделать обмен?', 'Экспресс обмен'],
    ['Автогарант', 'Поддержка'],
    ['Назад']
])

keyboardController.addCloneToStep(2, 2)

keyboardController.addCloneToStep(3, 2)

keyboardController.addCloneToStep(4, 2)

keyboardController.addCloneToStep(5, 2)

keyboardController.addKeyboardToStep(6, 's', [
    ['Связаться с администратором'],
    ['Проблемы в работе бота', 'Пожелания/улучшения'],
    ['Назад']
])

keyboardController.addKeyboardToStep(7, 's', [
    ['Назад'],
])

keyboardController.addCloneToStep(8, 7)

keyboardController.addCloneToStep(9, 7)

keyboardController.addKeyboardToStep(10, 's', [
    ['Отменить последнюю заявку'],
    ['Наши отзывы', 'Поддержка'],
    ['Назад'],
])

keyboardController.addKeyboardToStep(11, 's', [
    ['Обмен уже совершен'],
    ['Нужно изменить заявку'],
    ['Другая причина'],
])

keyboardController.addCloneToStep(12, 1)

keyboardController.addKeyboardToStep(13, 's', ['Пропустить'])

keyboardController.addCloneToStep(14, 1)

keyboardController.addCloneToStep(15, 10)

keyboardController.addCloneToStep(16, 6)

keyboardController.addCloneToStep(17, 6)

keyboardController.addCloneToStep(18, 6)

export default keyboardController
