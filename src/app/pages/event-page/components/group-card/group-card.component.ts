/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Group } from '../../../../models/event.model';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.scss',
})
export class GroupCardComponent implements OnInit {
  @Input() group!: Group;
  date!: Date;
  displayDate!: string;

  dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  ngOnInit() {
    /*  this.isoStartDateString = event.first_timing.begin;
    this.beginDate = new Date(this.isoStartDateString);
    this.localeStartDateString =
      this.beginDate.toLocaleString(undefined, this.dateOptions).charAt(0).toUpperCase() +
      this.beginDate.toLocaleString(undefined, this.dateOptions).slice(1); */
    /*     this.date = new Date(this.group && this.group.time_meet);
    this.displayDate = this.date.toLocaleString(undefined, this.dateOptions); */
  }
}
