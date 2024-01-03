export type AuthStorage = {
  signIn: () => void;
  signOut: () => void;
  isSignedIn: () => boolean;
}
