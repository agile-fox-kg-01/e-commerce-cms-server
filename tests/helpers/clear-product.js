const { Product } = require('../../models/index');

const clearProduct = async () => {
    if(process.env.NODE_ENV === 'test') {
        await Product.destroy({ truncate: true });
    }
}

module.exports = clearProduct;