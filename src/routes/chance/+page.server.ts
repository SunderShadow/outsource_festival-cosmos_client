import axios from "axios"
import {PUBLIC_SERVER_BASE_URL} from "$env/static/public"

export const load = async () => {
  return {
    restaurants: await axios.get(PUBLIC_SERVER_BASE_URL + '/api/restaurants/id-names').then(res => res.data),
  }
}