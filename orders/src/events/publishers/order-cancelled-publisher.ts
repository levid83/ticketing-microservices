import { Subjects, Publisher, OrderCancelledEvent } from "@ldticketing/shared";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
