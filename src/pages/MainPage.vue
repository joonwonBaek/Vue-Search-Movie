<script setup lang="ts">
import { MovieList, SearchBar } from '../components'
import { useMovieStore } from '../store/movie'
import { useRouter } from 'vue-router'
import Loader from '../components/Loader.vue'

const router = useRouter()
const movieStore = useMovieStore()

const searchMovies = (title: string) => {
  movieStore.$reset()
  movieStore.fetchMovies(title)

  router.push({ name: 'MovieList', params: { title } })
}

const resetMovie = () => {
  movieStore.$reset()
  router.push({ name: 'Home' })
}

const selecteMovie = (title: string, imdbID: string) => {
  searchMovies(title)
  movieStore.fetchMoviesDetail(imdbID)
  router.push({ name: 'MovieDetail', params: { id: imdbID } })
}
</script>

<template>
  <div
    class="loader-container"
    v-if="movieStore.loading">
    <Loader />
  </div>
  <SearchBar
    @search="searchMovies"
    @reset="resetMovie" />
  <RouterView
    v-if="movieStore.selectedMovie"
    :selected-movie="movieStore.selectedMovie" />
  <!-- <MovieDetail v-if="movieStore.selectedMovie" /> -->
  <MovieList
    :selected-movie="movieStore.selectedMovie"
    :movies="movieStore.movies"
    @selecte="selecteMovie" />
</template>
<style scoped lang="scss">
.loader-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  z-index: 9;
  visibility: visible;
}
</style>
