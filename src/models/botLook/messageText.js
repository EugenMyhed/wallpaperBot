'use strict'

class Text {
    //----------------------------
    // старт
    get greetingInstruction1() {
        return 'Смотрю вы у нас впервые, создайте стену сразу или псомотрите описание)'
    }
    get greetingInstruction2() {
        return 'оно тут ⏬'
    }
    greetingUser(username) {
        return `Приветствую тебя ${username} )`
    }
    get missunderstanding() {
        return 'Я вас не понимаю 🙃'
    }
    //----------------------------
    // текст для клавиатуры
    get mainKeyboard() {
        return 'Обратная связь'
    }

    //---------------------------
    //Создание поста
    get createPost_key() {
        return 'Запостить что-то 🔥'
    }
    get _createPost() {
        return 'Окей, просто тправь нам что-то'
    }
    get createPost_forbid() {
        return 'данный тип контента пока недоступен)'
    }
    //----------------------------
    //создание стены
    get usernameWarning() {
        return 'Ваш ник должен быть в формате текста)'
    }
    createChannelCommandInline(id) {
        return `@wallpaperNewsBot /makeThisChannelMyWallpaper${id}`
    }
    get createChannelCommandIndexOf() {
        return `@wallpaperNewsBot /makeThisChannelMyWallpaper`
    }
    createChannelCommand(id) {
        return `/makeThisChannelMyWallpaper${id}`
    }
    get createChannelInvalid() {
        return 'Вы уже создали стену, вернитесь в бота и наслаждайтесь_'
    }
    get afterChannelSetChannel() {
        return 'Супер, стена выбрана, теперь вернитесь обратно в бота'
    }
    get afterChannelSetBot() {
        return 'И снова ты здесь, шик, все готово к работе, теперь самое время запостить что-то'
    }
    get chooseUsername() {
        return 'Выбери псевдоним, или нажми "дальше" что бы использовать свой ник telegram:'
    }
    setChannelInstruction0(username) {
        return `Супер, теперь я буду называть тебя ${username}. \n Приятно познакомиться) Теперь что бы добавить к твоему унылому телеграмчику собственную страницу сделай следующее ⏬ `
    }
    get setChannelInstruction1() {
        return `Создай канал, оформи его хорошенько, назови, опиши и добавь аватарку. Это совсем не обязательно, но тем кто начнет тебя читать будет приятно`
    }
    get setChannelInstruction2() {
        return 'Самое главно! Добавь меня администратором канала и отправь туда /makeThisChannelMywallpaper . \n И лучше скопируй эту строку, а то она длинючая 😆'
    }
    get setChannelInstruction3() {
        return `А дальше я сделаю все за тебя, можешь позже удалить то сообщение из канала что бы вышло красивенько, я совсем не обижусь)`
    }
    get setChannelInstruction4() {
        return `Ах да, канал может быть как приватным так и публичным, вдруг ты не хочешь открыть себя для всех 😛`
    }
    setChannelArray(username) {
        const sci1 = this.setChannelInstruction0(username)
        return [{
                text: sci1,
                time: 3000
            },
            {
                text: this.setChannelInstruction1,
                time: 3000
            }, {
                text: this.setChannelInstruction2,
                time: 3000
            }, {
                text: this.setChannelInstruction3,
                time: 3000
            }, {
                text: this.setChannelInstruction4,
                time: 2000
            }
        ]
    }
    //----------------------------
    //настройки обратной связи
    get feedbackInstinctivization() {
        return 'Если хотите, то свяжитесь с нами и мы ответим вам в ближайшее свободное от сна время)'
    }
    get afterFeedback() {
        return 'Спасибо за отзыв, друг)'
    }
    get setChannelCommand() {
        return '/channelSetPasswordIV'
    }
    get channelSetText() {
        return 'Канал для вывода настроен'
    }
    //----------------------------
    // errors
    get err() {
        return 'Где-то тут ошибка, скорее всего во мне, так что подожди, я все исправлю сам'
    }
}

export default new Text()
