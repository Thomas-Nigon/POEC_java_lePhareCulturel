import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationDummyService {
  private totalItems = 100;

  getItems(page = 1, itemsPerPage = 10): Observable<string[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < this.totalItems) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        items.push(`Item ${i + 1}`);
      }
    }
    return of(items).pipe(delay(500));
  }
}
