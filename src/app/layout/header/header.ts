import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions],
  template: ` 
  <mat-toolbar class="w-full elevated py-2">
  <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between px-4 sm:px-6">
  
  <!-- Clickable Title & Logo Combo -->
  <a routerLink="/" class="flex items-center gap-2 sm:gap-3 cursor-pointer no-underline text-inherit hover:opacity-80 transition-opacity shrink-0">
    <!-- Title: Shows on mobile, keeps its size on desktop -->
    <span class="text-lg sm:text-xl font-bold">Modern Store</span>
    
    <!-- Logo: Hidden on mobile, only shows on desktop screens (sm and up) -->
    <img src="favicon.png" alt="Modern Store Logo" class="hidden sm:block w-8 h-8 sm:w-10 sm:h-10 object-contain" />
  </a>

  <!-- Header Actions Container -->
  <div class="shrink-0 min-w-max">
    <app-header-actions/>
  </div>
  
</div>
  </mat-toolbar>
  `,
  styles: ``,
})
export class Header { }
