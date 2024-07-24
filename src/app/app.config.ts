import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { routes } from './app.routes';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { AuthService } from './shared/services/auth.service';

// Fonction pour initialiser l'état d'authentification
export function initializeAuth(authService: AuthService) {
  return () =>
    firstValueFrom(
      authService.initializeAuthState().pipe(
        catchError(error => {
          console.log("Erreur lors de l'initialisation de l'authentification:", error);
          return [];
        })
      )
    ).then(() => undefined);
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuration de la détection de changement de zone
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Fournir les routes de l'application
    provideRouter(routes),
    // Configuration du client HTTP avec XSRF et intercepteurs
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      }),
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    // Fournir Ionic Angular
    provideIonicAngular(),
    // Initialiser l'authentification au démarrage de l'application
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true,
    },
  ],
};
