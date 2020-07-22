const { Product } = require("../../models/index")

async function initializeProduct() {
    if (process.env.NODE_ENV === "test") {
        const product = await Product.create({
            name: "Shampo",
            image_url: "http:shampo.com",
            price: 10000,
            stock: 10
        })

    }
}

async function clearProductsDatabase() {
    if (process.env.NODE_ENV === "test") {
        await Product.destroy({truncate:true})
    }
}

module.exports = {
    initializeProduct,
    clearProductsDatabase
}