import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  activeSection: string = 'tasks';

  menuItems = [
    { id: 'tasks', icon: '✓', label: 'Tareas' },
    { id: 'calendar', icon: '📅', label: 'Calendario' },
    { id: 'users', icon: '👥', label: 'Usuarios' },
    { id: 'reports', icon: '📊', label: 'Reportes' },
    { id: 'documents', icon: '📄', label: 'Documentos' },
    { id: 'settings', icon: '⚙️', label: 'Configuración' }
  ];

  changeSection(sectionId: string): void {
    this.activeSection = sectionId;
    
    // Emitir evento personalizado para que el dashboard lo escuche
    const event = new CustomEvent('sectionChange', { 
      detail: sectionId 
    });
    window.dispatchEvent(event);
    
    console.log('📍 Sección cambiada a:', sectionId);
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}