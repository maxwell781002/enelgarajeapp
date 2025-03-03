import * as React from "react";
import { StickerIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { Button } from "@repo/ui/components/ui/button";
import { getStickers } from "@repo/ui/stores/sticker-data";

interface StickerPickerProps {
  onStickerSelect: (stickerUrl: string) => void;
}

export function StickerPicker({ onStickerSelect }: StickerPickerProps) {
  const [stickers, setStickers] = React.useState<
    Array<{ hexcode: string; annotation: string }>
  >([]);

  React.useEffect(() => {
    getStickers().then(setStickers);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <StickerIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2">
        <div className="grid grid-cols-6 gap-2">
          {stickers.map((sticker) => (
            <Button
              key={sticker.hexcode}
              variant="ghost"
              className="h-10 w-10 p-0"
              onClick={() =>
                onStickerSelect(
                  `https://openmoji.org/data/color/svg/${sticker.hexcode}.svg`,
                )
              }
              title={sticker.annotation}
            >
              <img
                src={`https://openmoji.org/data/color/svg/${sticker.hexcode}.svg`}
                alt={sticker.annotation}
                className="w-8 h-8"
                width="32"
                height="32"
              />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
