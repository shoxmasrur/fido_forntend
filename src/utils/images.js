const files = import.meta.glob('../assets/images/*.webp', { eager: true, import: 'default' });

const images = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.webp', ''), url]),
);

export const getImage = (key) => images[key];
