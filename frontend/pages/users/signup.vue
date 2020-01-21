<template>
  <div class="uk-child-width-1-2@m uk-grid">
    <div class="uk-card uk-card-default uk-card-small uk-card-body">
      <img src="~/assets/img/sign-up.jpg" width="640" class="uk-align-center" alt="">
    </div>
    <div class="uk-card uk-card-default uk-card-body">
      <form @submit.stop.prevent="signUp">
        <fieldset class="uk-fieldset">
          <legend class="uk-legend">SIGN UP</legend>

          <div class="uk-margin">
            <label class="uk-form-label">Username</label>
            <input class="uk-input" v-model="username" type="text">
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Email</label>
            <input class="uk-input" v-model="email" type="email">
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Password</label>
            <input class="uk-input" v-model="password" type="password">
          </div>

          <div class="uk-margin">
            <button class="uk-button uk-button-primary uk-width-1-1" :disabled="loading" type="submit">Submit</button>
          </div>

          <div class="uk-margin">
            <p>
              Already have an account?
              <router-link :to="{ name: 'users-signin'}">Sign In</router-link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import strapi from '~/utils/Strapi'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async signUp() {
      try {
        this.loading = true
        const response = await strapi.register(
          this.username,
          this.email,
          this.password
        )
        this.loading = false
        this.setUser(response.user)
        this.$router.go(-1)
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>
