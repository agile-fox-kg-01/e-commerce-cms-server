const { sequelize } = require('../../models/index')
const { queryInterface } = sequelize

async function clearUsers() {
    if (process.env.NODE_ENV === 'test') {
        await queryInterface.bulkDelete('Users', {})
    }
}

module.exports = {
    clearUsers
}