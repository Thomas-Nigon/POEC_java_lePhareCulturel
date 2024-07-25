import { Component, inject, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../../models/user.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../shared/services/user.service';
import { EditedUserInterface } from '../../../../models/editUser.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.scss',
})
export class MyInfoComponent implements OnInit {
  @Input() userList: UserInterface[] = [];
  @Input() userId!: number;
  myUser!: UserInterface;
  editedUser!: EditedUserInterface;
  observableUser!: Observable<UserInterface>;

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
    this.userService.getUser();
    this.observableUser = this.userService.myUser$;
    this.observableUser.subscribe(data => {
      this.editUserForm = this.fb.group({
        firstname: [data.firstname, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        lastname: [data.lastname, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        nickname: [data.nickname, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        description: [data.description, [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
      });
    });
  }
  submitEditForm() {
    this.edit = false;
    this.myUser = { ...this.myUser, ...this.editUserForm.value };
    this.editedUser = { ...this.editedUser, ...this.editUserForm.value };
    this.userService.editUser(this.editedUser).subscribe({
      next: response => {
        this.userService.getUser();
        console.warn('User edited successfully:', response);
      },
      error: err => {
        console.error('Error occurred:', err);
      },
    });
    console.warn('my edit:', this.editedUser);
    console.warn('my user:', this.myUser);
  }
}
