"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/services/api";
import { Product } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

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
