import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../../models/user.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-info.component.html',
  styleUrl: './edit-info.component.scss',
})
export class EditInfoComponent {
  @Input() userList: UserInterface[] = [];
  @Input() userId = 0;

  constructor(private fb: FormBuilder) {}

  public editInfoForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    pseudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
  });

  onSubmit(): void {}
}
