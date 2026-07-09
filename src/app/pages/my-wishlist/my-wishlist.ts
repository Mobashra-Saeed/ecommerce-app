import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-my-wishlist',
  imports: [RouterLink, MatIcon, MatButtonModule],
    template: `
    <div class="max-w-[1200px] mx-auto p-4 sm:p-6 min-h-[70vh]">
      
      <!-- Back to Navigation Link -->
      <div class="mb-4 sm:mb-6">
        <a routerLink="/products/all" class="text-blue-600 flex items-center gap-2 hover:underline font-medium text-sm">
          <mat-icon class="text-sm w-4 h-4 flex items-center justify-center">arrow_back</mat-icon> Continue Shopping
        </a>
      </div>

      @if (store.wishlistItems().length > 0) {
        <!-- Wishlist Active View -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">My Wishlist</h1>
          <div class="flex items-center gap-3 sm:gap-4">
            <span class="text-gray-600 text-xs sm:text-sm font-medium">{{ store.wishlistItems().length }} items</span>
            <button (click)="store.clearWishlist()" class="text-xs text-red-500 hover:underline border border-red-200 px-2 py-1 rounded-md bg-red-50">
              Clear All
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          @for (product of store.wishlistItems(); track product.id) {
            <div class="bg-white border border-gray-100 rounded-xl shadow-md overflow-hidden flex flex-col relative group">
              
              <!-- Trash/Remove button -->
              <button 
                (click)="store.removeFromWishlist(product.id)"
                class="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white hover:bg-red-50 text-gray-500 hover:text-red-600 p-1.5 sm:p-2 rounded-lg shadow-sm z-10 transition border border-gray-100">
                <mat-icon class="text-base sm:text-lg">delete_outline</mat-icon>
              </button>

              <div class="h-[180px] sm:h-[220px] md:h-[240px] w-full bg-gray-50">
                <img [src]="product.imageURL" class="w-full h-full object-cover" [alt]="product.name" />
              </div>

              <div class="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 class="font-semibold text-gray-900 text-sm sm:text-base mb-1 line-clamp-1">{{ product.name }}</h3>
                  <p class="text-xs text-gray-500 line-clamp-2 mb-2 sm:mb-3 hidden sm:block">{{ product.description }}</p>
                </div>
                
                <div>
                  <div class="text-xs font-semibold mb-2 sm:mb-3" [class.text-green-600]="product.inStock" [class.text-red-500]="!product.inStock">
                    {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                  </div>
                  <div class="flex items-center justify-between pt-1 sm:pt-2 border-t border-gray-50">
                    <span class="font-bold text-gray-900 text-sm sm:text-base">\${{ product.price }}</span>
                    
                    <button (click)="store.addToCart(product)" 
                            class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-md flex items-center gap-0.5 sm:gap-1 transition">
                      <mat-icon class="scale-50 sm:scale-75">shopping_cart</mat-icon> <span class="hidden xs:inline">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      } @else {
        <!-- Wishlist Empty State View -->
        <div class="flex flex-col items-center justify-center pt-12 sm:pt-16 pb-8 sm:pb-12 text-center">
          <div class="bg-gray-50 p-4 sm:p-6 rounded-full mb-4 border border-gray-100 shadow-inner">
            <mat-icon class="text-gray-400 scale-[1.5] sm:scale-[2.0] w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">favorite_border</mat-icon>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Your wishlist is empty</h2>
          <p class="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 max-w-sm">Save items you love for later!</p>
          <button routerLink="/products/all" class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg transition shadow-md text-sm sm:text-base cursor-pointer">
            Start Shopping
          </button>
        </div>
      }

    </div>
  `,
  styles: `
    :host ::ng-deep .mat-icon {
      vertical-align: middle;
    }
  `,
})
export default class MyWishlist {
  readonly store = inject(EcommerceStore);
}