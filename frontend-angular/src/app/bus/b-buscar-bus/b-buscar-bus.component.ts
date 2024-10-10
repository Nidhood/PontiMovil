import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-b-buscar-bus',
  standalone: true,
  imports: [
    LottieComponent,
    FormsModule
  ],
  templateUrl: './b-buscar-bus.component.html',
  styleUrl: './b-buscar-bus.component.css'
})
export class BBuscarBusComponent {

  searchTerm = '';  // Variable que captura el término de búsqueda
  private animationItem: AnimationItem | undefined;
  @Output() search = new EventEmitter<string>();  // Emite el término de búsqueda

  onSearch() {
    if (this.searchTerm.trim()) {
      this.search.emit(this.searchTerm);  // Emitir el término de búsqueda
      this.limpiarCampo();  // Limpiar el campo de búsqueda
    }
  }

  options: AnimationOptions = {
    path: '/assets/animations/search.json',
    autoplay: false,
    loop: false
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  startAnimation(): void {
    if (this.animationItem) {
      this.animationItem.goToAndPlay(0);
    }
  }

  completeAnimation(): void {
    if (this.animationItem) {
      this.animationItem.setSpeed(2);  // Aumenta la velocidad de la animación
      this.animationItem.play();
    }
  }

  limpiarCampo(): void {
    this.searchTerm = '';  // Limpiar el término de búsqueda
  }
}
