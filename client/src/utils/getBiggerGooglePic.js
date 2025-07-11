export default function getBiggerGoogleProfilePic(url, size = 250) {
  return url.replace(/s\d+-c$/, `s${size}-c`);
}
