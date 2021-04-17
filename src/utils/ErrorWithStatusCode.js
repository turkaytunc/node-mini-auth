export default class ErrorWithStatusCode extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}
