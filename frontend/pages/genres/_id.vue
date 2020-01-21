<template>
  <div>

    <a class="uk-button uk-button-primary uk-margin" @click="$router.go(-1)"><span uk-icon="arrow-left"></span> go back</a>

    <client-only>
      <div uk-grid>
          <div class="uk-width-1-2@m">
            <div v-for="book in genre.books" class="uk-margin" :key="book.id">
                <div class="uk-card uk-card-default">
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">{{ book.name }} <span class="uk-badge">{{ book.price }}€</span></h3>
                        <p>{{ book.description }}</p>
                    </div>
                    <div class="uk-card-footer">
                      <button class="uk-button uk-button-primary">Add to cart</button>
                    </div>
                </div>
            </div>
          </div>

          <div class="uk-width-expand@m">
          </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import genreQuery from '~/apollo/queries/genre/genre'

export default {
  data() {
    return {
      genre: Object
    }
  },
  apollo: {
    genre: {
      prefetch: true,
      query: genreQuery,
      variables () {
        return { id: this.$route.params.id }
      }
    }
  }
}
</script>
