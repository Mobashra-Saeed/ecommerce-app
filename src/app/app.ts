import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
  <app-header class="z-10 relative"></app-header>
  <div class="h-[calc(100% - 56px)] sm:h-[calc(100% - 64px)] overflow-hidden page-wrapper"> 
    <router-outlet />
  </div>
  `,
  styles: `:host { display: block; height: 100%; }`,
})
export class App {
}