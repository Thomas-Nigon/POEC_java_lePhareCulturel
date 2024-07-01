import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
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
    console.warn(this.loginForm.value);
    console.warn('to the backend');
    this.authService.logIn();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.router.navigate(['user/1']);
  }

  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
  }
}
