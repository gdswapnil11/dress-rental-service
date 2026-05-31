import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import type { Category } from '../../models/category.model';
import type { Dress } from '../../models/dress.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly dresses = signal<Dress[]>([]);
  readonly categories = signal<Category[]>([]);

  constructor(private readonly http: HttpClient) {
    this.loadCategories();
    this.loadDresses();
  }

  loadCategories() {
    this.http.get<Category[]>('/api/categories').pipe(tap((data) => this.categories.set(data))).subscribe();
  }

  loadDresses(query: string = '') {
    const search = query ? `?search=${encodeURIComponent(query)}` : '';
    this.http.get<Dress[]>(`/api/dresses${search}`).pipe(tap((data) => this.dresses.set(data))).subscribe();
  }

  getDressById(id: string) {
    return this.http.get<Dress>(`/api/dresses/${id}`);
  }
}
