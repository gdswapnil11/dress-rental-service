import { Injectable } from '@angular/core';
import { categories, coupons, dresses, notifications, orders, reviews, users } from '../../mock-data/mock-data';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  dresses = dresses;
  categories = categories;
  users = users;
  reviews = reviews;
  orders = orders;
  notifications = notifications;
  coupons = coupons;
}
