export function getBiggerGoogleProfilePic(url, size = 450) {
  if (!url) return url;
  return url.replace(/=s\d+-c$/, `=s${size}-c`);
}
