const { getEmailById, deleteEmail, putEmail} = require('../../../utils/backUtils.js')

export default async (req, res) => {
    const { method } = req;
    const { id } = req.query;

try {
    
    switch (method) {
        case 'GET':
            const email = await getEmailById(id)
            return res.status(200).json(email)
        case 'PUT':
            const { title, body, sendTo, date, categoryId } = req.body
            const emailToUpdate = await putEmail(id, title, body, sendTo, date, categoryId)
            return res.status(200).json(emailToUpdate)
        case 'DELETE':
            const delEmail = await deleteEmail(id)
            return res.status(200).json(delEmail)
        default:
            return res.json('wrong request')
    }
} catch (error) {
        
    return res.status(400).json(error.message)

}
}
