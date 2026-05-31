import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MockDataService } from '../services/mock-data.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private readonly mockData: MockDataService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.url.startsWith('/api')) {
      return next.handle(req);
    }

    const requestUrl = req.url.split('?')[0];
    const params = new URLSearchParams(req.urlWithParams.replace(/^[^?]*\?/, ''));

    if (requestUrl === '/api/auth/login' && req.method === 'POST') {
      return of(new HttpResponse({ status: 200, body: this.login(req.body as any) })).pipe(delay(350));
    }

    if (requestUrl === '/api/auth/register' && req.method === 'POST') {
      return of(new HttpResponse({ status: 201, body: this.register(req.body as any) })).pipe(delay(400));
    }

    if (requestUrl === '/api/auth/send-otp' && req.method === 'POST') {
      return of(new HttpResponse({ status: 200, body: { success: true, otpSent: true } })).pipe(delay(250));
    }

    if (requestUrl === '/api/auth/verify-otp' && req.method === 'POST') {
      return of(new HttpResponse({ status: 200, body: this.verifyOtp(req.body as any) })).pipe(delay(300));
    }

    if (requestUrl === '/api/categories' && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.mockData.categories })).pipe(delay(240));
    }

    if (requestUrl === '/api/collections' && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.mockData.collections.filter((collection) => collection.active) })).pipe(delay(240));
    }

    if (requestUrl === '/api/occasions' && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.mockData.dresses.map((dress) => dress.occasion).filter((value, index, self) => self.indexOf(value) === index) })).pipe(delay(240));
    }

    if (requestUrl === '/api/dresses' && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.filterDresses(params) })).pipe(delay(250));
    }

    if (requestUrl.startsWith('/api/dresses/') && req.method === 'GET') {
      const id = requestUrl.replace('/api/dresses/', '');
      return of(new HttpResponse({ status: 200, body: this.mockData.dresses.find((dress) => dress.id === id) })).pipe(delay(300));
    }

    if (requestUrl === '/api/reviews' && req.method === 'GET') {
      const dressId = params.get('dressId');
      const filtered = dressId ? this.mockData.reviews.filter((review) => review.dressId === dressId) : this.mockData.reviews;
      return of(new HttpResponse({ status: 200, body: filtered })).pipe(delay(240));
    }

    if (requestUrl === '/api/orders' && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.mockData.orders })).pipe(delay(350));
    }

    if (requestUrl === '/api/bookings' && req.method === 'POST') {
      const order = req.body as any;
      this.mockData.orders.unshift({ ...order, id: `order-${this.mockData.orders.length + 1}` });
      return of(new HttpResponse({ status: 201, body: { success: true, order } })).pipe(delay(400));
    }

    if (requestUrl === '/api/notifications' && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.mockData.notifications })).pipe(delay(240));
    }

    if (requestUrl === '/api/analytics' && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.createAnalytics() })).pipe(delay(300));
    }

    return next.handle(req);
  }

  private login(payload: { email: string; password: string }): any {
    const user = this.mockData.users.find((entry) => entry.email === payload.email || entry.phone === payload.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return {
      ...user,
      token: `token-${user.id}-${Date.now()}`
    };
  }

  private register(payload: { fullName: string; email: string; phone: string; password: string }): any {
    const exists = this.mockData.users.some((user) => user.email === payload.email || user.phone === payload.phone);
    if (exists) {
      throw new Error('Account already exists');
    }

    const newUser = {
      id: `user-${this.mockData.users.length + 1}`,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      role: 'customer' as const,
      avatar: `https://i.pravatar.cc/150?img=${this.mockData.users.length + 10}`,
      wishlist: [],
      savedAddresses: [{ id: `addr-${this.mockData.users.length + 1}`, label: 'Home', address: 'Registered delivery address' }],
      gender: 'female' as const,
      ageGroup: '25-34' as const,
      measurements: { height: 165, weight: 55, bust: 34, waist: 26, hip: 36 },
      membershipLevel: 'Silver' as const,
      favoriteCategories: [],
      previousRentals: [],
      city: 'Mumbai',
      token: `token-user-${this.mockData.users.length + 1}`
    };

    this.mockData.users.push(newUser);
    return newUser;
  }

  private verifyOtp(payload: { phone: string; otp: string }): any {
    if (payload.otp !== '123456') {
      throw new Error('Invalid OTP');
    }
    const user = this.mockData.users.find((entry) => entry.phone === payload.phone);
    return user
      ? { ...user, token: `token-${user.id}-${Date.now()}` }
      : {
          id: `user-${this.mockData.users.length + 1}`,
          fullName: 'New Customer',
          email: `guest${this.mockData.users.length + 1}@fashionrent.com`,
          phone: payload.phone,
          role: 'customer' as const,
          avatar: `https://i.pravatar.cc/150?img=${this.mockData.users.length + 10}`,
          wishlist: [],
          savedAddresses: [{ id: `addr-${this.mockData.users.length + 1}`, label: 'Home', address: 'Registered delivery address' }],
          gender: 'female' as const,
          ageGroup: '25-34' as const,
          measurements: { height: 165, weight: 55, bust: 34, waist: 26, hip: 36 },
          membershipLevel: 'Silver' as const,
          favoriteCategories: [],
          previousRentals: [],
          city: 'Mumbai',
          token: `token-user-${this.mockData.users.length + 1}`
        };
  }

  private filterDresses(params: URLSearchParams) {
    let items = this.mockData.dresses;
    const search = params.get('search');
    const category = params.get('category');
    const occasion = params.get('occasion');
    const collection = params.get('collection');
    const city = params.get('city');
    const availableToday = params.get('availableToday') === 'true';
    const minPrice = Number(params.get('minPrice')) || 0;
    const maxPrice = Number(params.get('maxPrice')) || Number.MAX_SAFE_INTEGER;

    if (search) {
      items = items.filter((dress) => dress.name.toLowerCase().includes(search.toLowerCase()) || dress.description.toLowerCase().includes(search.toLowerCase()) || dress.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())));
    }
    if (category) {
      items = items.filter((dress) => dress.category === category);
    }
    if (occasion) {
      items = items.filter((dress) => dress.occasion === occasion);
    }
    if (collection) {
      items = items.filter((dress) => dress.collection === collection);
    }
    if (city) {
      items = items.filter((dress) => dress.availableCities.includes(city));
    }
    if (availableToday) {
      items = items.filter((dress) => dress.availableToday);
    }
    return items.filter((dress) => dress.price >= minPrice && dress.price <= maxPrice);
  }

  private createAnalytics() {
    const revenue = this.mockData.orders.reduce((sum, order) => sum + order.price, 0);
    const orders = this.mockData.orders.length;
    const activeRentals = this.mockData.orders.filter((order) => order.status !== 'Completed' && order.status !== 'Returned').length;
    const topCities = this.mockData.dresses.reduce<Record<string, number>>((acc, dress) => {
      dress.availableCities.forEach((city) => (acc[city] = (acc[city] || 0) + 1));
      return acc;
    }, {});
    const revenueByOccasion = this.mockData.dresses.reduce<Record<string, number>>((acc, dress) => {
      acc[dress.occasion] = (acc[dress.occasion] || 0) + dress.price;
      return acc;
    }, {});
    const membershipCounts = this.mockData.users.reduce<Record<string, number>>((acc, user) => {
      const level = user.membershipLevel || 'Silver';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});
    return {
      revenue,
      orders,
      activeRentals,
      dresses: this.mockData.dresses.length,
      users: this.mockData.users.length,
      topCities,
      revenueByOccasion,
      membershipCounts,
      mostRentedCategories: this.mockData.dresses.reduce<Record<string, number>>((acc, dress) => {
        acc[dress.category] = (acc[dress.category] || 0) + 1;
        return acc;
      }, {}),
      peakBookingMonths: ['March', 'October', 'December']
    };
  }
}
