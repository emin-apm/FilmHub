export function getBiggerGoogleProfilePic(url, size = 450) {
  if (!url) return url;

  // Handle URLs ending with =s<number>-c
  if (/=s\d+-c$/.test(url)) {
    return url.replace(/=s\d+-c$/, `=s${size}-c`);
  }

  // Handle URLs with ?sz=<number>
  if (/\?sz=\d+$/.test(url)) {
    return url.replace(/\?sz=\d+$/, `?sz=${size}`);
  }

  // Otherwise, just append ?sz=<size>
  if (!url.includes("?")) {
    return `${url}?sz=${size}`;
  }

  return url;
}
