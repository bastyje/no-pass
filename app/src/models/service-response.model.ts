import { ErrorMessage } from './error-message.model';

export type ServiceResponse<T> = NoContentServiceResponse & {
  content: T
}

export type NoContentServiceResponse = {
  errorMessages: ErrorMessage[],
  success: boolean
}
