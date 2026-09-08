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
          <Card key={n} className="overflow-hidden">
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
            <Card className="h-full overflow-hidden transition-all hover:shadow-md flex flex-col rounded-[1.25rem] border-none shadow-sm bg-white">
              <div className="relative h-40 w-full bg-[#f8f6fc] p-4 flex items-center justify-center m-2 rounded-xl mb-0">
                {product.isNew && (
                  <Badge className="absolute top-2 left-2 z-10 bg-white text-[#4c1d95] shadow-sm font-bold text-[10px] uppercase border-none" variant="secondary">
                    New
                  </Badge>
                )}
                <div className="relative w-[85%] h-[85%]">
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
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">{product.brand}</p>
                <CardTitle className="text-[15px] leading-snug line-clamp-2 text-gray-900">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex flex-col gap-1.5">
                <div className="font-extrabold text-lg text-gray-900 tracking-tight">
                  ₹{product.basePrice.toLocaleString("en-IN")}
                </div>
                {startingEMI && (
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded-md w-fit">
                    <span className="text-[10px] font-bold">STARTING EMI</span>
                    <span className="text-xs font-extrabold">₹{startingEMI.toLocaleString("en-IN")}/mo</span>
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
