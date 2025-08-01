export class AbstractPaymentGateway {
  pay() {
    console.log("pay method abstract");
    return "pay method.";
  }
}
