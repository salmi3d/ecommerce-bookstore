<template>
  <div>

      <form class="uk-search uk-search-large uk-align-center uk-margin">
          <span uk-search-icon></span>
          <input class="uk-search-input" v-model="query" type="search" placeholder="Search...">
      </form>

      <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@m uk-margin" v-for="genre in filteredGenres" :key="genre.id" uk-grid>
          <div class="uk-card-media-left uk-cover-container">
              <img :src="'http://localhost:1337' + genre.image.url" alt="" class="uk-position-center">
          </div>
          <div>
              <div class="uk-card-body">
                  <h3 class="uk-card-title">{{ genre.name }}</h3>
                  <p>{{ genre.description }}</p>
                  <router-link :to="{ name: 'genre-id', params: { id: genre.id }}" tag="a" class="uk-button uk-button-primary">See books
                  </router-link>
              </div>
          </div>
      </div>

      <div class="uk-container uk-container-center uk-text-center" v-if="filteredGenres.length === 0">
       <p>No genres found</p>
     </div>

  </div>

</template>

<script>
import genresQuery from '~/apollo/queries/genre/genres'

export default {
  data() {
    return {
      genres: [],
      query: ''
    }
  },
  apollo: {
    genres: {
      prefetch: true,
      query: genresQuery
    }
  },
  computed: {
    filteredGenres() {
      return this.genres.filter(genre => {
        return genre.name.toLowerCase().includes(this.query.toLowerCase())
      })
    },
  }
}
</script>
