import {PUBLIC_SERVER_BASE_URL} from "$env/static/public"
import axios from "axios"
import {error} from "@sveltejs/kit"

export async function load({params, url}) {
  let restaurants
  let restaurant

  const searchValue = url.searchParams.get('q') ?? ''

  if (params.restaurant) {
    await axios.get(PUBLIC_SERVER_BASE_URL + '/restaurants/' + params.restaurant).then(res => {
      restaurant = res.data
    })

    if (!restaurant) {
      error(404, "Restaurant not found")
    }
  }

  if (searchValue && searchValue.length > 0) {
    await axios.get(PUBLIC_SERVER_BASE_URL + '/restaurants/search/' + searchValue).then(res => {
      restaurants = res.data
    })
  } else {
    await axios.get(PUBLIC_SERVER_BASE_URL + '/restaurants').then(res => {
      restaurants = res.data
    })
  }

  return {
    searchValue,
    restaurants,
    restaurant
  }
}