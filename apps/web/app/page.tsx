import Link from "next/link"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent } from "@repo/ui/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-sans">Restaurant Name</h1>
          <nav className="hidden md:flex gap-4">
            <Link href="#" className="hover:underline font-sans" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="hover:underline font-sans" prefetch={false}>
              Menu
            </Link>
            <Link href="#" className="hover:underline font-sans" prefetch={false}>
              About
            </Link>
            <Link href="#" className="hover:underline font-sans" prefetch={false}>
              Contact
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
      <main className="container mx-auto py-12 px-6 md:px-0">
        <div className="grid gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 font-sans">Appetizers</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <img src="/placeholder.svg" alt="Appetizer 1" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Bruschetta</h3>
                  <p className="text-muted-foreground mb-4 font-sans">
                    Toasted bread topped with tomatoes, garlic, and basil.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$8.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img src="/placeholder.svg" alt="Appetizer 2" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Calamari Fritti</h3>
                  <p className="text-muted-foreground mb-4 font-sans">
                    Crispy fried calamari with lemon and marinara sauce.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$12.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img src="/placeholder.svg" alt="Appetizer 3" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Meatballs</h3>
                  <p className="text-muted-foreground mb-4 font-sans">Homemade meatballs in a rich tomato sauce.</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$9.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 font-sans">Entrees</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <img src="/placeholder.svg" alt="Entree 1" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Grilled Salmon</h3>
                  <p className="text-muted-foreground mb-4 font-sans">
                    Fresh salmon fillet grilled and served with roasted vegetables.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$24.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img src="/placeholder.svg" alt="Entree 2" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Chicken Parmesan</h3>
                  <p className="text-muted-foreground mb-4 font-sans">
                    Breaded and fried chicken breast topped with marinara and mozzarella.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$18.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img src="/placeholder.svg" alt="Entree 3" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Beef Lasagna</h3>
                  <p className="text-muted-foreground mb-4 font-sans">
                    Layers of pasta, ground beef, ricotta, and mozzarella.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$16.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 font-sans">Desserts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <img src="/placeholder.svg" alt="Dessert 1" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Tiramisu</h3>
                  <p className="text-muted-foreground mb-4 font-sans">
                    Layers of espresso-soaked ladyfingers and mascarpone cream.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$8.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img src="/placeholder.svg" alt="Dessert 2" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Crème Brûlée</h3>
                  <p className="text-muted-foreground mb-4 font-sans">
                    Creamy custard with a caramelized sugar topping.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$9.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img src="/placeholder.svg" alt="Dessert 3" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Cheesecake</h3>
                  <p className="text-muted-foreground mb-4 font-sans">Rich and creamy New York-style cheesecake.</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$7.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 font-sans">Plates</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <img src="/placeholder.svg" alt="Plate 1" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Grilled Salmon Plate</h3>
                  <p className="text-muted-foreground mb-4 font-sans">
                    Fresh grilled salmon fillet served with roasted vegetables and a side of rice.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$24.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img src="/placeholder.svg" alt="Plate 2" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Chicken Parmesan Plate</h3>
                  <p className="text-muted-foreground mb-4 font-sans">
                    Breaded and fried chicken breast topped with marinara and mozzarella, served with a side of pasta.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$18.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img src="/placeholder.svg" alt="Plate 3" className="rounded-t-lg object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-sans">Beef Lasagna Plate</h3>
                  <p className="text-muted-foreground mb-4 font-sans">
                    Layers of pasta, ground beef, ricotta, and mozzarella, served with a side salad.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-sans">$16.99</span>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm font-sans">&copy; 2023 Restaurant Name. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="#" className="hover:underline font-sans" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline font-sans" prefetch={false}>
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
