import { computed } from "@angular/core";
import { product } from "./models/products";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

export type EcommerceState = {
  products: product[];
  categories: string[];
  cart: product[];
  wishlistItems: product[];
  category: string;
  isLoggedIn: boolean;
};

const initialState: EcommerceState = {
  products: [
    
    {
      id: '1', name: 'Wireless Noise-Cancelling Headphones', price: 299.99, description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.', imageURL: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&w=400&q=80', rating: 4.8, reviewCount: 1243, inStock: true, category: 'Audio'
    },
    {
      id: '2', name: '4K Ultra HD Smart TV 55"', price: 649.99, description: 'Stunning 4K display with HDR, built-in streaming apps, and voice control.', imageURL: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&w=400&q=80', rating: 4.6, reviewCount: 892, inStock: true, category: 'TV'
    },
    {
      id: '3', name: 'Mechanical Gaming Keyboard', price: 129.99, description: 'RGB backlit mechanical keyboard with hot-swappable switches and aluminum frame.', imageURL: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&w=400&q=80', rating: 4.7, reviewCount: 2156, inStock: true, category: 'Gaming'
    },
    {
      id: '4', name: 'Wireless Gaming Mouse', price: 79.99, description: 'Ultra-lightweight wireless mouse with 25K DPI sensor and 70-hour battery.', imageURL: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&w=400&q=80', rating: 4.5, reviewCount: 1678, inStock: true, category: 'Gaming'
    },
    {
      id: '5', name: 'Portable Bluetooth Speaker', price: 89.99, description: 'Waterproof portable speaker with 360-degree sound and 20-hour playtime.', imageURL: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&w=400&q=80', rating: 4.4, reviewCount: 3421, inStock: true, category: 'Audio'
    },
    {
      id: '6', name: 'Smartphone Pro Max', price: 1099.99, description: 'Latest flagship smartphone with a stunning OLED display and triple camera system.', imageURL: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&w=400&q=80', rating: 4.9, reviewCount: 5432, inStock: true, category: 'Mobile'
    },
    {
      id: '7', name: 'Budget Android Phone', price: 299.99, description: 'Reliable everyday smartphone with great battery life and a clean Android experience.', imageURL: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&w=400&q=80', rating: 4.2, reviewCount: 876, inStock: true, category: 'Mobile'
    },
    {
      id: '8', name: 'Gaming Laptop RTX 4070', price: 1599.99, description: 'High-performance gaming laptop with a 144Hz display and top-tier graphics.', imageURL: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&w=400&q=80', rating: 4.7, reviewCount: 312, inStock: true, category: 'Computers'
    },
    {
      id: '9', name: 'Ultra-Thin Ultrabook', price: 999.99, description: 'Lightweight and powerful laptop for professionals on the go.', imageURL: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&w=400&q=80', rating: 4.6, reviewCount: 1432, inStock: false, category: 'Computers'
    },
    {
      id: '10', name: 'Smartwatch Series 8', price: 399.99, description: 'Advanced smartwatch with health tracking, ECG, and always-on display.', imageURL: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&w=400&q=80', rating: 4.8, reviewCount: 4211, inStock: true, category: 'Wearables'
    },
    {
      id: '11', name: 'Fitness Tracker Band', price: 49.99, description: 'Simple and effective fitness tracker with heart rate monitor and sleep tracking.', imageURL: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&w=400&q=80', rating: 4.3, reviewCount: 2100, inStock: true, category: 'Wearables'
    },
    {
      id: '12', name: 'Mirrorless Digital Camera', price: 1299.99, description: 'Professional-grade mirrorless camera with 4K video capabilities and fast autofocus.', imageURL: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80', rating: 4.9, reviewCount: 543, inStock: true, category: 'Photography'
    },
    {
      id: '13', name: 'Action Camera 4K', price: 349.99, description: 'Rugged, waterproof action camera for capturing extreme sports and adventures.', imageURL: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&w=400&q=80', rating: 4.5, reviewCount: 1120, inStock: true, category: 'Photography'
    },
    {
      id: '15', name: 'External Hard Drive 2TB', price: 69.99, description: 'Portable and reliable external storage for backups and media.', imageURL: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&w=400&q=80', rating: 4.6, reviewCount: 4120, inStock: true, category: 'Storage'
    },
    {
      id: '16', name: 'USB-C Hub Multiport Adapter', price: 39.99, description: 'Expand your laptop connectivity with HDMI, USB 3.0, and SD card readers.', imageURL: 'https://images.unsplash.com/photo-1613588718956-c2e80305bf61?auto=format&w=400&q=80', rating: 4.4, reviewCount: 980, inStock: true, category: 'Accessories'
    },
    {
      id: '17', name: 'Ergonomic Desk Chair', price: 199.99, description: 'Comfortable office chair with lumbar support and breathable mesh.', imageURL: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&w=400&q=80', rating: 4.5, reviewCount: 1540, inStock: true, category: 'Accessories'
    },
    {
      id: '18', name: '10-inch Tablet Pro', price: 499.99, description: 'Versatile tablet for productivity and entertainment with stylus support.', imageURL: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&w=400&q=80', rating: 4.7, reviewCount: 2310, inStock: true, category: 'Tablets'
    },
    {
      id: '19', name: 'E-Reader Paperwhite', price: 129.99, description: 'Waterproof e-reader with glare-free display and weeks of battery life.', imageURL: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&w=400&q=80', rating: 4.8, reviewCount: 8760, inStock: true, category: 'Tablets'
    },
    {
      id: '20', name: 'Smart Home Hub & Speaker', price: 99.99, description: 'Control your smart home devices with your voice and enjoy premium audio.', imageURL: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&w=400&q=80', rating: 4.6, reviewCount: 3410, inStock: true, category: 'Smart Home'
    },
    {
      id: '21', name: 'Smart LED Light Bulbs (4-Pack)', price: 45.99, description: 'Color-changing smart bulbs compatible with Alexa and Google Assistant.', imageURL: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&w=400&q=80', rating: 4.5, reviewCount: 2100, inStock: true, category: 'Smart Home'
    },
    {
      id: '22', name: 'Wireless Charging Pad', price: 29.99, description: 'Fast 15W wireless charger for Qi-enabled smartphones and earbuds.', imageURL: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&w=400&q=80', rating: 4.3, reviewCount: 1890, inStock: true, category: 'Accessories'
    },
    {
      id: '23', name: 'Curved Gaming Monitor 27"', price: 279.99, description: '165Hz curved monitor for immersive gaming experiences with low input lag.', imageURL: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&w=400&q=80', rating: 4.7, reviewCount: 940, inStock: true, category: 'Computers'
    },
    {
      id: '24', name: 'Studio Recording Microphone', price: 149.99, description: 'USB condenser microphone perfect for streaming, podcasting, and voiceovers.', imageURL: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&w=400&q=80', rating: 4.6, reviewCount: 650, inStock: true, category: 'Audio'
    },
    {
      id: '25', name: 'OLED TV 65"', price: 1499.99, description: 'Premium OLED TV with infinite contrast, perfect blacks, and vibrant colors.', imageURL: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=80', rating: 4.9, reviewCount: 430, inStock: false, category: 'TV'
    },
    {
      id: '27', name: 'MicroSD Card 256GB', price: 34.99, description: 'High-speed memory card for smartphones, drones, and action cameras.', imageURL: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&w=400&q=80', rating: 4.7, reviewCount: 8900, inStock: true, category: 'Storage'
    },
    {
      id: '28', name: 'Foldable Smartphone', price: 1799.99, description: 'Innovative folding smartphone that expands into a mini-tablet.', imageURL: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&w=400&q=80', rating: 4.4, reviewCount: 320, inStock: true, category: 'Mobile'
    },
    {
      id: '29', name: 'Drone with 4K Camera', price: 799.99, description: 'Easy-to-fly drone with obstacle avoidance and stunning aerial photography.', imageURL: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&w=400&q=80', rating: 4.6, reviewCount: 780, inStock: true, category: 'Photography'
    },
  ],
  categories: [],
  cart: [],
  wishlistItems: [],
  category: 'all',
  isLoggedIn: false,
};

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    filteredproducts: computed(() => {
      const selectedCategory = store.category().trim().toLowerCase();
      if (!selectedCategory || selectedCategory === 'all' || selectedCategory === 'electronics') {
        return store.products();
      }
      return store.products().filter(
        (currentProduct: product) => currentProduct.category.trim().toLowerCase() === selectedCategory
      );
    }),
  })),
  withMethods((store) => ({
    setCategory(category: string) {
      patchState(store, { category });
    },
    addToWishlist(product: product) {
      if (!store.wishlistItems().some(item => item.id === product.id)) {
        patchState(store, (state) => ({
          wishlistItems: [...state.wishlistItems, product]
        }));
      }
    },
    removeFromWishlist(productId: string) {
      patchState(store, (state) => ({
        wishlistItems: state.wishlistItems.filter(item => item.id !== productId)
      }));
    },
    clearWishlist() {
      patchState(store, { wishlistItems: [] });
    },
    addToCart(product: product) {
      patchState(store, (state) => ({
        cart: [...state.cart, product]
      }));
    },
    removeFromCart(indexToRemove: number) {
      patchState(store, (state) => ({
        cart: state.cart.filter((_, index) => index !== indexToRemove)
      }));
    
    },
    login() {
      patchState(store, { isLoggedIn: true });
    },
    logout() {
      patchState(store, { isLoggedIn: false });
    },
    clearCart() {
      patchState(store, { cart: [] });
    }

  }))
);