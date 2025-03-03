interface Sticker {
  hexcode: string;
  group: string;
  subgroups: string;
  annotation: string;
}

let stickerCache: Sticker[] | null = null;

export async function getStickers(): Promise<Sticker[]> {
  if (stickerCache) {
    return stickerCache;
  }

  const response = await fetch(
    "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/data/openmoji.json",
  );
  const data: Sticker[] = await response.json();

  // Filter and limit the stickers to a manageable amount
  stickerCache = data
    .filter(
      (sticker) =>
        sticker.group === "smileys-emotion" ||
        sticker.group === "animals-nature",
    )
    .slice(0, 50);

  return stickerCache;
}
