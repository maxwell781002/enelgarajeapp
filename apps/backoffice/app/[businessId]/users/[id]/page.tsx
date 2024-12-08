import UserProfile from "./general/index";

export type PageProps = {
  params: {
    businessId: string;
    id: string;
  };
};

export default function Page({ params: { id } }: PageProps) {
  return (
    <UserProfile
      name="John Doe"
      phone="+1 (555) 123-4567"
      image="/placeholder.svg?height=100&width=100"
      orders={125}
      products={42}
      customers={1234}
    />
  );
}
