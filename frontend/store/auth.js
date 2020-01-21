import Cookies from 'js-cookie'

export const state = () => {}

const COOKIE_VAR_USER = 'user'

export const mutations = {
  setUser(state, user) {
    state.user = user
    Cookies.set(COOKIE_VAR_USER, user)
  },
  logout(state) {
    state.user = null
    Cookies.set(COOKIE_VAR_USER, null)
  }
}

export const getters = {
  username: state => {
    return state.user && state.user.username
  }
}
