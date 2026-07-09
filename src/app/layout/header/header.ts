import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions],
  template: ` 
  <mat-toolbar class="w-full elevated py-2">
    <<div class="max-w-[1200px] mx-auto w-full flex items-center justify-between px-4 sm:px-6">
  
  <a routerLink="/" class="flex items-center gap-2 sm:gap-3 cursor-pointer no-underline text-inherit hover:opacity-80 transition-opacity">
    <img src="favicon.png" alt="Modern Store Logo" class="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
    <span class="text-lg sm:text-xl font-bold">Modern Store</span>
  </a>
  <app-header-actions/>
    </div>
  </mat-toolbar>
  `,
  styles: ``,
})
export class Header { }
