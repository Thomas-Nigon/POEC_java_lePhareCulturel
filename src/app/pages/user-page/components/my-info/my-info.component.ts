import { Component, inject, Input, OnInit } from '@angular/core';
import { UserProfileInterface } from '../../../../models/user-profile-interface.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../shared/services/user.service';
import { UserEditProfileInterface } from '../../../../models/editUser.model';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.scss',
})
export class MyInfoComponent implements OnInit {
  @Input() userList: UserProfileInterface[] = [];
  @Input() userId!: number;
  @Input() myUser!: UserProfileInterface;
  editedUser!: UserEditProfileInterface;
  edit = false;
  fb = inject(FormBuilder);
  userService = inject(UserService);

  editUserForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    nickname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
  });

  ngOnInit() {
    this.editUserForm = this.fb.group({
      firstname: [
        this.myUser.firstname ?? '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      ],
      lastname: [this.myUser.lastname ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      nickname: [this.myUser.nickname ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: [
        this.myUser.description ?? '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(300)],
      ],
    });
  }
  submitEditForm() {
    this.edit = false;
    this.myUser = { ...this.myUser, ...this.editUserForm.value };
    this.editedUser = { ...this.editedUser, ...this.editUserForm.value };
    this.userService.editUser(this.editedUser).subscribe({
      next: response => {
        console.warn('User eited successfully:', response);
      },
      error: err => {
        console.error('Error occurred:', err);
      },
    });
    console.warn('my edit:', this.editedUser);
    console.warn('my user:', this.myUser);
  }
}
