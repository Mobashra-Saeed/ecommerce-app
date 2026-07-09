import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { EcommerceStore } from '../ecommerce-store';

@Component({
    selector: 'app-my-cart',
    imports: [RouterLink, MatIcon, MatButtonModule, CurrencyPipe],
    template: `
    <div class="max-w-[1200px] mx-auto p-4 sm:p-6 min-h-[70vh]">
      
      <!-- Back Navigation Link -->
      <div class="mb-4 sm:mb-6">
        <a routerLink="/products/all" class="text-blue-600 flex items-center gap-2 hover:underline font-medium text-sm">
          <mat-icon class="text-sm w-4 h-4 flex items-center justify-center">arrow_back</mat-icon> Continue Shopping
        </a>
      </div>

      @if (store.cart().length > 0) {
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Shopping Cart</h1>

        <!-- Split Grid View: Items on left, Summary on right -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          
          <!-- LEFT SIDE: Product List -->
          <div class="lg:col-span-2 flex flex-col gap-3 sm:gap-4">
            @for (item of store.cart(); track item.id; let idx = $index) {
              <div class="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 shadow-sm flex gap-3 sm:gap-4 relative">
                
                <!-- Remove from cart button -->
                <button 
                  (click)="removeFromCart(idx)"
                  class="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 transition">
                  <mat-icon>delete_outline</mat-icon>
                </button>

                <!-- Item Image -->
                <div class="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gray-50 flex-shrink-0 rounded-lg overflow-hidden">
                  <img [src]="item.imageURL" class="w-full h-full object-cover" [alt]="item.name" />
                </div>

                <!-- Item Details -->
                <div class="flex flex-col justify-between py-1 pr-6 sm:pr-8 flex-1 min-w-0">
                  <div>
                    <h3 class="font-semibold text-gray-900 text-sm sm:text-base md:text-lg line-clamp-1 mb-1">{{ item.name }}</h3>
                    <p class="text-xs text-gray-500 line-clamp-2 hidden sm:block">{{ item.description }}</p>
                  </div>
                  
                  <div class="flex items-center justify-between mt-2">
                    <span class="font-bold text-gray-900 text-sm sm:text-base md:text-lg">{{ item.price | currency }}</span>
                    <span class="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100">Qty: 1</span>
                  </div>
                </div>

              </div>
            }
          </div>

          <!-- RIGHT SIDE: Order Summary Sidebar -->
          <div class="bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-sm h-fit">
            <h2 class="text-base sm:text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 sm:pb-4 mb-3 sm:mb-4">Order Summary</h2>
            
            <div class="flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              <div class="flex justify-between">
                <span>Subtotal ({{ store.cart().length }} items)</span>
                <span class="font-medium text-gray-900">{{ subtotal() | currency }}</span>
              </div>
              <div class="flex justify-between">
                <span>Estimated Shipping</span>
                <span class="text-green-600 font-medium">FREE</span>
              </div>
              <div class="flex justify-between">
                <span>Estimated Tax</span>
                <span class="font-medium text-gray-900">{{ estimatedTax() | currency }}</span>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-3 sm:pt-4 flex justify-between items-center mb-4 sm:mb-6">
              <span class="text-sm sm:text-base font-bold text-gray-900">Order Total</span>
              <span class="text-lg sm:text-xl font-extrabold text-gray-900">{{ orderTotal() | currency }}</span>
            </div>

            <button routerLink="/checkout" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 rounded-lg transition shadow-md flex items-center justify-center gap-2 text-sm sm:text-base">
              Proceed to Checkout
            </button>
          </div>

        </div>
      } @else {
        <!-- Cart Empty State View -->
        <div class="flex flex-col items-center justify-center pt-12 sm:pt-16 pb-8 sm:pb-12 text-center">
          <div class="bg-gray-50 p-4 sm:p-6 rounded-full mb-4 border border-gray-100 shadow-inner">
            <mat-icon class="text-gray-400 scale-[1.5] sm:scale-[2.0] w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">shopping_cart</mat-icon>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Your cart is empty</h2>
          <p class="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 max-w-sm">Looks like you haven't added anything to your cart yet.</p>
          <button routerLink="/products/all" class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg transition shadow-md text-sm sm:text-base">
            Start Shopping
          </button>
        </div>
      }

    </div>
  `,
    styles: ``,
})
export default class MyCart {
    readonly store = inject(EcommerceStore);

    // Computes the summary mathematics cleanly using signals
    subtotal = computed(() =>
        this.store.cart().reduce((sum, item) => sum + item.price, 0)
    );

    estimatedTax = computed(() => this.subtotal() * 0.08); // 8% placeholder tax
    orderTotal = computed(() => this.subtotal() + this.estimatedTax());

    removeFromCart(index: number) {
        this.store.removeFromCart(index);
    }
}