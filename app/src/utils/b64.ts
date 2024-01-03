export const fromBase64 = (base64: string): ArrayBuffer => Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer;

export const toBase64 = (buffer: ArrayBuffer): string => btoa(String.fromCharCode(...new Uint8Array(buffer)));

export const toUrlBase64 = (buffer: ArrayBuffer): string => btoa(String.fromCharCode(...new Uint8Array(buffer)))
  .replaceAll('/', '_').replaceAll('+', '-');
