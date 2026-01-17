import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, LoginCredentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginCredentials): { success: boolean; message?: string } {
    const validCredentials = [
      { username: 'admin', password: 'admin123', role: 'admin' as const },
      { username: 'user', password: 'user123', role: 'user' as const }
    ];

    const validUser = validCredentials.find(
      cred => cred.username === credentials.username && cred.password === credentials.password
    );

    if (validUser) {
      const user: User = {
        username: validUser.username,
        role: validUser.role
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return { success: true };
    }

    return { success: false, message: 'Credenciales incorrectas' };
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }
}