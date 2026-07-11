import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { product } from '../../models/products';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, RouterLink],
  template: ` 
  <div class="product-card bg-white rounded-xl overflow-hidden flex flex-col h-full relative shadow-lg hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer">
    
    <a [routerLink]="['/product', product().id]" class="flex flex-col flex-1">
      
      <div class="relative w-full h-[180px] sm:h-[220px] md:h-[280px] overflow-hidden">
        <img [src]="product().imageURL" class="w-full h-full object-cover transition-transform duration-700 ease-out" [alt]="product().name" />
        <div class="absolute inset-0 bg-black opacity-0 transition-opacity duration-500"></div>
      </div>
    
      <div class="p-2 sm:p-2.5 md:p-4 flex flex-col flex-1">   
        <h3 class="text-xs sm:text-sm md:text-lg font-semibold text-gray-900 mb-0.5 sm:mb-1 leading-tight line-clamp-1">{{product().name}}</h3> 
        <p class="text-[11px] sm:text-xs md:text-sm text-gray-600 mb-1 sm:mb-1.5 md:mb-2 leading-relaxed flex-1 line-clamp-2">{{product().description}}</p>
        
        <div class="text-[11px] sm:text-xs md:text-sm font-medium mb-0.5" [class.text-green-600]="product().inStock" [class.text-red-500]="!product().inStock">
          {{product().inStock ? 'In Stock' : 'Out of Stock'}}
        </div>
      </div>
    </a>
    
    <!-- Wishlist Button -->
    <button 
      (click)="toggleWishlist($event)"
      class="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3 bg-white hover:bg-gray-50 text-gray-700 p-1 sm:p-1.5 md:p-2 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ease-out w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 border border-gray-100 z-20 hover:scale-110 hover:shadow-lg cursor-pointer">
      <mat-icon class="text-sm sm:text-base md:text-lg transition-all duration-300" [class.text-red-500]="isInWishlist()">
        {{ isInWishlist() ? 'favorite' : 'favorite_border' }}
      </mat-icon>
    </button>
    
    <!-- FOOTER: Price and Cart button -->
    <div class="px-2 sm:px-2.5 md:px-4 pb-2 sm:pb-2.5 md:pb-4 flex items-center justify-between mt-auto">
      <span class="text-sm sm:text-base md:text-xl font-bold text-gray-900">\${{ product().price }}</span>
      
      <button matButton="filled" 
              (click)="handleAddToCart($event)"
              class="flex items-center gap-0.5 sm:gap-1 md:gap-2 bg-blue-600 text-white !text-[11px] sm:!text-xs md:!text-sm px-1.5 sm:px-2 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-out relative z-20 hover:scale-105 active:scale-95 cursor-pointer">
        <mat-icon class="text-xs sm:text-sm md:text-base">shopping_cart</mat-icon>
      </button>
    </div>
  </div>
  `,
  styles: `
    .product-card {
      will-change: transform;
    }
    .product-card:hover {
      transform: translateY(-6px);
    }
    .product-card:hover img {
      transform: scale(1.1);
    }
    .product-card:hover .absolute.inset-0.bg-black {
      opacity: 0.08;
    }
    .product-card .line-clamp-1 {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `,
})
export class ProductCard {
  readonly store = inject(EcommerceStore);
  product = input.required<product>();

  isInWishlist = computed(() => 
    this.store.wishlistItems().some(item => item.id === this.product().id)
  );

  toggleWishlist(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(this.product().id);
    } else {
      this.store.addToWishlist(this.product());
    }
  }

  handleAddToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.store.addToCart(this.product());
  }
}