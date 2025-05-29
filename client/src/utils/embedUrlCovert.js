export default function convertToEmbedUrl(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
}
