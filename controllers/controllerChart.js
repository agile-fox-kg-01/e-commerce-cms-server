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
          ProductId: newCart.ProductId,
          UserId: newCart.UserId
        },
        include: Product
      })
      console.log('---->Checkpoint1')
      console.log(exist)

      if (exist) {
        console.log(exist)
        // console.log(typeof exist.quantity)
        // console.log(newCart.quantity)
        // console.log(typeof newCart.quantity)
        const newQuantity = exist.quantity + newCart.quantity
        console.log('---->Checkpoint2')
        console.log(newQuantity)
        if (newQuantity > exist.Product.stock) {
          console.log(exist.Product.stock)
          console.log('---->Checkpoint3')
          throw { name: 'Stock kurang'}
        } else {
          const cart = await Cart.update({ quantity: newQuantity }, {
            where: {
              ProductId: newCart.ProductId
            }
          })
          res.status(200).json({
            message: 'Berhasil ditambahkan'
          })
        }

      } else {
        console.log("Checkpoin 4")

        try {
          const chart = await Cart.create(newCart)
          res.status(201).json(chart)
        } catch (err) {
          console.log(err)
        }
      }

      
    } catch (err) {
      console.log(err.name)
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
  static async deleteChart(req, res, next) {
    try {
      console.log('1 masih')
      const chart = await Cart.destroy({
        where: {
          UserId: req.userLogin.id,
          ProductId: req.body.ProductId
        }
      })
      if (chart) {
        res.status(200).json({
          message: "Succes delete"
        })
      } else {
        throw ({ name: "chart not found"})
      }
    } catch (err) {
      next(err)
      console.log(err)
    }
  }
}
module.exports = ControllerChart