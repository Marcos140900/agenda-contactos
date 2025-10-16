import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service'; // Ajustá el path según tu estructura

@Component({
  selector: 'app-logger-layoutweb',
  imports: [],
  templateUrl: './logger-layoutweb.component.html',
  styleUrls: ['./logger-layoutweb.component.scss']
})
export class LoggerLayoutwebComponent {

  constructor(private authService: AuthService) {}

  confirmarLogout() {
    Swal.fire({
      title: "¿Querés cerrar sesión?",
      text: "Tu sesión actual se cerrará y tendrás que volver a iniciar sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire("Sesión cerrada", "", "success");
      } else if (result.isDismissed) {
        Swal.fire("Acción cancelada", "", "info");
      }
    });
  }
}
