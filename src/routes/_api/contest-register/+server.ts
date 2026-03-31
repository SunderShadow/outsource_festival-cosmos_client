import {PUBLIC_SERVER_BASE_URL} from "$env/static/public"
import axios from "axios"
import {json} from "@sveltejs/kit"

export const POST = async ({request,}) => {
  const inputData = await request.json()
  const serverData = await axios.post(PUBLIC_SERVER_BASE_URL + '/api/contest/register', inputData)
    .then(res => res.data)
    .catch(e => e.response.data)
  return json(serverData)
}