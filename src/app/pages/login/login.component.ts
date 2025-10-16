import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginData } from '../../interfaces/login';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [RouterModule, MatInputModule,MatFormFieldModule,MatButtonModule,FormsModule,MatCard],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  snackBarService = inject(SnackBarService)

 
  async login(form: LoginData) {
  if (!form.email || !form.password) {
    this.snackBarService.openSnackbarError('Completá ambos campos para continuar.');
    return;
  }

  try {
    const login = await this.authService.login(form);
    if (login.success) {
      this.router.navigate(['contacts']);
    } else {
      this.snackBarService.openSnackbarError(login.message);
    }
  } catch (error) {
    this.snackBarService.openSnackbarError('Error al intentar iniciar sesión.');
    console.error(error);
  }
}


}
