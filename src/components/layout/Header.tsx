import Link from "next/link";
import { ShoppingBag, Search, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <div className="mr-4 flex md:hidden">
          <Menu className="h-6 w-6" />
        </div>
        <Link href="/shop" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight text-primary">1Fi</span>
          <span className="hidden font-bold sm:inline-block">
            Marketplace
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search placeholder */}
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
              <input
                type="search"
                placeholder="Search products..."
                className="h-9 w-full sm:w-[300px] rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 pl-8"
              />
            </div>
          </div>
          <nav className="flex items-center">
            <Link
              href="/shop"
              className="flex items-center justify-center p-2 rounded-md hover:bg-secondary transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
