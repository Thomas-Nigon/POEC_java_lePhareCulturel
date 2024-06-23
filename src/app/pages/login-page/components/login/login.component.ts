import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb: FormBuilder = inject(FormBuilder);
  pwdHidden = true;
  isFocused = false;
  toggleConfirPwdView() {
    this.pwdHidden = !this.pwdHidden;
  }

  public loginForm = this.fb.group({
    email: [''],
    password: [''],
  });
  onSubmit(): void {
    console.warn(this.loginForm.value);
    console.warn('to the backend');
  }

  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
  }
}
