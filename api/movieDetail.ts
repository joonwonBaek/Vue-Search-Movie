import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
const { API_KEY } = process.env
export default async function (req: VercelRequest, res: VercelResponse) {
  const { method = 'GET', id } = req.body
  const { data: responseData } = await axios({
    url: `https://omdbapi.com?apikey=${API_KEY}&i=${id}&plot=full`,
    method
  })
  res.status(200).json(responseData)
}
