import { Publisher, Subjects, TicketUpdatedEvent } from "@ldticketing/shared";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
