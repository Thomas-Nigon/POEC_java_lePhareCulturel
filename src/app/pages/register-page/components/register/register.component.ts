import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../../../../shared/validators/passwordValidator';
import { matchPasswordValidator } from '../../../../shared/validators/matchPasswordValidator';
import { NewUser } from '../../../../models/newUser.models';
import { UserService } from '../../../../shared/services/user.service';

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
  newUser!: NewUser;
  userService = inject(UserService);
  constructor(private fb: FormBuilder) {}

  public registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    credentials: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    this.newUser = this.registerForm.value as NewUser;
    console.warn('form submitted ! data sent:', this.registerForm.value);
    this.userService.createUser(this.newUser);
  }
}
