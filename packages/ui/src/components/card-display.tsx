import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

type Items = {
  label: string;
  value: any;
};

export default function CardDisplay({
  title,
  items,
}: {
  title: string;
  items: Items[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map(({ label, value }) => (
            <div>
              <dt className="font-semibold">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
