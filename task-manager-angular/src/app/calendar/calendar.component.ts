import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  today = new Date();
  
  events = [
    { 
      title: 'Entrevista / prueba', 
      start: '2026-01-17',
      backgroundColor: '#10b981',
      borderColor: '#10b981'
    },
    { 
      title: 'Demo / entrega', 
      start: '2026-01-18',
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6'
    },
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: this.events,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    height: 'auto',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    locale: 'es',
  };

  ngOnInit(): void {}

  handleDateClick(arg: any) {
    console.log('Fecha clickeada:', arg.dateStr);
  }

  handleEventClick(arg: any) {
    console.log('Evento clickeado:', arg.event.title);
  }
}