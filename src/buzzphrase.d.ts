declare module 'buzzphrase' {
  interface BuzzPhraseOptions {
    format?: string;
    iterations?: number;
  }
  export function get(options?: BuzzPhraseOptions): string;
  export function log(options?: BuzzPhraseOptions): string;
}
