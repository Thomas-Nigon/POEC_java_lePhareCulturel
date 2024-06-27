import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../../../../shared/validators/passwordValidator';
import { matchPasswordValidator } from '../../../../shared/validators/matchPasswordValidator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  pwdHidden = true;
  confirmPwdHidden = true;
  constructor(private fb: FormBuilder) {}

  public registerForm = this.fb.group({
    username: ['', Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    credentials: this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', [Validators.required, matchPasswordValidator()]],
    }),
  });

  togglePasswordView() {
    this.pwdHidden = !this.pwdHidden;
  }
  toggleConfirPwdView() {
    this.confirmPwdHidden = !this.confirmPwdHidden;
  }

  onSubmit(): void {
    console.warn('form submitted ! data sent:', this.registerForm.value);
  }
}
