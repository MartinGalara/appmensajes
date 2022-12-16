const { Category } = require('../utils/database.js')

const postCategory = async (name) => {
    const newCategory = await Category.create({name: name})
    return newCategory;
}

const deleteCategory = async (id) => {
    const delCategory = await Category.findByPk(id)
    await delCategory.destroy()
    return "Categoria eliminada";
}

const getAllCategories = async () => {
    const allCategories = await Category.findAll()
    return allCategories;
}

module.exports = { postCategory , deleteCategory, getAllCategories}
