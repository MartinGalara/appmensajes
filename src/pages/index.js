/*import {conn} from "../database.js"

export default async (req, res) => {
 const response = await conn.query("SELECT NOW()")

 return res.json({message: "pong",time: response.rows[0].now})
}*/

export default function Index() {
  return (
    <div>
      Login
    </div>
  )
}
