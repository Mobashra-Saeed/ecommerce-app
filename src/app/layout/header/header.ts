import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions, RouterLink],
  template: ` 
  <mat-toolbar class="w-full elevated !py-3 sm:!py-4 !px-2 sm:!px-4 md:!px-6" style="min-height: 56px;">
    <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between gap-2 sm:gap-4">
    
      <a routerLink="/" class="flex items-center gap-1.5 sm:gap-3 cursor-pointer no-underline text-inherit hover:opacity-80 transition-opacity shrink min-w-0">
        <span class="text-sm sm:text-base md:text-xl font-bold truncate">Modern Store</span>
        <img src="favicon.png" alt="Modern Store Logo" class="hidden sm:block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain shrink-0" />
        
      </a>
  
      <!-- Header Actions Container -->
      <div class="shrink-0">
        <app-header-actions/>
      </div>
      
    </div>
  </mat-toolbar>
  `,
  styles: ``,
})
export class Header { }
