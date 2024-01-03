export {}


declare global {
  interface AuthenticationExtensionsClientInputs {
    prf: {
      eval: {
        first: ArrayBuffer,
        second: ArrayBuffer
      }
    }
  }

  interface AuthenticationExtensionsClientOutputs {
    prf: {
      results: {
        first: ArrayBuffer,
        second: ArrayBuffer
      }
    }
  }
}
