import { CardContent, Card } from "../ui/card";

type CardItemProps = {
  name: string,
  description: string,
  price: number,
  image: string,
}

export function CardItem({ name, description, price, image }: CardItemProps) {
  return (
    <Card>
      <img src={image} alt={name} className="rounded-t-lg object-cover w-full h-48" />
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2 font-sans">
          {name}
        </h3>
        <p className="text-muted-foreground mb-4 font-sans">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-semibold font-sans">
            ${price}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}