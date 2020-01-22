<template>
  <div class="uk-card uk-card-default uk-card-body uk-margin" uk-sticky="offset: 20; bottom: true">
    <img src="~/assets/img/shopping-cart.png" class="uk-align-center" width="250" alt="" />

    <div v-if="amount > 0">

      <table class="uk-table uk-table-striped uk-table-small uk-table-responsive">
        <thead>
          <tr>
            <th class="uk-width-1-2">Name</th>
            <th class="uk-table-shrink"> Price</th>
            <th class="uk-table-shrink">Quantity</th>
            <th class="uk-table-shrink"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in selectedBooks" :key="book.id">
            <td>{{ book.name }}</td>
            <td>{{ book.price }}€</td>
            <td>{{ book.quantity }}</td>
            <td>
              <a class="uk-margin-left"><span class="uk-badge" @click="addToCart(book)">+</span></a>
              <a><span class="uk-badge" style="background: #f0506e;" @click="removeFromCart(book)">-</span></a>
            </td>
          </tr>
        </tbody>
      </table>

      <button class="uk-button uk-button-primary uk-width-1-1" name="button"
        v-if="$route.path !== '/orders/checkout'"
        @click="goToCheckout"
      >
        Press to checkout ({{ amount }}€)
      </button>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    id() {
      return this.$route.params.id
    },
    selectedBooks() {
      return this.$store.getters['cart/items']
    },
    amount() {
      return this.$store.getters['cart/amount']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  },
  methods:{
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove'
    }),
    goToCheckout() {
      const isLoggedIn = this.$store.getters['auth/username']

      if (!isLoggedIn) {
        this.$router.push({ name: 'users-signup' })
        return
      }
      this.$router.push({ name: 'orders-checkout' })
    },
  }
}
</script>
