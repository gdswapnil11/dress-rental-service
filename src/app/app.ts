import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderShellComponent } from './shared/components/header-shell.component';
import { FooterShellComponent } from './shared/components/footer-shell.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderShellComponent, FooterShellComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  private readonly themeService = inject(ThemeService);
  protected readonly themeMode = this.themeService.themeMode;
}
