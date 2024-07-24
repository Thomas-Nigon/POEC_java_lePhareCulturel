/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupService } from '../../../../shared/services/group.service';
import { NewGroupInterface } from '../../../../models/newGroup.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creat-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss',
})
export class CreateGroupComponent {
  scroller = inject(ViewportScroller);
  groupService = inject(GroupService);
  fb = inject(FormBuilder);
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  eventId!: string;

  newGroup!: NewGroupInterface;
  hideCreateGroup = true;

  public createGroupForm = this.fb.group({
    group_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    group_size: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
    time_meet: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
  });
  constructor() {
    this.eventId = this.activeRoute.snapshot.params['id'] as string;
  }
  ngOnnit() {}
  onClick() {
    this.hideCreateGroup = !this.hideCreateGroup;
    setTimeout(() => {
      this.scroller.scrollToAnchor('bottomCreate');
    });
  }
  submitGroupForm() {
    this.newGroup = this.createGroupForm.value as NewGroupInterface;
    this.groupService.createGroup(this.newGroup, this.eventId).subscribe({
      next: () => {
        this.createGroupForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Le groupe a bien été crée, redirection...',
        });
        this.router.navigate(['user']).catch((error: unknown) => {
          console.error(error);
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue',
        });
      },
    });
  }
}
