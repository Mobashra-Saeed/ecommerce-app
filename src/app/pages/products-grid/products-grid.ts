import { Component, inject, input, signal, effect, computed, viewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
    MatIcon,
    MatIconButton,
  ],
  template: `
    <mat-sidenav-container class="h-full w-full bg-transparent">
      
      <!-- Sidenav - sticky on desktop by using position sticky via CSS -->
      <mat-sidenav #sidenav 
                   [mode]="isDesktop() ? 'side' : 'over'" 
                   [opened]="sidenavOpened()" 
                   class="sidenav-panel w-[250px] bg-gray-200 border-r border-gray-300"
                   [class.sticky-sidenav]="isDesktop()">
        <div class="p-4">
          
          <!-- Cross icon is present and operational for manual toggles -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-gray-900">Categories</h2>
            <button matIconButton (click)="toggleSidenav()">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          
          <mat-nav-list>
            @for (cat of Categories(); track cat) {
              <mat-list-item
                [activated]="cat === category()"
                [routerLink]="['/products', cat]"
                (click)="!isDesktop() && sidenav.close()"
                class="my-2 cursor-pointer">
                <span matListItemTitle class="font-medium" [class]="cat === category() ? '!text-white' : ''">
                  {{ cat | titlecase }}
                </span>
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="bg-gray-100 px-3 sm:px-4 md:px-6 py-4">
        
        <!-- Top Title Bar with dynamic hamburger menu button -->
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          @if (!sidenav.opened) {
            <button matIconButton (click)="toggleSidenav()">
              <mat-icon>menu</mat-icon>
            </button>
          }
          <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{{ category() | titlecase }}</h1>
        </div>
        
        <p class="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 md:mb-6">{{ store.filteredproducts().length }} products</p>
        
        <!-- Optimized grid structure to look balanced on mobile, tablets, and laptops -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          @for (product of store.filteredproducts(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    :host {
      display: block;
      height: calc(100vh - 56px);
    }
    mat-sidenav-container {
      height: 100%;
    }
    mat-sidenav-content {
      scrollbar-width: thin;
    }
  `
})
export default class ProductsGrid {
  readonly store = inject(EcommerceStore);
  category = input<string>('');
  private breakpointObserver = inject(BreakpointObserver);

  sidenav = viewChild.required(MatSidenav);

  // FIX: Shifted query to 768px (Tailwind md) so tablets are grouped with desktops/laptops
  isDesktop = toSignal(
    this.breakpointObserver.observe('(min-width: 768px)').pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );

  sidenavOpened = signal(true);

  constructor() {
    effect(() => {
      this.store.setCategory(this.category());
    });

    // Auto-open layout whenever screen crosses the mobile/tablet threshold
    effect(() => {
      this.sidenavOpened.set(this.isDesktop());
    });
  }

  toggleSidenav() {
    this.sidenavOpened.update(state => !state);
  }

  Categories = signal<string[]>([
    'all', 'Audio', 'TV', 'Gaming', 'Mobile', 'Computers',
    'Wearables', 'Photography', 'Storage', 'Accessories', 'Tablets', 'Smart Home'
  ]);
}