import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import type { Category } from '../../models/category.model';
import type { Collection } from '../../models/collection.model';
import type { Dress } from '../../models/dress.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly dresses = signal<Dress[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly collections = signal<Collection[]>([]);
  readonly occasions = signal<string[]>([]);

  constructor(private readonly http: HttpClient) {
    this.loadCategories();
    this.loadCollections();
    this.loadOccasions();
    this.loadDresses();
  }

  loadCategories() {
    this.http.get<Category[]>('/api/categories').pipe(tap((data) => this.categories.set(data))).subscribe();
  }

  loadCollections() {
    this.http.get<Collection[]>('/api/collections').pipe(tap((data) => this.collections.set(data))).subscribe();
  }

  loadOccasions() {
    this.http.get<string[]>('/api/occasions').pipe(tap((data) => this.occasions.set(data))).subscribe();
  }

  loadDresses(options: { search?: string; occasion?: string; collection?: string; city?: string; availableToday?: boolean } = {}) {
    const params = new URLSearchParams();
    if (options.search) params.set('search', options.search);
    if (options.occasion) params.set('occasion', options.occasion);
    if (options.collection) params.set('collection', options.collection);
    if (options.city) params.set('city', options.city);
    if (options.availableToday) params.set('availableToday', 'true');
    const query = params.toString() ? `?${params.toString()}` : '';
    this.http.get<Dress[]>(`/api/dresses${query}`).pipe(tap((data) => this.dresses.set(data))).subscribe();
  }

  getDressById(id: string) {
    return this.http.get<Dress>(`/api/dresses/${id}`);
  }
}
