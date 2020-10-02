import { Subjects, Publisher, PaymentCreatedEvent } from "@ldticketing/shared";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
