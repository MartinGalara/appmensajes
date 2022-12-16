// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {conn} from "../../utils/database.js"

export default async (req, res) => {

 const response = await conn.query("SELECT NOW()")

 return res.json({message:"pong",time:response[0][0].now})
}
