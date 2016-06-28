export class InvalidSlideObjectError extends Error {
  constructor(message =  "Argument must be an Object: { content: [String], meta: [Object] }"){
    super(message)
    this.message = message;
    this.name = 'InvalidSlideObjectError'
  }
}
