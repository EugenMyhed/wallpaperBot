'use strict'

class keyboardController {
    constructor() {
        this.keyType = {}
        this.keyHolder = {}
    }
    /*static*/
    addKeyboardType(typeName, typeFunction) {
        this.keyType[typeName] = typeFunction
    }

    /*static*/
    getKeyValue(ctx, num) {
        const key = this.keyHolder[num]
        // console.log(this.keyType)
        // console.log(this.keyHolder)
        return this.keyType[key.type](key.arr(ctx))
    }
    getFunction(num) {
        const key = this.keyHolder[num]
        return this.keyType[key.type]
    }
    addCloneToStep(num, parentNum) {
        // console.log(this.keyType)
        // console.log(this.keyHolder)
        this.keyHolder[num] = Object.assign({}, this.keyHolder[parentNum])
    }
    /*static*/
    addKeyboardToStep(num, type, varietyFunction) {
        if (!this.keyHolder) this.keyHolder = {}
        // console.log(this.keyType)
        if (typeof varietyFunction == "function")
            this.keyHolder[num] = {
                type: type,
                arr: varietyFunction
            }
        else {
            // const newVarietyFunction = function () { return varietyFunction }
            this.keyHolder[num] = {
                type: type,
                arr: () => { return varietyFunction }
            }
        }
    }
}
export default new keyboardController();
