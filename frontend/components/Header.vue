<template>
  <client-only>
    <nav class="uk-navbar-container" uk-navbar>

        <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
                <li class="uk-active"><router-link tag="a" class="navbar-brand" to="/" exact>BOOKSTORE</router-link></li>
                <li><router-link tag="a" class="navbar-brand" to="/genres" exact>Genres</router-link></li>
            </ul>
        </div>

        <div class="uk-navbar-right">

          <ul class="uk-navbar-nav" v-if="username">
              <li><a href="#" class="uk-link-reset"><img src="~/assets/img/avatar.png" class="uk-border-circle uk-margin-right" height="40" width="40" alt="">{{ username }}</a></li>
              <li><a href="#" @click="logout">Logout</a></li>
          </ul>

          <ul class="uk-navbar-nav" v-else>
              <li><router-link tag="a" to="/users/signup" exact>Sign Up</router-link></li>
              <li><router-link tag="a" to="/users/signin" exact>Sign In</router-link></li>
          </ul>

        </div>

    </nav>
  </client-only>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    username() {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    ...mapMutations({
      logout: 'auth/logout'
    })
  }
}
</script>
