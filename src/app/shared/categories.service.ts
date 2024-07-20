import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { RouteDefinition } from '../RouteDefinition';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);

  getAllCategories(): Observable<Category[]> {
    // .... 'assets/categories.json'
    return this.http.get<Category[]>(RouteDefinition.Category.CATEGORY_LIST);
  }
}
