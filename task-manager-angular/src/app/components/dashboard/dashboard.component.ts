import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}

interface Document {
  id: number;
  title: string;
  date: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  users: User[] = [];
  documents: Document[] = [
    { id: 1, title: 'Manual de Usuario', date: '15 Ene 2026', icon: '📘' },
    { id: 2, title: 'Guía de Instalación', date: '14 Ene 2026', icon: '⚙️' },
    { id: 3, title: 'Documentación API', date: '13 Ene 2026', icon: '🔌' },
    { id: 4, title: 'Términos y Condiciones', date: '12 Ene 2026', icon: '📋' },
    { id: 5, title: 'Política de Privacidad', date: '11 Ene 2026', icon: '🔒' },
    { id: 6, title: 'FAQ - Preguntas Frecuentes', date: '10 Ene 2026', icon: '❓' },
  ];
  loading = true;
  activeSection = 'tasks';

  constructor(private cdr: ChangeDetectorRef) {}

  get completedTasksCount(): number {
    return this.tasks.filter((t) => t.completed).length;
  }

  get pendingTasksCount(): number {
    return this.tasks.filter((t) => !t.completed).length;
  }

  ngOnInit(): void {
    document.body.classList.remove('login-page');
    this.loadData();
    this.subscribeToSectionChanges();
  }

  ngOnDestroy(): void {
    window.removeEventListener('sectionChange', this.handleSectionChange);
  }

  handleSectionChange = (event: Event) => {
    const customEvent = event as CustomEvent;
    this.activeSection = customEvent.detail;
    this.cdr.detectChanges();
  };

  subscribeToSectionChanges(): void {
    window.addEventListener('sectionChange', this.handleSectionChange);
  }

  async loadData(): Promise<void> {
    try {
      console.log('🔄 Cargando datos...');
      
      await Promise.all([
        this.loadTasks(),
        this.loadUsers()
      ]);
      
      // IMPORTANTE: Forzar cambio ANTES de quitar el loading
      this.cdr.detectChanges();
      
      this.loading = false;
      console.log('✅ Datos cargados exitosamente');
      
      // Forzar otro cambio después de quitar el loading
      this.cdr.detectChanges();
      
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async loadTasks(): Promise<void> {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.tasks = data.slice(0, 20);
      console.log('✅ Tareas cargadas:', this.tasks.length);
      this.cdr.detectChanges();
      
    } catch (error) {
      console.error('❌ Error loading tasks:', error);
      this.tasks = this.generateFallbackTasks();
      this.cdr.detectChanges();
    }
  }

  async loadUsers(): Promise<void> {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.users = data;
      console.log('✅ Usuarios cargados:', this.users.length);
      this.cdr.detectChanges();
      
    } catch (error) {
      console.error('❌ Error loading users:', error);
      this.users = this.generateFallbackUsers();
      this.cdr.detectChanges();
    }
  }

  generateFallbackTasks(): Task[] {
    return [
      { userId: 1, id: 1, title: 'Revisar documentación del proyecto', completed: true },
      { userId: 1, id: 2, title: 'Implementar nuevas funcionalidades', completed: false },
      { userId: 2, id: 3, title: 'Realizar pruebas unitarias', completed: true },
      { userId: 2, id: 4, title: 'Actualizar dependencias', completed: false },
      { userId: 3, id: 5, title: 'Preparar presentación para el cliente', completed: true },
      { userId: 3, id: 6, title: 'Revisar código de los compañeros', completed: false },
      { userId: 1, id: 7, title: 'Optimizar rendimiento de la aplicación', completed: false },
      { userId: 2, id: 8, title: 'Configurar CI/CD pipeline', completed: true },
      { userId: 3, id: 9, title: 'Documentar API endpoints', completed: false },
      { userId: 1, id: 10, title: 'Reunión de planificación sprint', completed: true },
    ];
  }

  generateFallbackUsers(): User[] {
    return [
      {
        id: 1,
        name: 'Juan Pérez',
        username: 'juanp',
        email: 'juan@example.com',
        company: { name: 'Tech Corp' }
      },
      {
        id: 2,
        name: 'María García',
        username: 'mariag',
        email: 'maria@example.com',
        company: { name: 'Innovation Labs' }
      },
      {
        id: 3,
        name: 'Carlos Rodríguez',
        username: 'carlosr',
        email: 'carlos@example.com',
        company: { name: 'Digital Solutions' }
      }
    ];
  }

  getProgressPercentage(): number {
    if (this.tasks.length === 0) return 0;
    return Math.round((this.completedTasksCount / this.tasks.length) * 100);
  }

  getTasksCountByUser(userId: number): number {
    return this.tasks.filter((t) => t.userId === userId).length;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}