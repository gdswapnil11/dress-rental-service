import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import type { Order } from '../../models/order.model';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  readonly orders = signal<Order[]>([]);

  constructor(private readonly http: HttpClient) {
    this.loadOrders();
  }

  createBooking(order: Order): Observable<{ success: boolean; order: Order }> {
    return this.http.post<{ success: boolean; order: Order }>('/api/bookings', order).pipe(
      tap(() => this.loadOrders())
    );
  }

  loadOrders() {
    this.http.get<Order[]>('/api/orders').pipe(tap((data) => this.orders.set(data))).subscribe();
  }
}
