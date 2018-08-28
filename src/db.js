'use strict'
import {
  getUser,
  setUser,
  setChannel
} from './models/db/dbController'


(async()=>{
console.log(await setChannel('652538218', '652538218'))
})()