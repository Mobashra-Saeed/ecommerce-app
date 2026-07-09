import { Component, inject, input, signal, effect, computed, viewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
    <mat-sidenav-container class="h-[calc(100vh-64px)] w-full">
      
      <!-- Sidenav responds to manual toggles across all screen widths -->
      <mat-sidenav #sidenav 
                   [mode]="isDesktop() ? 'side' : 'over'" 
                   [opened]="sidenavOpened()" 
                   class="w-[250px] bg-gray-200 h-full border-r border-gray-300">
        <div class="p-4">
          
          <!-- UNIFIED HEADER (Shows cross close icon on BOTH mobile and desktop) -->
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

      <!-- Main Content Area -->
      <mat-sidenav-content class="bg-gray-100 p-4 sm:p-6 h-full overflow-y-auto">
        
        <!-- TOP TOOLBAR: Always present toggle button for when sidenav is closed -->
        <div class="flex items-center gap-3 mb-4">
          @if (!sidenav.opened) {
            <button matIconButton (click)="toggleSidenav()">
              <mat-icon>menu</mat-icon>
            </button>
          }
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">{{ category() | titlecase }}</h1>
        </div>
        
        <p class="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{{ store.filteredproducts().length }} products</p>
        
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          @for (product of store.filteredproducts(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  readonly store = inject(EcommerceStore);
  category = input<string>('');
  private breakpointObserver = inject(BreakpointObserver);

  // References the sidenav instance directly to check state
  sidenav = viewChild.required(MatSidenav);

  isDesktop = computed(() => 
    this.breakpointObserver.isMatched('(min-width: 768px)')
  );

  // Tracks open state explicitly using a dynamic signal reactive wrapper
  sidenavOpened = signal(true);

  constructor() {
    effect(() => {
      this.store.setCategory(this.category());
    });

    // Automatically open the sidebar when shifting from mobile to desktop viewports
    effect(() => {
      this.sidenavOpened.set(this.isDesktop());
    });
  }

  toggleSidenav() {
    this.sidenavOpened.update(state => !state);
  }

  Categories = signal<string[]>([
    'all',
    'Audio',
    'TV',
    'Gaming',
    'Mobile',
    'Computers',
    'Wearables',
    'Photography',
    'Storage',
    'Accessories',
    'Tablets',
    'Smart Home',
  ]);
}