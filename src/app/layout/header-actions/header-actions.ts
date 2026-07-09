import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header-actions',
  imports: [MatButtonModule, MatIconButton, MatIcon, RouterLink, MatBadgeModule],
  template: ` 
  <div class="flex items-center gap-1 sm:gap-2 min-w-max">
    <button matIconButton routerLink="/my-wishlist" 
            class="shrink-0"
            [matBadge]="store.wishlistItems().length" 
            [matBadgeHidden]="store.wishlistItems().length === 0" 
            matBadgeColor="warn">
      <mat-icon>favorite</mat-icon>
    </button>
    
    <!-- Added shrink-0 here -->
    <button matIconButton
            routerLink="/my-cart"
            class="shrink-0"
            [matBadge]="store.cart().length"
            [matBadgeHidden]="store.cart().length === 0"
            matBadgeColor="warn">
      <mat-icon>shopping_cart</mat-icon>
    </button>
    
    <!-- DYNAMIC AUTH BUTTONS -->
    @if (store.isLoggedIn()) {
      <div class="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2 pl-2 sm:pl-4 border-l border-gray-200 shrink-0">
        <button matButton color="warn" (click)="store.logout()" class="!text-xs sm:!text-sm">
          Log out
        </button>
      </div>
    } @else {
      <div class="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2 pl-1 sm:pl-4 border-l border-gray-200 shrink-0">
        <button matButton routerLink="/sign-in" class="!text-xs sm:!text-sm !px-2 sm:!px-4">Sign in</button>
        <button mat-flat-button color="primary" routerLink="/sign-up" class="!text-xs sm:!text-sm !px-2 sm:!px-4">Sign up</button>
      </div>
    }
  </div>`,
  styles: ``,
})
export class HeaderActions {
  readonly store = inject(EcommerceStore);
}