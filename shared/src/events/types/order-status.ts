export enum OrderStatus {
  // Order has been created, but has not been reserved yet
  Created = "created",

  // The order's ticket has already been reserved
  // or the user has cancelled the order
  // or the order expires before payment
  Cancelled = "cancelled",

  // The order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  // The order has reserved the ticket and the user paid it successfully
  Complete = "complete",
}
