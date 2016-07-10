export class InvalidAnecdotalError extends Error {
  constructor(message =  "Argument must be an Object: { content: [String], meta: [Object] }"){
    super(message)
    this.name = 'InvalidAnecdotalError'
  }
}

export class InvalidAnecdotalIframe extends Error {
  constructor(message =  "`iframe` attribute invalid"){
    super(message)
    this.name = 'InvalidAnecdotalIframe'
  }
}
