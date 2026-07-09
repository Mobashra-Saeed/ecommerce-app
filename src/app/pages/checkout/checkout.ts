import { Component, inject, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
    selector: 'app-checkout',
    imports: [RouterLink, CurrencyPipe],
    template: `
    <div class="max-w-[1200px] mx-auto p-4 sm:p-6 min-h-[70vh]">
      
      <!-- Back Navigation -->
      <div class="mb-4 sm:mb-6">
        <a routerLink="/my-cart" class="text-blue-600 hover:underline font-medium text-sm flex items-center gap-2">
          ← Back to Cart
        </a>
      </div>

      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Checkout</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        <!-- LEFT: Forms -->
        <div class="lg:col-span-2 space-y-6 sm:space-y-8">
          
          <!-- Shipping Form -->
          <div class="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4">Shipping Information</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" class="mt-1 block w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="John Doe">
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" class="mt-1 block w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="123 Main St">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">City</label>
                <input type="text" class="mt-1 block w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="New York">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input type="text" class="mt-1 block w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="10001">
              </div>
            </div>
          </div>

          <!-- Payment Form -->
          <div class="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Card Number</label>
                <input type="text" class="mt-1 block w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="0000 0000 0000 0000">
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input type="text" class="mt-1 block w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="MM/YY">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">CVC</label>
                  <input type="text" class="mt-1 block w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="123">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Order Summary -->
        <div class="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-100 h-fit sticky top-6">
          <h2 class="text-base sm:text-lg font-bold text-gray-900 border-b border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4">Order Summary</h2>
          
          <!-- Mini Cart List -->
          <div class="space-y-2 sm:space-y-3 mb-4 sm:mb-6 max-h-[300px] overflow-y-auto pr-2">
            @for (item of store.cart(); track item.id) {
              <div class="flex justify-between text-xs sm:text-sm">
                <span class="text-gray-600 truncate pr-4 max-w-[160px] sm:max-w-[200px]">{{ item.name }}</span>
                <span class="font-medium text-gray-900">{{ item.price | currency }}</span>
              </div>
            }
          </div>
          
          <div class="border-t border-gray-200 pt-3 sm:pt-4 space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium">{{ subtotal() | currency }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tax (8%)</span>
              <span class="font-medium">{{ estimatedTax() | currency }}</span>
            </div>
            <div class="flex justify-between pt-3 sm:pt-4 border-t border-gray-200 mt-1 sm:mt-2">
              <span class="text-sm sm:text-base font-bold text-gray-900">Total</span>
              <span class="text-lg sm:text-xl font-extrabold text-gray-900">{{ orderTotal() | currency }}</span>
            </div>
          </div>

          <button (click)="placeOrder()" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-3.5 px-4 rounded-xl transition shadow-md text-base sm:text-lg">
            Place Order
          </button>
        </div>
      </div>
    </div>
  `
})
export default class Checkout {
    readonly store = inject(EcommerceStore);
    private router = inject(Router);

    // Recalculate totals directly from the store
    subtotal = computed(() =>
        this.store.cart().reduce((sum, item) => sum + item.price, 0)
    );
    estimatedTax = computed(() => this.subtotal() * 0.08);
    orderTotal = computed(() => this.subtotal() + this.estimatedTax());

    placeOrder() {
        if (this.store.cart().length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // 1. Show success message
        alert('Payment successful! Your order has been placed.');

        // 2. Empty the cart
        this.store.clearCart();

        // 3. Send them back to the homepage
        this.router.navigate(['/products/all']);
    }
}