/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../../../../shared/validators/passwordValidator';
import { matchPasswordValidator } from '../../../../shared/validators/matchPasswordValidator';
import { UserRegistrationData } from '../../../../models/user-registration-data.models';
import { UserService } from '../../../../shared/services/user.service';
import Swal from 'sweetalert2';

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
  userRegistrationInfo: UserRegistrationData = {
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
    this.updateUserRegistrationInfo();
    this.userService.createUser(this.userRegistrationInfo).subscribe({
      next: response => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'Votre compte a bien été crée. Vérifiez vos Emails pour activer votre compte.',
        });
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue, veuillez réessayer',
        });
      },
    });
  }

  // Rename updateRegistrationData to updateUserRegistrationInfo.
  private updateUserRegistrationInfo(): void {
    this.userRegistrationInfo = this.getRegistrationDataFromForm();
  }

  // Extract Method: getRegistrationDataFromForm.
  private getRegistrationDataFromForm(): UserRegistrationData {
    const credentials = this.registerForm.value.credentials ?? {};
    // const { firstname, lastname, nickname, credentials = {} } = this.registerForm.value;
    const profileUpdates: UserRegistrationData = new UseUserRegistrationData({
      firstname: this.registerForm.value.firstname ?? '',
      lastname: this.registerForm.value.lastname ?? '',
      profile_nickname: this.registerForm.value.nickname ?? '',
      email: credentials.email ?? '',
      password: credentials.password ?? '',
      confirm_password: credentials.confirmPassword ?? '',
      avatar: this.userRegistrationInfo.avatar,
      profile_description: this.userRegistrationInfo.profile_description,
    });

    return profileUpdates;
  }
}
