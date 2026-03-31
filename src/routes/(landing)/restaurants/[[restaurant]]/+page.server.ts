import {PUBLIC_SERVER_BASE_URL} from "$env/static/public"
import axios from "axios"
import {error} from "@sveltejs/kit"

export async function load({params, url}) {
  let restaurants
  let restaurant
  let cities

  const searchValue = url.searchParams.get('q') ?? ''
  const city = url.searchParams.get('city') ?? ''
  const cost = url.searchParams.get('cost') ?? ''

  if (params.restaurant) {
    await axios.get(PUBLIC_SERVER_BASE_URL + '/restaurants/' + params.restaurant).then(res => {
      restaurant = res.data
    })

    if (!restaurant) {
      error(404, "Restaurant not found")
    }
  }

  if (
    (searchValue && searchValue.length > 0)
    || (city && city.length)
    || (cost && cost.length)
  ) {
    await axios.get(PUBLIC_SERVER_BASE_URL + '/api/restaurants/search/', {
      params: {
        title: searchValue,
        city,
        cost
      }
    }).then(res => {
      restaurants = res.data
    })
  } else {
    await axios.get(PUBLIC_SERVER_BASE_URL + '/restaurants').then(res => {
      restaurants = res.data
    })
  }

  await axios.get(PUBLIC_SERVER_BASE_URL + '/restaurants/cities').then(res => {
    cities = res.data
  })

  return {
    searchValue,
    restaurants,
    restaurant,
    cities,
    city,
    cost
  }
}