import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-r-buscar-ruta',
  standalone: true,
  imports: [
    LottieComponent,
    FormsModule
  ],
  templateUrl: './r-buscar-ruta.component.html',
  styleUrl: './r-buscar-ruta.component.css'
})
export class RBuscarRutaComponent {

  searchTerm = '';
  private animationItem: AnimationItem | undefined;
  @Output() search = new EventEmitter<string>();
  onSearch() {
    this.search.emit(this.searchTerm);
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
      this.animationItem.setSpeed(2); // Aumenta la velocidad para completar más rápido
      this.animationItem.play();
    }
  }

}
