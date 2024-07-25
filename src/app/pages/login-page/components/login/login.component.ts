/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { UserLoginInterface } from '../../../../models/loginModel';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule, SweetAlert2Module],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userLogin!: UserLoginInterface;
  authService = inject(AuthService);
  router = inject(Router);
  location = inject(Location);
  fb: FormBuilder = inject(FormBuilder);
  pwdHidden = true;
  isFocused = false;
  togglePasswordView() {
    this.pwdHidden = !this.pwdHidden;
  }

  public loginForm = this.fb.group({
    email: [''],
    password: [''],
  });
  onSubmit(): void {
    this.userLogin = this.loginForm.value as UserLoginInterface;
    this.authService.userLogin(this.userLogin).subscribe({
      next: response => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Authentification réussie, redirection ...',
        });
        this.location.back();
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email ou mot de passe incorrect',
        });
      },
    });
  }

  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
  }
}
