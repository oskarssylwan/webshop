import { apiLocation } from 'config'

export const getProducts = ({ categories = [], itemIds = [] }) => {
  let url = `${apiLocation}/items`
  const queryParams = []

  if (categories && categories.length) queryParams.push(`categories=${categories.join(',')}`)
  if (itemIds && itemIds.length) queryParams.push(`itemIds=${itemIds.join(',')}`)

  if (queryParams.length) {
    url += `?${queryParams.join('&')}`
  }

  return fetch(url)
    .then(res => res.json())
}

export const getProduct = itemId =>
  fetch(`${apiLocation}/items/${itemId}`)
    .then(res => res.json())
