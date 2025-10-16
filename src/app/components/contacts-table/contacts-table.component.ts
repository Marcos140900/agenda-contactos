import { Component, input } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactSummaryComponent } from '../contact-summary/contact-summary.component';
import { MatDividerModule } from '@angular/material/divider';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service'; 


@Component({
  selector: 'app-contacts-table',
  imports: [ContactSummaryComponent, MatDividerModule],
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent {

  // Inputs del componente
  contacts = input.required<Contact[] | undefined>();
  loading = input<boolean>(false);

  // Inyectamos el servicio que maneja el logout
  constructor(private authService: AuthService) {}

  // Método para mostrar el SweetAlert
  confirmarLogout() {
    Swal.fire({
      title: "¿Querés cerrar sesión?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      denyButtonText: "No, cancelar"
    }).then(result => {
      if (result && result.isConfirmed) {
        this.authService.logout();
        Swal.fire("Sesión cerrada", "", "success");
      } else if (result && result.isDenied) {
        Swal.fire("Acción cancelada", "", "info");
      }
    });
  }
}
