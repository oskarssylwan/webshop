export const setup = {
  api_location:  process.env.REACT_APP_API_LOCATION || 'http://192.168.1.39:8080'
}


export const routes = {
  // Items
  create_item: setup.api_location + '/items',
  get_item: setup.api_location + '/items/',
  get_items_category: setup.api_location + '/items/?categories=',
  get_items_id: setup.api_location + '/items/?itemIDs=',
  // Yeah this wasn't as usefull as I thought it would be....

  // Users
  login: setup.api_location + '/user/authenticate'
}
