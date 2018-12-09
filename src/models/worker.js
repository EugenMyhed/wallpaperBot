'use strict'
import schedule from 'node-schedule'

export default class {
    constructor(cron, job) {
        this.cron = cron
        this.job = job
    }

    startJob() {
        // this.job()
        this.worker = schedule.scheduleJob({
            rule: this.cron
        }, () => this.job())
    }
    stopJob() {
        this.worker.cancel()
    }
}
