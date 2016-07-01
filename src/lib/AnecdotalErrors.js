export class InvalidAnecdotalError extends Error {
  constructor(message =  "Argument must be an Object: { content: [String], meta: [Object] }"){
    super(message)
    this.message = message;
    this.name = 'InvalidAnecdotalError'
  }
}
