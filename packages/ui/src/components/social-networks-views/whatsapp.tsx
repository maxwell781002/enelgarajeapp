import { Card, CardContent } from "@repo/ui/components/ui/card";
import Markdown from "@repo/ui/components/markdown";

export type WhatsappItemProps = {
  mediaUrl: string;
  message: string;
};

export const WhatsappItem = ({ mediaUrl, message }: WhatsappItemProps) => {
  return (
    <Card className="w-64 overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="relative w-full">
          <img src={mediaUrl} alt="Card image" />
        </div>
        <div className="bg-white p-3">
          <Markdown className=" ">
            {message.replace(/\n/g, "\n\n").replace(/\*/g, "**")}
          </Markdown>
        </div>
      </CardContent>
    </Card>
  );
};
