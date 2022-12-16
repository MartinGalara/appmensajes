const { postCategory, deleteCategory, getAllCategories } = require('../../../utils/backUtils.js')

export default async (req, res) => {

    const { method } = req;

try {
    
    switch (method) {
        case 'GET':
            const allCategories = await getAllCategories()
            return res.status(200).json(allCategories)
        case 'POST':
            const { name } = req.body;
            const newCategory = await postCategory(name)
            return res.status(200).json(newCategory)
        case 'DELETE':
            const { id } = req.query;
            const delCategory = await deleteCategory(id)
            return res.status(200).json(delCategory)
        default:
            return res.json('wrong request')
    }

} catch (error) {
        
    return res.status(400).json(error.message)

}

}