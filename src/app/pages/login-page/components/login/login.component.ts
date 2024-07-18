import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { userLoginInterface } from '../../../../models/loginModel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userLogin!: userLoginInterface;
  authService = inject(AuthService);
  router = inject(Router);
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
    this.userLogin = this.loginForm.value as userLoginInterface;
    this.authService.userLogin(this.userLogin).subscribe();
    this.authService.login();
    this.router
      .navigate(['user'])
      .then(() => {})
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
  }
}
