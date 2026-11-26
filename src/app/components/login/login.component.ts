import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario = {
    username: '',
    password: '',
  };

  errorMensaje: string = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.errorMensaje = '';

    const datosParaEnviar = {
      username: this.usuario.username.trim(),
      password: this.usuario.password.trim(),
    };

    this.authService.login(datosParaEnviar).subscribe({
      next: (response) => {
        console.log('¡Login exitoso!', response);
        alert(
          'Bienvenido ' +
            response.firstName +
            '. Tu token es: ' +
            response.accessToken,
        );
        localStorage.setItem('token', response.accessToken);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        // Mostramos el mensaje que nos mande la nueva API si falla
        this.errorMensaje = err.error?.message || 'Credenciales incorrectas.';
      },
    });
  }
}
