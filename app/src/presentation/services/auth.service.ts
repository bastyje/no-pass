import { Injectable } from '@angular/core';
import { AuthStorage } from '../../data/storage/auth.storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthStorage {

  private readonly key: 'signedIn' = 'signedIn';
  private readonly TRUE: 'true' = 'true';

  public isSignedIn(): boolean {
    return localStorage.getItem(this.key) === this.TRUE;
  }

  public signIn(): void {
    localStorage.setItem(this.key, this.TRUE);
  }

  public signOut(): void {
    localStorage.removeItem(this.key);
  }


}
