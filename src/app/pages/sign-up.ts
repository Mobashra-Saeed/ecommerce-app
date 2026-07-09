import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { EcommerceStore } from '../ecommerce-store';

@Component({
    selector: 'app-sign-up',
    imports: [RouterLink],
    template: `
    <div class="min-h-[70vh] flex items-center justify-center py-8 sm:py-12 px-4">
        <div class="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div class="text-center mb-6 sm:mb-8">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900">Create an account</h2>
                <p class="mt-2 text-sm text-gray-600">
                    Already have an account? 
                    <a routerLink="/sign-in" class="font-medium text-blue-600 hover:text-blue-500">Sign in here</a>
                </p>
            </div>
            
            <form class="space-y-4 sm:space-y-5" (submit)="onSubmit($event)">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" class="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="John Doe" required>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                    <input type="email" id="email" class="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="you@example.com" required>
                </div>
                
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" class="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="••••••••" required>
                </div>
                
                <button type="submit" class="w-full flex justify-center py-3 sm:py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition mt-4 sm:mt-6">
                    Create Account
                </button>
            </form>
        </div>
    </div>
    `
})
export default class SignUp {
    private router = inject(Router);
    readonly store = inject(EcommerceStore); // Inject the store

    onSubmit(event: Event) {
        event.preventDefault();
        
        this.store.login(); // Log them in automatically after signing up
        alert('Account created successfully!');
        this.router.navigate(['/products/all']);
    }
}