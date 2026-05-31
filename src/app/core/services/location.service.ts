import { Injectable, signal } from '@angular/core';

const CITY_KEY = 'dress-rental-city';
const defaultCity = 'Mumbai';

@Injectable({ providedIn: 'root' })
export class LocationService {
  readonly cities = ['Pune', 'Mumbai', 'Nagpur', 'Hyderabad', 'Bangalore'];
  readonly selectedCity = signal(this.restoreCity());

  selectCity(city: string) {
    if (this.cities.includes(city)) {
      this.selectedCity.set(city);
      localStorage.setItem(CITY_KEY, city);
    }
  }

  private restoreCity(): string {
    try {
      const saved = localStorage.getItem(CITY_KEY);
      return saved && this.cities.includes(saved) ? saved : defaultCity;
    } catch {
      return defaultCity;
    }
  }
}
