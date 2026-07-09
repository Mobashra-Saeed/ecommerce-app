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
  <div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full relative hover:shadow-xl transition-shadow duration-300">
    
    <a [routerLink]="['/product', product().id]" class="flex flex-col flex-1 cursor-pointer">
      
      <div class="relative w-full h-[200px] sm:h-[250px] md:h-[300px]">
        <img [src]="product().imageURL" class="w-full h-full object-cover" [alt]="product().name" />
      </div>
    
      <div class="p-3 sm:p-4 md:p-5 flex flex-col flex-1">   
        <h3 class="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 leading-tight">{{product().name}}</h3> 
        <p class="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 leading-relaxed flex-1 line-clamp-2">{{product().description}}</p>
        
        <div class="text-xs sm:text-sm font-medium mb-1 sm:mb-2" [class.text-green-600]="product().inStock" [class.text-red-500]="!product().inStock">
          {{product().inStock ? 'In Stock' : 'Out of Stock'}}
        </div>
      </div>
    </a>
    
    <!-- FIX: Moved Wishlist Button completely OUTSIDE the anchor tag! -->
    <button 
      (click)="toggleWishlist($event)"
      class="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white hover:bg-gray-50 text-gray-700 p-1.5 sm:p-2 rounded-full shadow-md flex items-center justify-center transition w-8 h-8 sm:w-10 sm:h-10 border border-gray-100 z-20">
      <mat-icon class="text-base sm:text-lg" [class.text-red-500]="isInWishlist()">
        {{ isInWishlist() ? 'favorite' : 'favorite_border' }}
      </mat-icon>
    </button>
    
    <!-- FOOTER: Price and Cart button stay outside the link -->
    <div class="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 flex items-center justify-between mt-auto">
      <span class="text-base sm:text-lg md:text-xl font-bold text-gray-900">\${{ product().price }}</span>
      
      <button matButton="filled" 
              (click)="handleAddToCart($event)"
              class="flex items-center gap-1 sm:gap-2 bg-blue-600 text-white !text-xs sm:!text-sm px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition relative z-20">
        <mat-icon class="text-sm sm:text-base">shopping_cart</mat-icon> <span class="hidden xs:inline">Add to Cart</span>
      </button>
    </div>
  </div>
  `,
  styles: ``,
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