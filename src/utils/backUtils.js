const { Category, User, Email } = require('../utils/database.js')

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

const getUserData = async (email) => {
    const userData = await User.findAll({
    where:{
        email: email
    },
    include:{
        model: Email,
        include:{
            model: Category
        }
    }})
    return userData
}

const createUser = async (email) => {
    const newUser = await User.create({email:email})
    return newUser
}

module.exports = { postCategory , deleteCategory, getAllCategories, getUserData, createUser}
