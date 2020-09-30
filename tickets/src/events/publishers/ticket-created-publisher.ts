import { Publisher, Subjects, TicketCreatedEvent } from "@ldticketing/shared";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
