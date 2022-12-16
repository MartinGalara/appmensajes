const { getUserData , createUser} = require('../../../utils/backUtils.js')

export default async (req, res) => {

    const { method } = req;

try {
    
    switch (method) {
        case 'GET':

            const { email } = req.query;
            const userData = await getUserData(email)

            if(userData.length === 0){
                const newUser = await createUser(email)
                return res.status(200).json(newUser)
            }

            return res.status(200).json(userData)
            
        default:
            return res.json('wrong request')
    }

} catch (error) {
        
    return res.status(400).json(error.message)

}

}