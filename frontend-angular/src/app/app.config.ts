import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';
import { provideAnimations } from '@angular/platform-browser/animations'; // Añade esta importación


export const appConfig: ApplicationConfig = {
  providers: [
    provideLottieOptions({ player: () => import('lottie-web'),}),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
};
