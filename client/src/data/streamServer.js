// https://111movies.com/movie/${id}
// https://api.cinezo.net/embed/tmdb-movie-${id}
// https://vidfast.pro/movie/${}
// https://player.videasy.net/movie/${id}
// https://embedmaster.link/movie/${id}
// https://player.vidify.top/embed/movie/${id}
// https://vidsrc.cc/v2/embed/movie/${id}
// https://vidsrc-embed.ru/embed/movie?tmdb=${id}&ds_lang=bg/

export const streamServers = {
  _111movies: {
    movie: (id) => `https://111movies.com/movie/${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
  cinezo: {
    movie: (id) => `https://api.cinezo.net/embed/tmdb-movie-${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
  fmovies4u: {
    movie: (id) => `https://fmovies4u.com/embed/tmdb-movie-${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
  vidfast: {
    movie: (id) => `https://vidfast.pro/movie/${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
  mapple: {
    movie: (id) => `https://mapple.uk/watch/movie/${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
  embedmaster: {
    movie: (id) => `https://embedmaster.link/movie/${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
  fmovies: {
    movie: (id) => `https://fmovies4u.com/embed/tmdb-movie-${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
  vidlink: {
    movie: (id) => `https://vidlink.pro/movie/${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
  videasy: {
    movie: (id) => `https://player.videasy.net/movie/${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
  vidify: {
    movie: (id) => `https://player.vidify.top/embed/movie/${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
};
