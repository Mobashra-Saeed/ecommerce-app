import { Component, inject, input, signal, effect, viewChild, ElementRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ProductCard } from '../../components/product-card/product-card';
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
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
    MatIcon,
    MatIconButton,
  ],
  template: `
    <!-- Mobile overlay backdrop -->
    @if (!isDesktop() && sidenavOpened()) {
      <div class="fixed inset-0 bg-black/50 z-20" (click)="toggleSidenav()"></div>
    }
    
    <div class="flex h-full">
      <!-- DESKTOP SIDEBAR -->
      @if (isDesktop() && sidenavOpened()) {
        <aside class="w-[180px] bg-white border-r border-gray-200 shrink-0">
          <div class="p-3">
            <!-- FIX 1: Added flex layout and close button to desktop -->
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-sm font-bold text-gray-900">Categories</h2><button matIconButton (click)="toggleSidenav()" 
                class="!w-8 !h-8 !p-0 flex items-center justify-center text-gray-500 hover:text-gray-800">
              <mat-icon class="!text-[20px] !w-[20px] !h-[20px] m-0">close</mat-icon>
            </button>
            </div>
            
            <mat-nav-list class="!pt-0">
              @for (cat of Categories(); track cat) {
                <mat-list-item
                  [activated]="cat === category()"
                  [routerLink]="['/products', cat]"
                  [class]="cat === category() ? '!bg-blue-700 shadow-sm' : 'hover:!bg-gray-100'"
                  class="!h-8 !min-h-8 !my-1 !rounded-md cursor-pointer transition-colors">
                  <!-- Improved text contrast for active/inactive states -->
                  <span matListItemTitle class="!text-sm !font-medium" [class]="cat === category() ? '!text-white' : '!text-gray-700'">
                    {{ cat | titlecase }}
                  </span>
                </mat-list-item>
              }
            </mat-nav-list>
          </div>
        </aside>
      }
      
      <!-- MOBILE SIDEBAR -->
      @if (!isDesktop() && sidenavOpened()) {
        <aside class="fixed left-0 top-[56px] bottom-0 w-[220px] bg-white border-r border-gray-200 z-30 shadow-lg">
          <div class="p-3">
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-sm font-bold text-gray-900">Categories</h2>
              <button matIconButton (click)="toggleSidenav()" class="!w-7 !h-7 text-gray-500 hover:text-gray-800">
                <mat-icon class="!text-lg">close</mat-icon>
              </button>
            </div>
            <mat-nav-list class="!pt-0">
              @for (cat of Categories(); track cat) {
                <mat-list-item
                  [activated]="cat === category()"
                  [routerLink]="['/products', cat]"
                  (click)="sidenavOpened.set(false)"
                  [class]="cat === category() ? '!bg-blue-600 shadow-sm' : 'hover:!bg-gray-50'"
                  class="!h-8 !min-h-8 !my-0.5 !rounded-md cursor-pointer transition-colors">
                  <span matListItemTitle class="!text-xs !font-medium" [class]="cat === category() ? '!text-white' : '!text-gray-700'">
                    {{ cat | titlecase }}
                  </span>
                </mat-list-item>
              }
            </mat-nav-list>
          </div>
        </aside>
      }
      
      <!-- Main Content - Scrolls independently -->
      <main class="flex-1 overflow-y-auto bg-gray-100 px-3 sm:px-4 md:px-6 py-4"
            [class.scrollbar-thin]="true">
        
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          @if (!isDesktop() || !sidenavOpened()) {
            <button matIconButton (click)="toggleSidenav()">
              <mat-icon>menu</mat-icon>
            </button>
          }
          <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{{ category() | titlecase }}</h1>
        </div>
        
        <p class="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 md:mb-6">{{ store.filteredproducts().length }} products</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          @for (product of store.filteredproducts(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
          }
        </div>
      </main>
      
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    .scrollbar-thin {
      scrollbar-width: thin;
    }
  `
})
export default class ProductsGrid {
  readonly store = inject(EcommerceStore);
  category = input<string>('');
  private breakpointObserver = inject(BreakpointObserver);

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