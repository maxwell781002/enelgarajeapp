import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

type Items = {
  label: string | undefined | null;
  value: any;
};

export default function CardDisplay({
  title,
  items,
  className,
  children,
}: {
  title: string;
  items?: Items[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items?.map(({ label, value }, index) => (
            <div key={index}>
              <dt className="font-semibold">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {children}
      </CardContent>
    </Card>
  );
}
