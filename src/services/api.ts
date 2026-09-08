import productsData from '@/data/products.json';
import { Product } from '@/types';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const products = productsData as unknown as Product[];

export async function getProducts(): Promise<Product[]> {
  await delay(800); // simulate 800ms loading time
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await delay(600);
  return products.find((p) => p.id === id);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay(500);
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery)
  );
}
