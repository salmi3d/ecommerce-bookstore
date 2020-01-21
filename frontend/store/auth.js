import Cookies from 'js-cookie'

const COOKIE_VAR_USER = 'user'

export const state = () => {}

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
