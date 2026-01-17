import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  
  userRole: string = '';
  userName: string = '';
  isDarkMode: boolean = false;

  constructor(private router: Router) {
    // Obtener datos del usuario desde localStorage
    const role = localStorage.getItem('userRole') || 'usuario';
    
    // Convertir el rol a texto legible
    this.userRole = role === 'admin' ? 'Administrador' : 'Usuario';
    this.userName = localStorage.getItem('userName') || 'Usuario';
    
    // Cargar el tema desde localStorage
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
    
    console.log('👤 Usuario cargado:', this.userName, '- Rol:', this.userRole);
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    this.applyTheme();
    console.log(`🌙 Tema cambiado a: ${theme}`);
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }

  logout(): void {
    console.log('🔴 Cerrando sesión...');
    
    // Limpiar TODA la información del localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
    
    // Mantener el tema guardado
    // localStorage.removeItem('theme'); // No borres esto si quieres mantener la preferencia
    
    console.log('✅ Sesión cerrada - Redirigiendo al login...');
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}