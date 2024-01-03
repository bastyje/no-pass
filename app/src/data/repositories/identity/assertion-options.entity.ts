export type AssertionOptionsEntity = {
  allowCredentials?: {
    id: string,
    transports: string[],
    type: 'public-key'
  }[],
  challenge: string,
  // todo from any
  extensions: any,
  rpId?: string,
  timeout: number,
  userVerification?: string
}
