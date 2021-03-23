import { apiLocation } from 'config'

export const getProducts = ({ categories = [] }) => {
  let url = `${apiLocation}/items`

  if (categories && categories.length) {
    url += `?categories=${categories.join(',')}`
  }

  return fetch(url)
    .then(res => res.json())
}
