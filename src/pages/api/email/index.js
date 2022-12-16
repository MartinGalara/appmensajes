const { postEmail } = require('../../../utils/backUtils.js')

export default async (req, res) => {

    const { method } = req;

try {
    
    switch (method) {
        case 'POST':
            const { userId, title, body, sendTo, date, categoryId } = req.body;
            const newEmail = await postEmail(userId, title, body, sendTo, date, categoryId)
            return res.status(200).json(newEmail)
        default:
            return res.json('wrong request')
    }

} catch (error) {
        
    return res.status(400).json(error.message)

}
}