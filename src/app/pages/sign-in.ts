import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { EcommerceStore } from '../ecommerce-store';

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink],
    template: `
    <div class="min-h-[70vh] flex items-center justify-center py-8 sm:py-12 px-4">
        <div class="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div class="text-center mb-6 sm:mb-8">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome back</h2>
                <p class="mt-2 text-sm text-gray-600">
                    Don't have an account? 
                    <a routerLink="/sign-up" class="font-medium text-blue-600 hover:text-blue-500">Sign up here</a>
                </p>
            </div>
            
            <form class="space-y-5 sm:space-y-6" (submit)="onSubmit($event)">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                    <input type="email" id="email" class="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="you@example.com" required>
                </div>
                
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" class="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="••••••••" required>
                </div>
                
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <div class="flex items-center">
                        <input id="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>
                    <div class="text-sm">
                        <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
                    </div>
                </div>
                
                <button type="submit" class="w-full flex justify-center py-3 sm:py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                    Sign in
                </button>
            </form>
        </div>
    </div>
    `
})
export default class SignIn {
    private router = inject(Router);
    readonly store = inject(EcommerceStore); // Inject the store

    onSubmit(event: Event) {
        event.preventDefault();
        
        this.store.login(); // Tell the app we are logged in!
        alert('Successfully signed in!'); 
        this.router.navigate(['/products/all']);
    }
}