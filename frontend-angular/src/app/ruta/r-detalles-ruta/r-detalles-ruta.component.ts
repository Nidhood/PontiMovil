import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-r-detalles-ruta',
  standalone: true,
  imports: [
    NgForOf,
    Button,
    RouterLink
  ],
  templateUrl: './r-detalles-ruta.component.html',
  styleUrl: './r-detalles-ruta.component.css'
})
export class RDetallesRutaComponent {
  @Input() ruta: any;
  @Output() close = new EventEmitter<void>();

  constructor() {}

  cerrarDetalle() {
    this.close.emit();
  }
}
