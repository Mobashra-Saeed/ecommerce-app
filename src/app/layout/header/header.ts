import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions],
  template: ` 
  <mat-toolbar class="w-full elevated py-2">
    <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between px-4 sm:px-6">
      <span class="text-lg sm:text-xl font-bold">Modern Store</span>
   
    <app-header-actions/>
     </div>
  </mat-toolbar>
  `,
  styles: ``,
})
export class Header { }
