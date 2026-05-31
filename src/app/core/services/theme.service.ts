import { Injectable, computed, effect, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private static readonly storageKey = 'dress-rental-theme';
  readonly themeMode = signal<ThemeMode>(this.readThemeMode());
  readonly effectiveTheme = computed(() => this.resolveTheme());

  constructor() {
    effect(() => this.applyTheme(this.effectiveTheme()));
  }

  setTheme(mode: ThemeMode) {
    localStorage.setItem(ThemeService.storageKey, mode);
    this.themeMode.set(mode);
  }

  toggleMode() {
    const next = this.themeMode() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  private readThemeMode(): ThemeMode {
    const stored = localStorage.getItem(ThemeService.storageKey) as ThemeMode | null;
    return stored ?? 'auto';
  }

  private resolveTheme(): ThemeMode {
    const mode = this.themeMode();
    if (mode === 'auto') {
      const hour = new Date().getHours();
      return hour >= 6 && hour < 18 ? 'light' : 'dark';
    }
    return mode;
  }

  private applyTheme(theme: ThemeMode) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
