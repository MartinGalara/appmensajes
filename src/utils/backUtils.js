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

const postEmail = async (UserId, title, body, sendTo, date, CategoryId) => {
    const newEmail = await Email.create({
        title,
        body,
        sendTo,
        date,
        UserId,
        CategoryId
    })
    return newEmail
}

const getEmailById = async (id) => {
    const email = await Email.findByPk(id)
    return email
}

const deleteEmail = async (id) => {
    const emailToDelete = await Email.findByPk(id)
    await emailToDelete.destroy()
    return "Correo eliminado";
}

const putEmail = async (id, title, body, sendTo, date, CategoryId) => {
    const emailToUpdate = await Email.findByPk(id)
    await emailToUpdate.update({
        title,
        body,
        sendTo,
        date,
        CategoryId
    })
    return emailToUpdate
}

module.exports = { postCategory , deleteCategory, getAllCategories, getUserData, createUser, postEmail, getEmailById, deleteEmail, putEmail}
