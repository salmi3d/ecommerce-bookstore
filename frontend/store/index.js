import cookieparser from 'cookieparser'

export const state = () => ({
  env: {}
})

export const mutations = {
  setEnv (state, env) {
    state.env = env
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.server) {
      commit('setEnv', {
        STRIPE_API_PUBLIC_KEY: process.env.STRIPE_API_PUBLIC_KEY
      })
    }

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
