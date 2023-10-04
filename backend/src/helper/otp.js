const moment = require('moment')


const generate_otp = (long) => {
  let otp = ''
  for (let i = 0; i < long; i++) {
    otp += `${Math.random().toString()[2]}`
  }
  return otp

}

const generate_expiration_time = (minute) => {
  return moment().add(parseInt(minute), 'minutes').toString()
}

// function tes_time(time){
//   console.log(time)
//   console.log(moment().toString())

//   return moment().toString() < time

// }

// console.log(tes_time(generate_expiration_time(1)))

module.exports = {
  generate_otp,
  generate_expiration_time
}