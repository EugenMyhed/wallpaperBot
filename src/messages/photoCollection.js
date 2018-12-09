'use strict'

const arr = [
    'AgADAgADaa0xG_vguEqs9i0bYXZcNJ7ltw4ABOmrQKfdgK--XRYCAAEC',
    'AgADAgADca0xG_vguEr9hHGQs0JkGRzNtw4ABN_AZcD3yEpPn9oFAAEC',
    'AgADAgADcq0xG_vguEouP8TOHvE6AAHg57cOAARDidirBvO1eXAVAgABAg',
    'AgADAgADc60xG_vguEqt7G2bJPYHcIratw4ABFLKr8UzAiISqN4FAAEC',
    ['AgADAgADeq0xG_vguErdasnu5UerAXnntw4ABNOZyUnqbXpvGxkCAAEC', 'AgADAgADea0xG_vguEoT9_1ELiQyvGU98w4ABKTGmXeoRHeKERQCAAEC'],
    'AgADAgADdK0xG_vguEqDFjV42BX7eHC2tw4ABCcHhw7wsq8PmNYFAAEC',
    null,
    ['AgADAgADfa0xG_vguErPbS63kQq9Ydeutw4ABD9NtdrRXW4zf-AFAAEC', 'AgADAgADfK0xG_vguEpNzNArN-pbgx5J8w4ABMpSNBR9yHTI6hMCAAEC'],
    'AgADAgADda0xG_vguErC39R2NBAsFWZG8w4ABIg5c1hImFK0BxUCAAEC',
    ['AgADAgADfq0xG_vguEqWImK794UKlg_rtw4ABAtLNOuV0Y7dnRMCAAEC', 'AgADAgADf60xG_vguEoftIbnu41eEo8AAfUOAAQBYZ47VLNJxI4jAAIC'],
    'AgADAgADdq0xG_vguEqIF2veizCjbu3Btw4ABM3lJfDBVvXix94FAAEC',
    'AgADAgADd60xG_vguErTNMW78l9_SNNC8w4ABITTQ2TbKd1AjRUCAAEC',
    null,
    null,
    null,
    null,
    'AgADAgADeK0xG_vguEo7Lu70q0T-tZrZtw4ABL-5NQ34mn9IDtwFAAEC',
]
class Coll {
    getPhoto(num) {
        if (arr[num - 1])
            return arr[num - 1]
        else return null
    }
}
export default new Coll()
