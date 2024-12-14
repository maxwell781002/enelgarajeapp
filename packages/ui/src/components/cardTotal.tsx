import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export type CardTotalProps = {
  title: string;
  Icon: any;
  value: any;
  subText?: string;
};

export default function CardTotal({
  title,
  Icon,
  value,
  subText,
}: CardTotalProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subText && <p className="text-xs text-muted-foreground">{subText}</p>}
      </CardContent>
    </Card>
  );
}
