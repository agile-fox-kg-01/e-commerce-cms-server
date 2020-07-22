const bcrypt = require('bcryptjs')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(5)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

// console.log(hashPassword('1234'))

function comparePassword(inputanPassword, databasePassword) {
    return bcrypt.compareSync(inputanPassword, databasePassword)
}

// console.log(comparePassword('admin', '$2a$05$AdcVZ3L0dhDJ3HKyojt.rur4kJiW6/7Iq61ARm28x1kLd1D9043Bq'))
// console.log(comparePassword('ichlasul amal', '$2a$05$udz8eCyoShSUi6Sqyy62xuOPQGqeM5Nm5s23UoMtALT7XbNeNOmA.'))

module.exports = {
    hashPassword,
    comparePassword
}