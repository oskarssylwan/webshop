export const apiLocation = process.env.REACT_APP_LOCATION || 'http://localhost:3001'

export const setup = { apiLocation }

// Yeah this wasn't as usefull as I thought it would be....
export const routes = {
  createItem: `${setup.apiLocation}/items`,
  getItem: `${setup.apiLocation}/items/`,
  getItemsCategory: `${setup.apiLocation}/items/?categories=`,
  getItemsId: `${setup.apiLocation}/items/?itemIDs=`,
  login: `${setup.apiLocation}/user/authenticate`
}
