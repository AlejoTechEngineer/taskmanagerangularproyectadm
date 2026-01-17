import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  generalError: string = '';
  isLoading: boolean = false;
  isDarkMode: boolean = true;
  
  errors = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('login-page');
    
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/dashboard']);
    }
    
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme !== 'light';
    this.applyTheme();
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login-page');
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }

  validateForm(): boolean {
    this.errors = { username: '', password: '' };
    this.generalError = '';
    let isValid = true;

    if (!this.username || this.username.trim() === '') {
      this.errors.username = 'El usuario es requerido';
      isValid = false;
    }

    if (!this.password || this.password.trim() === '') {
      this.errors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (this.password.length < 4) {
      this.errors.password = 'La contraseña debe tener al menos 4 caracteres';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.generalError = '';

    setTimeout(() => {
      if (this.username === 'admin' && this.password === 'admin') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Admin');
        localStorage.setItem('userRole', 'admin');
        
        console.log('✅ Login exitoso como ADMINISTRADOR');
        this.router.navigate(['/dashboard']);
      } 
      else if (this.username === 'user' && this.password === 'user') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Usuario');
        localStorage.setItem('userRole', 'usuario');
        
        console.log('✅ Login exitoso como USUARIO');
        this.router.navigate(['/dashboard']);
      } 
      else {
        this.generalError = 'Usuario o contraseña incorrectos';
        this.isLoading = false;
        console.log('❌ Credenciales incorrectas');
      }
    }, 1000);
  }

  onLogin(): void {
    this.onSubmit();
  }
}