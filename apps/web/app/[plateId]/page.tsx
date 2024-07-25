import { getItem } from "../../actions/cardList";

export default async function Page() {
  const item = await getItem(1);
  return (
    <div className="flex flex-col">
      <section className="w-full">
        <img
          src={item.image}
          width={1600}
          height={800}
          alt="Dish"
          className="w-full h-[500px] md:h-[600px] object-cover"
        />
      </section>
      <section className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{item.name}</h1>
            <p className="text-muted-foreground text-lg mb-6">
              {item.description}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.category}</h3>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">${item.price}</h3>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Ingredientes</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              {item.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Más fotos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {item.images.map((image) => (
            <img
              key={image}
              src={image}
              width={600}
              height={400}
              alt="Dish"
              className="w-full h-[200px] md:h-[300px] object-cover rounded-lg"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
