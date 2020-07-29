const { sequelize } = require('../../models/index')
const { queryInterface } = sequelize
const { hashPassword } = require('../../helpers/bcrypt')
const fs = require('fs')

async function seedUsers() {
  let data = JSON.parse(fs.readFileSync('user.json', 'utf8'))
    data = data.map(temp => {
      temp.password = hashPassword(temp.password)
      temp.createdAt = new Date()
      temp.updatedAt = new Date()
      return temp
    })
  await queryInterface.bulkInsert('Users', data)
}

async function seedProducts() {
  let data = JSON.parse(fs.readFileSync('product.json', 'utf8'))
    data = data.map(temp => {
      temp.createdAt = new Date()
      temp.updatedAt = new Date()
      return temp
    })
   await queryInterface.bulkInsert('Products', data, {})
}

module.exports = {
  seedUsers,
  seedProducts
}