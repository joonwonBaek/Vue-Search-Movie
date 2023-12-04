import { defineStore } from 'pinia'
import axios from 'axios'

//const key = import.meta.env.VITE_KEY
export type Movies = Movie[]
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export interface MovieDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: {
    Source: string
    Value: string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

const selectedMovie: MovieDetail = {
  Title: '',
  Year: '',
  Rated: '',
  Released: '',
  Runtime: '',
  Genre: '',
  Director: '',
  Writer: '',
  Actors: '',
  Plot: '',
  Language: '',
  Country: '',
  Awards: '',
  Poster: '',
  Ratings: [
    {
      Source: '',
      Value: ''
    }
  ],
  Metascore: '',
  imdbRating: '',
  imdbVotes: '',
  imdbID: '',
  Type: '',
  DVD: '',
  BoxOffice: '',
  Production: '',
  Website: '',
  Response: ''
}

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [] as Movies,
    selectedMovie,
    title: '' as string,
    loading: false as boolean
  }),
  // getters: {
  //   filterdMovies(state) {
  //     return state.movies
  //       .filter((movie) => Number(movie.Year) > 2010)
  //       .sort((a, b) => Number(b.Year) - Number(a.Year))
  //   }
  // },
  actions: {
    async fetchMovies(path: string) {
      if (this.loading) return
      this.loading = true
      try {
        const res = await axios.post('/api/movieList', {
          headers: { 'Content-Type': 'application/json' },
          path
        })
        const { Search } = res.data
        if (!Search) {
          this.movies = []
        } else {
          this.movies = Search
        }
      } catch (error) {
        console.log('fetchMovies:', error)
      } finally {
        this.title = path
        this.loading = false
      }
    },
    async fetchMoviesDetail(id: string) {
      //if (this.loading) return
      //this.loading = true
      try {
        const res = await axios.post('/api/movieDetail', {
          headers: { 'Content-Type': 'application/json' },
          id
        })

        this.selectedMovie = res.data
      } catch (error) {
        console.error('Error fetching movie details:', error)
      } finally {
        //this.loading = false
      }
    }
  }
})
