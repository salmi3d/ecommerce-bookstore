import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    let cart = []

    if (req && req.headers && req.headers.cookie) {
      const parsedCookies = cookieparser.parse(req.headers.cookie)

      user = (parsedCookies.user && JSON.parse(parsedCookies.user)) || null
      cart = (parsedCookies.cart && JSON.parse(parsedCookies.cart)) || []
    }

    commit('auth/setUser', user)
    commit('cart/setItems', cart)
  }
}
