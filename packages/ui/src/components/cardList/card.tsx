import { CardContent, Card } from "../ui/card";

export function CardItem() {
  return (
    <Card>
      <img src="/placeholder.svg" alt="Appetizer 1" className="rounded-t-lg object-cover w-full h-48" />
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2 font-sans">Bruschetta</h3>
        <p className="text-muted-foreground mb-4 font-sans">
          Toasted bread topped with tomatoes, garlic, and basil.
        </p>
        <div className="flex justify-between items-center">
          <span className="font-semibold font-sans">$8.99</span>
        </div>
      </CardContent>
    </Card>
  )
}