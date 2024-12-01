import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent } from "@repo/ui/components/ui/card";

const ListSkeleton = ({ rows }: { rows: number }) => {
  return (
    <div>
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} height={50} />
      ))}
    </div>
  );
};

const CardSkeleton = ({ rows }: { rows: number }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: rows }, (_, index) => (
        <Card key={index} className="mb-4">
          <Skeleton height={200} />
          <CardContent className="p-4">
            <Skeleton height={10} />
            <Skeleton height={10} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const CARD_SKELETON = "CARD_SKELETON";
export const LIST_SKELETON = "LIST_SKELETON";
const Mode = {
  [CARD_SKELETON]: CardSkeleton,
  [LIST_SKELETON]: ListSkeleton,
};

export type TMode = keyof typeof Mode;

export type TableSkeletonProps = {
  rows?: number;
  mode?: TMode;
};

export default function TableSkeleton({
  rows = 10,
  mode = LIST_SKELETON,
}: TableSkeletonProps) {
  const Component = Mode[mode];
  return <Component rows={rows} />;
}
