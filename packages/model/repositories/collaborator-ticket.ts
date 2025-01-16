import { Prisma } from "@repo/model/prisma/prisma-client";
import { BaseRepository } from "@repo/model/lib/base-repository";
import {
  CollaboratorTicketModel,
  CompleteCollaboratorTicket,
} from "../prisma/zod";

export class CollaboratorTicketRepository extends BaseRepository<
  CompleteCollaboratorTicket,
  typeof Prisma.collaboratorTicket
> {
  constructor() {
    super(CollaboratorTicketModel.omit({ id: true }), "collaboratorTicket");
  }
}

export const collaboratorTicketRepository = new CollaboratorTicketRepository();
