export type Token = {
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    sub: string;
    name: string;
    iat: string;
  };
  signature: string;
}
