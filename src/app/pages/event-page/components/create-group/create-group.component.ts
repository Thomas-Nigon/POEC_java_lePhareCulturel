import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupService } from '../../../../shared/services/group.service';
import { NewGroupInterface } from '../../../../models/newGroup.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creat-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss',
})
export class CreateGroupComponent {
  groupService = inject(GroupService);
  fb = inject(FormBuilder);
  router: Router = inject(Router);

  newGroup!: NewGroupInterface;
  hideCreateGroup = true;

  public createGroupForm = this.fb.group({
    groupName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    participantNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
    meetingTime: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
  });

  onClick() {
    this.hideCreateGroup = !this.hideCreateGroup;
  }
  submitGroupForm() {
    this.newGroup = this.createGroupForm.value as NewGroupInterface;
    this.groupService.createGroup(this.newGroup);
    this.createGroupForm.reset();
    this.router.navigate(['user']).catch((error: unknown) => {
      console.error(error);
    });
  }
}
