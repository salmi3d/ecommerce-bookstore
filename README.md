# 📚 Ecommerce bookstore Quick Start

Ecommerce bookstore is built with Nuxt, GraphQL, Strapi

## Start Strapi from the ./backend folder

`cd <project-folder>/backend/`:

Run the following from your command line:

```
yarn && yarn develop
```

Default Admin account:

```
user: admin
password: 123456
```

You will find more information and options in the [**backend** README](./backend).

## Start Nuxt from the ./frontend folder

`cd <project-folder>/frontend/`:

Run the following from your command line:

```
yarn && yarn dev
```

You will find more information and options in the [**frontend** README](./frontend).

## Payment processing (NOTE)

You will not be able to test making an order unless you have configured your [Stripe API Keys](https://dashboard.stripe.com/account/apikeys).
Put your **Stripe API Private Key** into backend/.env file and your **Stripe API Public Key** into frontend/.env file.
