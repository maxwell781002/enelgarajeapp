import { redirect } from "next/navigation";

export type Props = {
  params: {
    businessId: string;
  };
};

export default function Home({ params: { businessId } }: Props) {
  return redirect(`/${businessId}/products`);
}
