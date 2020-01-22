'use strict'

const stripe = require('stripe')(process.env.STRIPE_API_PRIVATE_KEY)

module.exports = {
  create: async ctx => {
    const {
      address,
      amount,
      items,
      postalCode,
      token,
      city,
    } = ctx.request.body

    try {
      await stripe.charges.create({
        amount: parseInt(amount * 100),
        currency: 'eur',
        description: `Order ${new Date()} by ${ctx.state.user.id}`,
        source: token,
      })

      const order = await strapi.services.order.create({
        user: ctx.state.user.id,
        address,
        amount,
        items,
        postalCode,
        city,
      })

      return order
    } catch (err) {
      throw new Error(err)
    }
  }
}
