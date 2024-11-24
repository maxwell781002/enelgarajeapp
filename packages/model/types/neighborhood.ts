import { CompleteBusinessNeighborhood } from "../prisma/zod";
import { CompleteNeighborhood } from "../prisma/zod/neighborhood";

export type NeighborhoodWithShipping = CompleteNeighborhood &
  Pick<CompleteBusinessNeighborhood, "shipping">;
