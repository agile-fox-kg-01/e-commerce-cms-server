const { User } = require('../../models/index')

async function clearUsers() {
    if (process.env.NODE_ENV === 'test') {
        await User.destroy({ truncate: true })
    }
}

module.exports = {
    clearUsers
}