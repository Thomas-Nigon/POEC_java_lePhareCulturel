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
  newUser: NewUser = {
    firstname: '',
    password: '',
    confirm_password: '',
    profile_nickname: '',
    avatar: 'assets/images/avatars/avatar1.svg',
    profile_description: 'Parlez nous de vous !',
    email: '',
    lastname: '',
  };
  userService = inject(UserService);
  constructor(private fb: FormBuilder) {}

  public registerForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    nickname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
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
    this.newUser.firstname = this.registerForm.value.firstname ?? '';
    this.newUser.lastname = this.registerForm.value.lastname ?? '';
    this.newUser.profile_nickname = this.registerForm.value.nickname ?? '';
    this.newUser.email = this.registerForm.value.credentials?.email ?? '';
    this.newUser.password = this.registerForm.value.credentials?.password ?? '';
    this.newUser.confirm_password = this.registerForm.value.credentials?.confirmPassword ?? '';
    this.userService.createUser(this.newUser).subscribe({
      next: response => {
        console.warn('User added:', response);
      },
      error: err => {
        console.error('Error occurred:', err);
      },
    });
  }
}
