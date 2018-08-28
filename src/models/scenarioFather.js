'use strict'

import instrumentHolder from './instrumentHolder'
import logger from './logger';
class Scenarion extends instrumentHolder {
    constructor(name, ctx) {
        super()
        this.name = name
        ctx.session[this.name] = ctx.session[this.name] || 0
        this.step = ctx.session[this.name]

    }
    setSteps(steps) {
        this.steps = steps
    }
    addStep(step) {
        this.steps.push(step)
    }
    //---
    makeStep(dataChannel, ctx, next, step) {
        this.step = step
        ctx.session[this.name] = step
        ctx.session.scenario = this.name
        this.control(dataChannel, ctx, next)
    }
    nextStep(ctx) {
        this.step++;
        ctx.session[this.name] = this.step
        if (this.step == this.steps.length)
            this.killScenario(ctx)
    }
    killScenario(ctx) {
        ctx.session.scenario = 'empty'
    }
    start(dataChannel, ctx, next) {
        logger.info(`${this.name} started!!!!`)
        this.makeStep(dataChannel, ctx, next, 0)
    }
    async control(dataChannel, ctx, next) {
        //logger.debug(`${dataChannel}`)
        logger.debug(`${this.name}`)
        let properReaction = null
        const current_step = this.steps[this.step]
        logger.debug(`Current step: ${this.step}`)
        current_step.dataChannel.forEach(channel => {
            if (channel == dataChannel)
                properReaction = current_step.reaction
        })
        // logger.debug(typeof properReaction)
        if (properReaction) {
            //logger.debug(`Start react`)
            await properReaction(ctx, next)
            //logger.debug(`Reacted`)
            this.nextStep(ctx)
            //logger.debug(`stepted`)
        } else {
            logger.debug(`Find interruption`)
            let properInteruuption = null
            if (current_step.interrupts[dataChannel]) {
                await current_step.interrupts[dataChannel](ctx, next)
            } else if (current_step.interrupts.all)
                await current_step.interrupts.all(ctx, next)
            else next()
        }
    }
}
export default Scenarion
