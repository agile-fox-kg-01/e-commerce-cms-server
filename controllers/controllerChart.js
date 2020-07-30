const { Cart, Product } = require('../models/index')

class ControllerChart {
  static async postAddChart(req, res, next) {
    const newCart = {
      quantity: Number(req.body.quantity),
      ProductId: Number(req.body.ProductId),
      UserId: req.userLogin.id
    }
    
    // console.log(typeof Number(req.body.quantity))
    // console.log(typeof req.body.ProductId)
    // console.log(typeof req.userLogin.id)
    console.log(typeof newCart.quantity)
    console.log(typeof newCart.ProductId)
    console.log(typeof newCart.UserId)
    console.log(newCart)


    try {
      const exist = await Cart.findOne({
        where: {
          ProductId: newCart.ProductId
        },
        include: Product
      })
      // console.log(exist.Product.stock)

      if (exist) {
        // console.log(exist.quantity)
        // console.log(typeof exist.quantity)
        // console.log(newCart.quantity)
        // console.log(typeof newCart.quantity)
        const newQuantity = exist.quantity + newCart.quantity
        // console.log(newQuantity)
        // console.log(Number(Product.dataValues.stock))
        if (newQuantity > exist.Product.stock) {
          throw { name: 'Stock kurang'}
        }

        const cart = await Cart.update({ quantity: newQuantity }, {
          where: {
            ProductId: newCart.ProductId
          }
        })
        res.status(200).json({
          message: 'Berhasil ditambahkan'
        })
      } else {
        const chart = await Cart.create(newCart)
        res.status(201).json(chart)
      }

      
    } catch (err) {
      // console.log(err.name)
      res.status(500).json({
        eror: err.name
      })
    }
  }
  static async showChart(req, res, next) {
    const UserId = req.userLogin.id
    try {
      const charts = await Cart.findAll({
        where: {
          UserId
        },
        include: Product
      })
      // const array = []
      // charts.forEach(chart => {
      //   array.push({
      //     name: chart.name,
      //     image_url: chart.image_url,
      //     price: chart.price
      //   })
      // })
      // res.status(200).json({
      //   "Chart": array
      // })
      res.status(200).json({
        charts
      })
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = ControllerChart