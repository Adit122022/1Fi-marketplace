"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts, searchProducts } from "@/services/api";
import { Product } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";

interface ProductListProps {
  searchQuery?: string;
}

export function ProductList({ searchQuery = "" }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = searchQuery.trim()
          ? await searchProducts(searchQuery.trim())
          : await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }, searchQuery ? 400 : 0);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 text-sm mb-3">{error}</p>
        <button
          onClick={() => { setError(null); setLoading(true); }}
          className="text-[#4c1d95] font-semibold text-sm underline underline-offset-2"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-full flex flex-col items-center">
            <Skeleton className="w-full aspect-[4/5] rounded-[1.25rem]" />
            <div className="mt-4 flex flex-col items-center text-center w-full px-2 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-2xl mb-2">🔍</p>
        <p className="text-gray-800 font-semibold text-sm">No products found</p>
        {searchQuery && (
          <p className="text-gray-400 text-xs mt-1">Try a different search term</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {products.map((product) => {
        const startingEMI = product.emiOptions.length > 0
          ? Math.min(...product.emiOptions.map(opt => opt.monthlyEMI))
          : null;

        return (
          <Link key={product.id} href={`/shop/product/${product.id}`} className="group block">
            <div className="h-full flex flex-col transition-transform hover:-translate-y-1  shadow-sm border border-gray-100">

              {/* Clean Image Container */}
              <div className="relative w-full aspect-[1/1] bg-[#F7F7F7] pb-4 flex items-center justify-center overflow-hidden">

                {/* Product Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Minimal 'New' Badge */}
                {product.isNew && (
                  <div className="absolute top-3 left-2 bg-black text-white px-2 py-0.5 rounded shadow-sm text-[10px] font-bold uppercase tracking-widest z-10">
                    New
                  </div>
                )}
              </div>

              {/* Product Details (Left Aligned, Modern) */}
              <div className="my-1 flex justify-between items-center w-full px-3 ">
                <div >
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ">
                    {product.brand}
                  </p>
                  <h3 className="text-[14px] font-semibold text-gray-900 line-clamp-1 w-full leading-tight">
                    {product.name}
                  </h3>
                  {startingEMI && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                        EMI
                      </span>
                      <span className="text-[11px] text-gray-600 font-medium">
                        from ₹{startingEMI.toLocaleString("en-IN")}/mo
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex flex-col items-end gap-2 mt-1.5">
                    <span className="text-gray-900 font-bold text-[16px]">
                      ₹{product.basePrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[12px] text-gray-400 line-through font-medium">
                      ₹{Math.round(product.basePrice * 1.15).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </Link>
        );
      })}
    </div>
  );
}
