const { User } = require('../../models/index')
const { hashPassword } = require('../../helpers/bcrypt')

async function createUsers() {
  if (process.env.NODE_ENV === 'test') {
    await User.bulkCreate([{
      email: "admin@admin.com",
      password: hashPassword('password'),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: "user@user.com",
      password: hashPassword('password'),
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  }
}

module.exports = {
    createUsers
}