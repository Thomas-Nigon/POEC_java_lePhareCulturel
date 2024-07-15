import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../../../shared/categories.service';
import { Category } from '../../../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent implements OnInit {
  categoryService = inject(CategoriesService);
  categoryList!: Category[];

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categoryList = data;
    });
  }
}
