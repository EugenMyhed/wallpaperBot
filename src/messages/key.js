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

    const keyArr = [
        ['Узнать больше', 'Начать']
    ]
    return keyArr
})
keyboardController.addCloneToStep(2, 1)
keyboardController.addCloneToStep(3, 1)

keyboardController.addKeyboardToStep(2, 's', [
    ['Начать']
])

keyboardController.addKeyboardToStep(3, 's', [
    ['Создать пост']
])
keyboardController.addCloneToStep(3, 3)

keyboardController.addKeyboardToStep(4, 's', [
    ['Назад']
])
keyboardController.addCloneToStep(1, 3)

export default keyboardController
