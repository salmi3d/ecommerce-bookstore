<template>
  <div>
    <a class="uk-button uk-button-primary uk-margin" @click="$router.go(-1)"><span uk-icon="arrow-left"></span> go back</a>
    <client-only placeholder="Chargement...">
      <div uk-grid>

        <div class="uk-width-expand@m">
          <Cart />
        </div>

        <div class="uk-width-1-3@m">
          <div class="uk-card uk-card-default uk-card-body uk-width-1-1@m">

            <form @submit.stop.prevent="processCheckout">
              <fieldset class="uk-fieldset">

                <legend class="uk-legend">Checkout</legend>

                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Address</label>
                  <input class="uk-input" v-model="address" type="text">
                </div>

                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">City</label>
                  <input class="uk-input" v-model="city" type="text">
                </div>

                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Postal code</label>
                  <input class="uk-input" v-model="postalCode" type="text">
                </div>

                <div class="uk-margin">
                  <label for="card">Card</label>
                  <card
                    ref="card-stripe"
                    :stripe="$store.state.env.STRIPE_API_PUBLIC_KEY"
                    @change='complete = $event.complete'
                  />
                </div>

                <div class="uk-margin">
                  <button class="uk-button uk-button-primary uk-width-1-1" type="submit">Proceed to checkout ({{ amount }}€)</button>
                </div>

              </fieldset>
            </form>
          </div>
        </div>

      </div>
    </client-only>
  </div>
</template>

<script>
import Cart from '~/components/Cart.vue'
import { Card, createToken } from 'vue-stripe-elements-plus'
import { mapMutations } from 'vuex'
import strapi from '~/utils/Strapi'

export default {
  computed: {
    amount() {
      return this.$store.getters['cart/amount']
    }
  },
  components: {
    Card,
    Cart
  },
  data() {
    return {
      address: '',
      postalCode: '',
      city: '',
      complete: false,
      loading: false
    }
  },
  methods: {
    ...mapMutations({
      emptyCart: 'cart/empty'
    }),
    async processCheckout() {
      this.loading = true
      let token
      try {
        const response = await createToken()
        token = response.token.id
      } catch (err) {
        alert(err || 'An error occurred.')
        this.loading = false
        return
      }
      try {
        await strapi.createEntry('orders', {
          amount: this.$store.getters['cart/amount'],
          items: this.$store.getters['cart/items'],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token
        })
        alert('Your order have been successfully submitted.')
        this.emptyCart()
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert(err || 'An error occurred.')
      }
    }
  }
}
</script>
