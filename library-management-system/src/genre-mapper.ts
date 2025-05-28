import { Genre } from "./book";

export function toGenreEnum(str: string): Genre {
  const genre = Object.keys(Genre).find(
    (key) => Genre[key as keyof typeof Genre] === str
  );

  if (!genre) {
    throw new Error(`Invalid genre string: ${str}`);
  }

  return Genre[genre as keyof typeof Genre];
}
