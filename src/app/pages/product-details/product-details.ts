import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
    selector: 'app-product-details',
    imports: [CurrencyPipe, MatButtonModule, MatIcon, RouterLink],
    template: `
    <div class="max-w-[1200px] mx-auto p-4 sm:p-6 min-h-[70vh]">
      
      <!-- Back Navigation -->
      <div class="mb-4 sm:mb-8">
        <a routerLink="/products/all" class="text-blue-600 flex items-center gap-2 hover:underline font-medium text-sm">
          <mat-icon class="text-sm w-4 h-4 flex items-center justify-center">arrow_back</mat-icon> Back to Products
        </a>
      </div>

      @if (product()) {
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
            
            <!-- LEFT SIDE: Image Container -->
            <div class="bg-gray-50 p-4 sm:p-8 flex items-center justify-center h-full min-h-[250px] md:min-h-[500px]">
              <img [src]="product()?.imageURL" [alt]="product()?.name" class="max-w-full max-h-[300px] sm:max-h-[400px] object-contain rounded-xl shadow-lg mix-blend-multiply" />
            </div>

            <!-- RIGHT SIDE: Product Info -->
            <div class="p-5 sm:p-8 md:p-12 flex flex-col justify-center">
              
              <div class="mb-2">
                <span class="bg-blue-50 text-blue-700 text-xs font-bold px-2 sm:px-3 py-1 rounded-full uppercase tracking-wider">
                  {{ product()?.category }}
                </span>
              </div>
              
              <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
                {{ product()?.name }}
              </h1>
              
              <div class="flex items-center gap-2 mb-4 sm:mb-6 text-yellow-400">
                <mat-icon class="text-sm w-5 h-5">star</mat-icon>
                <span class="text-gray-900 font-bold">{{ product()?.rating }}</span>
                <span class="text-gray-500 text-xs sm:text-sm ml-1">({{ product()?.reviewCount }} reviews)</span>
              </div>
              
              <p class="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                {{ product()?.description }}
              </p>
              
              <div class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8">
                {{ product()?.price | currency }}
              </div>
              
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button mat-flat-button class="!bg-blue-600 !text-white !px-6 sm:!px-8 !py-4 sm:!py-6 !text-base sm:!text-lg !rounded-xl hover:!bg-blue-700 flex-1" (click)="addToCart()">
                  <mat-icon class="mr-2">shopping_cart</mat-icon>
                  Add to Cart
                </button>
                
                <button mat-stroked-button class="!px-4 sm:!px-6 !py-4 sm:!py-6 !text-base sm:!text-lg !rounded-xl !border-gray-300" (click)="toggleWishlist()">
                  <mat-icon [class.text-red-500]="isInWishlist()">
                    {{ isInWishlist() ? 'favorite' : 'favorite_border' }}
                  </mat-icon>
                </button>
              </div>

              <!-- Stock Status -->
              <div class="mt-6 sm:mt-8 flex items-center gap-2 text-sm font-medium" [class.text-green-600]="product()?.inStock" [class.text-red-600]="!product()?.inStock">
                <mat-icon class="text-sm w-5 h-5">{{ product()?.inStock ? 'check_circle' : 'cancel' }}</mat-icon>
                {{ product()?.inStock ? 'In Stock and ready to ship' : 'Out of Stock' }}
              </div>

            </div>
          </div>
        </div>
      } @else {
        <div class="text-center py-16 sm:py-20">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Product not found</h2>
          <p class="text-gray-500 mt-2 text-sm sm:text-base">The item you are looking for does not exist.</p>
        </div>
      }
    </div>
  `
})
export default class ProductDetails {
    readonly store = inject(EcommerceStore);
    private route = inject(ActivatedRoute);

    // Grab the ID from the URL
    productId = this.route.snapshot.paramMap.get('id');

    // Find the matching product from the store
    product = computed(() =>
        this.store.products().find(p => p.id === this.productId)
    );

    isInWishlist = computed(() => {
        const currentProduct = this.product();
        if (!currentProduct) return false;
        return this.store.wishlistItems().some(item => item.id === currentProduct.id);
    });

    addToCart() {
        const currentProduct = this.product();
        if (currentProduct) {
            this.store.addToCart(currentProduct);
        }
    }

    toggleWishlist() {
        const currentProduct = this.product();
        if (currentProduct) {
            if (this.isInWishlist()) {
                this.store.removeFromWishlist(currentProduct.id);
            } else {
                this.store.addToWishlist(currentProduct);
            }
        }
    }
}