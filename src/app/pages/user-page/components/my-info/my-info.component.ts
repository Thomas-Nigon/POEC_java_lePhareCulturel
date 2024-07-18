import { Component, inject, Input } from '@angular/core';
import { UserInterface } from '../../../../models/user.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.scss',
})
export class MyInfoComponent {
  @Input() userList: UserInterface[] = [];
  @Input() userId!: number;
  @Input() myUser!: UserInterface;
  edit = false;
  editFirstname = false;
  editLastname = false;
  editEmail = false;
  editPseudo = false;
  editDescription = false;
  fb = inject(FormBuilder);
  test = 'toto';

  /*   editFirstnameForm = this.fb.group({
    firstname: [this.test, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  });
  editLastnameForm = this.fb.group({
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  });
  editEmailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  editDescriptionForm = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  }); */

  editUserForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
  });
  onBlur() {
    this.edit = false;
    /*  const firstname = (event.target as HTMLInputElement).value;
    this.userList[this.userId].first_name = firstname;
    const lastname = (event.target as HTMLInputElement).value;
    this.userList[this.userId].last_name = lastname;
    const email = (event.target as HTMLInputElement).value;
    this.userList[this.userId].email = email;
    const desc = (event.target as HTMLInputElement).value;
    this.userList[this.userId].description = desc; */
  }

  /*   onBlurFirstname(event: Event) {
    const targetText = (event.target as HTMLInputElement).value;
    this.userList[this.userId].first_name = targetText;
    this.editFirstname = false;
  }
  onBlurLastname(event: Event) {
    const targetText = (event.target as HTMLInputElement).value;
    this.userList[this.userId].last_name = targetText;
    this.editLastname = false;
  }
  onBlurEmail(event: Event) {
    const targetText = (event.target as HTMLInputElement).value;
    this.userList[this.userId].email = targetText;
    this.editEmail = false;
  }
  onBlurDescription(event: Event) {
    const targetText = (event.target as HTMLInputElement).value;
    this.userList[this.userId].description = targetText;
    this.editDescription = false;
  } */

  submitEditFirstname() {
    this.edit = false;
    console.warn('send this to backdend', this.editUserForm.value);
  }
}
