import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products/all',
        pathMatch: 'full'
    },
    {
        path: 'products/:category',
        loadComponent: () => import('./pages/products-grid/products-grid'),
    },
    {
        path: 'my-wishlist',
        loadComponent: () => import('./pages/my-wishlist/my-wishlist'),
    },
    {
        path: 'my-cart',
        loadComponent: () => import('./pages/my-cart'), 
    },
    {
        path: 'sign-in',
        loadComponent: () => import('./pages/sign-in')
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./pages/sign-up')
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./pages/product-details/product-details')
    },
    {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout')
    },
    
];

