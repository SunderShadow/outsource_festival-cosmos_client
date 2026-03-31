import {PUBLIC_SERVER_BASE_URL} from "$env/static/public"
import axios from "axios"
import {error} from "@sveltejs/kit"

export async function load({params, url}) {
  let manyNews = []
  let news = null

  if (params.news) {
    await axios.get(PUBLIC_SERVER_BASE_URL + '/news/' + params.news).then(res => {
      news = res.data
    })

    if (!news) {
      error(404, "News not found")
    }
  }

  await axios.get(PUBLIC_SERVER_BASE_URL + '/news').then(res => {
    manyNews = res.data
  })

  return {
    manyNews,
    news
  }
}