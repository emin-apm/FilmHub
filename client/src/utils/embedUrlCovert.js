export default function convertToEmbedUrl(url) {
  console.log(url);
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}
