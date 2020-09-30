import { Publisher, OrderCreatedEvent, Subjects } from "@ldticketing/shared";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
