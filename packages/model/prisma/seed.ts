import prisma from "./prisma-client";
import sampleData from "./sample-data/data";

async function createBusiness(data: any) {
  const business = await prisma().business.create({
    data,
  });
  return Promise.all(
    sampleData.map(async ({ products, ...category }) => {
      const categoryEntity = await prisma().category.create({
        data: {
          ...category,
          businessId: business.id,
        },
      });

      return Promise.all(
        products.map(async (product) =>
          prisma().product.create({
            data: {
              ...product,
              businessId: business.id,
              categoryId: categoryEntity.id,
            },
          }),
        ),
      );
    }),
  );
}

async function main() {
  await createBusiness({
    name: "La cueva del pirata",
    description:
      "Ubicado en el corazón de la ciudad, La Belle Cuisine es un refugio gastronómico que fusiona la sofisticación de la cocina francesa con innovaciones contemporáneas. Su elegante decoración, con arte local y mesas exquisitamente vestidas, crea un ambiente cálido y refinado. La carta presenta especialidades como confit de pato y bouillabaisse, elaboradas con ingredientes frescos por un chef formado en Francia. La extensa carta de vinos, seleccionados por el sommelier, complementa cada plato a la perfección. El servicio impecable asegura una experiencia inolvidable, convirtiendo cada visita en una celebración de la alta cocina.",
    address: "Calle 23, No. 456, Vedado, La Habana, Cuba.",
    coordinates: [23.102639551820147, -82.37307390774875],
    howToArrive: `
Para llegar al Restaurante La Belle Cuisine en La Habana desde el centro de la ciudad (Parque Central), hay varias opciones.

En coche o taxi, dirígete hacia el oeste por la Avenida Paseo de Martí (Prado) y gira a la izquierda en la Calle Neptuno. Continúa hasta llegar a la Avenida de los Presidentes (Calle G) y gira a la derecha. Sigue hasta llegar a la intersección con la Calle 23. Gira a la derecha en la Calle 23 y continúa hasta el No. 456 en Vedado. El restaurante estará a tu derecha.

En autobús, toma una ruta que se dirija hacia Vedado desde el Parque Central. Bájate en la parada de la Calle 23, conocida popularmente como La Rampa. Desde allí, camina hacia el norte por la Calle 23 hasta llegar al No. 456.

Si prefieres caminar, sigue la Avenida Paseo de Martí (Prado) hacia el oeste desde el Parque Central. Gira a la izquierda en la Calle Neptuno y continúa hasta llegar a la Avenida de los Presidentes (Calle G). Gira a la derecha y sigue hasta la Calle 23. Gira a la derecha y continúa caminando hasta el No. 456 en Vedado.
    `,
  });
  await createBusiness({
    name: "La Trattoria Bella Italia",
    description:
      "Ubicada en el corazón de la ciudad, La Trattoria Bella Italia ofrece una auténtica experiencia culinaria italiana. Con una decoración rústica y acogedora, el restaurante transporta a sus comensales a las encantadoras trattorias de Italia. El menú incluye clásicos como pasta fresca, pizzas al horno de leña y tiramisú casero, todos preparados con ingredientes frescos y tradicionales. La extensa carta de vinos italianos complementa perfectamente cada plato. El ambiente familiar y el servicio amable hacen de La Trattoria Bella Italia el lugar ideal para disfrutar de una comida italiana auténtica y memorable.",
    address: "Calle Obispo, No. 123, Habana Vieja, La Habana, Cuba.",
    coordinates: [23.10263955182015, -82.37307390774875],
    howToArrive: `
Desde el Parque Central:

En coche/taxi:
Dirígete hacia el este por la Avenida Paseo de Martí (Prado) hasta llegar a la Calle Obispo. Gira a la izquierda en la Calle Obispo y continúa hasta el No. 123 en Habana Vieja. El restaurante estará a tu izquierda.

En autobús:
Toma un autobús que se dirija hacia Habana Vieja desde el Parque Central. Bájate en la parada más cercana a la Calle Obispo. Camina por la Calle Obispo en dirección este hasta llegar al No. 123.

A pie:
Camina hacia el este por la Avenida Paseo de Martí (Prado) desde el Parque Central. Gira a la izquierda en la Calle Obispo y sigue caminando hasta llegar al No. 123 en Habana Vieja. El restaurante estará a tu izquierda.`,
  });
}
main()
  .then(async () => {
    await prisma().$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma().$disconnect();
    process.exit(1);
  });
