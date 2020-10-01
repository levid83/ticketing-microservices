import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@ldticketing/shared";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
