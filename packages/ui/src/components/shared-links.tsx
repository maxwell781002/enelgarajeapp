"use client";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

export type SocialNetworks = "FACEBOOK" | "WHATSAPP" | "TELEGRAM";

export type SharedLinksProps = {
  socialNetworks: SocialNetworks[];
  url: string;
  text: string;
  hashtag?: string;
};

const components = {
  ["FACEBOOK"]: {
    button: FacebookShareButton,
    icon: FacebookIcon,
  },
  ["WHATSAPP"]: {
    button: WhatsappShareButton,
    icon: WhatsappIcon,
  },
  ["TELEGRAM"]: {
    button: TelegramShareButton,
    icon: TelegramIcon,
  },
};

export default function SharedLinks({
  socialNetworks,
  url,
  text,
  hashtag,
}: SharedLinksProps) {
  return (
    <div className="flex gap-2">
      {socialNetworks.map((network) => {
        const Component = components[network].button;
        const Icon = components[network].icon;
        return (
          <Component key={network} url={url} quote={text} hashtag={hashtag}>
            <Icon size={32} round />
          </Component>
        );
      })}
    </div>
  );
}
