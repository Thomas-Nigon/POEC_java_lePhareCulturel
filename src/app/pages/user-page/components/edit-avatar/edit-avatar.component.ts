import { Component, OnInit, inject } from '@angular/core';
import { AvatarService } from '../../../../shared/services/avatar.service';
import { Avatar } from '../../../../models/avatar.model';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-avatar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-avatar.component.html',
  styleUrl: './edit-avatar.component.scss',
})
export class EditAvatarComponent implements OnInit {
  private avatarService = inject(AvatarService);
  avatarList!: Avatar[];
  fb: FormBuilder = inject(FormBuilder);

  public editAvatarForm = this.fb.group({
    checkboxes: this.fb.array([
      this.fb.control(false),
      this.fb.control(false),
      this.fb.control(false),
      this.fb.control(false),
    ]),
  });

  ngOnInit() {
    this.avatarService.getAvatarList().subscribe(data => {
      this.avatarList = data;
    });
  }

  updateCheckbox(index: number) {
    const checkboxes = this.editAvatarForm.get('checkboxes') as FormArray;

    checkboxes.controls.forEach((control, i) => {
      if (i !== index) {
        control.setValue(false);
      }
    });
  }
}
