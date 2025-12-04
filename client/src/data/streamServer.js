export const streamServers = {
  flixer: {
    movie: (id) => `https://flixer.sh/watch/movie/${id}`,
    tv: (id, s, e) => `https://flixer.sh/watch/tv/${id}/${s}/${e}`,
  },
  cinezo: {
    movie: (id) => `https://api.cinezo.net/media/tmdb-movie-${id}`,
    tv: (id, s, e) => `https://api.cinezo.net/media/tmdb-tv-${id}/${s}/${e}`,
  },
  videasy: {
    movie: (id) => `https://player.videasy.net/movie/${id}`,
    tv: (id, s, e) => `https://player.videasy.net/tv/${id}/${s}/${e}`,
  },
  vidlink: {
    movie: (id) => `https://vidlink.pro/movie/${id}`,
    tv: (id, s, e) => `https://vidlink.pro/tv/${id}/${s}/${e}`,
  },
  mapple: {
    movie: (id) => `https://mapple.uk/watch/movie/${id}`,
    tv: (id, s, e) => `https://mapple.uk/watch/tv/${id}/${s}/${e}`,
  },
  embedmaster: {
    movie: (id) => `https://embedmaster.link/movie/${id}`,
    tv: (id, s, e) => `https://embedmaster.link/tv/${id}/${s}/${e}`,
  },
  _111movies: {
    movie: (id) => `https://111movies.com/movie/${id}`,
    tv: (id, s, e) => `https://111movies.com/tv/${id}/${s}/${e}`,
  },
  vidsrc: {
    movie: (id) => `https://vidsrc.xyz/embed/movie/${id}`,
    tv: (id, s, e) =>
      `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${s}&episode=${e}`,
  },
  fmovies4u: {
    movie: (id) => `https://fmovies4u.com/embed/tmdb-movie-${id}`,
    tv: (id, s, e) => `https://fmovies4u.com/embed/tmdb-tv-${id}/${s}/${e}`,
  },
  vidify: {
    movie: (id) => `https://player.vidify.top/embed/movie/${id}`,
    tv: (id, s, e) => `/tv/${id}/${s}/${e}`,
  },
  vidfast: {
    movie: (id) => `https://vidfast.pro/movie/${id}`,
    tv: (id, s, e) => `https://vidfast.pro/tv/${id}/${s}/${e}`,
  },
};
