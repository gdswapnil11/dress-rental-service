import { Injectable } from '@angular/core';
import { categories, collections, coupons, dresses, notifications, orders, reviews, users } from '../../mock-data/mock-data';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  dresses = dresses;
  categories = categories;
  collections = collections;
  users = users;
  reviews = reviews;
  orders = orders;
  notifications = notifications;
  coupons = coupons;
}
