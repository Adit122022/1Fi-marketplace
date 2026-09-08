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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {[1, 2, 3, 4].map((n) => (
          <Card key={n} className="overflow-hidden ">
            <Skeleton className="h-48 w-full" />
            <CardHeader className="p-4">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Skeleton className="h-5 w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
      {products.map((product) => {
        const startingEMI = product.emiOptions.length > 0
          ? Math.min(...product.emiOptions.map(opt => opt.monthlyEMI))
          : null;

        return (
          <Link key={product.id} href={`/shop/product/${product.id}`} className="group">
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg flex flex-col rounded-xl border border-gray-200 shadow-sm bg-white">
              <div className="relative h-48 w-full bg-white p-4 flex items-center justify-center border-b border-gray-100">
                {product.isNew && (
                  <Badge className="absolute top-2 left-2 z-10 bg-red-600 text-white shadow-sm font-bold text-[10px] uppercase border-none hover:bg-red-700" variant="secondary">
                    Best Seller
                  </Badge>
                )}
                <div className="relative w-full h-full">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <CardHeader className="p-4 pb-2 flex-grow">
                <CardTitle className="text-base font-medium leading-snug line-clamp-2 text-[#0F1111] group-hover:text-blue-600 transition-colors">
                  {product.name}
                </CardTitle>
                <p className="text-xs text-[#007185] mt-1">{product.brand}</p>
                {/* Mock rating */}
                <div className="flex items-center mt-1 gap-1">
                  <div className="flex text-yellow-400 text-xs">
                    ★★★★<span className="text-gray-300">★</span>
                  </div>
                  <span className="text-xs text-blue-600">(1,234)</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex flex-col gap-1.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-gray-900 font-medium">₹</span>
                  <span className="font-bold text-2xl text-gray-900 tracking-tight">
                    {product.basePrice.toLocaleString("en-IN")}
                  </span>
                </div>
                {startingEMI && (
                  <div className="text-xs text-gray-600 mt-1">
                    EMI starts at <span className="font-semibold text-gray-900">₹{startingEMI.toLocaleString("en-IN")}</span>. No Cost EMI available.
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
