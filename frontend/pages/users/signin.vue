<template>
  <div class="uk-child-width-1-2@m uk-grid">
    <div class="uk-card uk-card-default uk-card-small uk-card-body">
      <img src="~/assets/img/sign-in.jpg" width="640" class="uk-position-center" alt="">
    </div>
    <div class="uk-card uk-card-default uk-card-body">
      <form @submit.stop.prevent="signIn">
        <fieldset class="uk-fieldset">

            <legend class="uk-legend">SIGN IN</legend>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">Email</label>
              <input class="uk-input" v-model="email" type="email" placeholder="paul.bocuse@gmail.com">
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
                No account yet?
                <router-link :to="{ name: 'users-signup'}">Sign Up</router-link>
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
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async signIn() {
      try {
        this.loading = true
        const response = await strapi.login(
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
