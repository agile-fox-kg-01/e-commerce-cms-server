const { Category } = require('../models/index');

class CategoryController {
    static async getCategoryRootHandler(req, res, next) {
        try {
            const categories = await Category.findAll();
            
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    static async postCategoryRootHandler(req, res, next) {
        const newCategory = {
            name: req.body.name
        };

        try {
            const category = await Category.create(newCategory);
            
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    } 
}

module.exports = CategoryController;