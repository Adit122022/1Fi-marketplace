# 1Fi SDE Intern Assignment - Marketplace

This project is a Next.js application built for the 1Fi SDE Intern Assignment. It implements a modern, responsive marketplace UI with a focus on seamless user experience, modular component design, and robust data modeling.

## Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** `clsx`, `tailwind-merge`

## Project Architecture

### 1. Data Layer & Mock API
Instead of hardcoding data directly into components, I created a simulated API layer to fetch product data asynchronously:
- **`src/types/index.ts`**: Defines strict TypeScript interfaces for `Product`, `Variant`, and `EMIOption`.
- **`src/data/products.json`**: Acts as the database, storing complex product schemas including images, dynamic variants, specifications, and 1Fi Mutual Fund-backed EMI options.
- **`src/services/api.ts`**: Simulates a backend service with artificial delays (`setTimeout`) to test loading states (skeletons and spinners) cleanly.

### 2. UI Components
Reusable UI primitives were built using Tailwind CSS to maintain consistency:
- **`Card`**: For product display.
- **`Badge`**: For "New" tags and starting EMI highlights.
- **`Button`**: Primary and secondary CTAs.
- **`Skeleton`**: Animated loading placeholders.

### 3. Pages & Routing
- **`/shop`**: The main marketplace hub featuring the required 3-tab layout (Top Brands, Nearby Stores, 1Fi Marketplace). The active tab is managed via state, and the marketplace tab renders a responsive CSS Grid of products.
- **`/shop/product/[id]`**: The Product Detail Page (PDP). It dynamically calculates the final price based on the selected variant (Color/Storage), displays a high-quality image gallery, and integrates the EMI Plan Selector.

### 4. EMI Plan Selector
A dedicated component (`EMIPlanSelector.tsx`) that lists available EMI plans, handles selection state, and updates the checkout CTA dynamically based on the chosen plan.

## Setup & Running Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```

3. **View the Application:**
   Open [http://localhost:3000/shop](http://localhost:3000/shop) in your browser.

## Design Decisions & Polish
- **Responsive Design:** Extensively used Tailwind's mobile-first breakpoints to ensure the grid adapts from 1 column on mobile to 4 columns on desktop.
- **Loading States:** Implemented skeleton loaders during the artificial API delay to prevent layout shift and improve perceived performance.
- **Interactive Elements:** Added hover effects (`hover:shadow-md`, `hover:scale-105`), subtle animations (`animate-in fade-in`), and empty state handling.

## Next Steps for Production
- Integrate a real backend (e.g., Node.js/PostgreSQL) instead of `products.json`.
- Implement global state management (Zustand/Redux) if cart functionality becomes complex.
- Add comprehensive unit testing (Jest/React Testing Library).
