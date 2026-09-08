"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { getProductById } from "@/services/api";
import { Product, Variant } from "@/types";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { EMIPlanSelector } from "@/components/shop/EMIPlanSelector";
import { Badge } from "@/components/ui/Badge";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-24 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link href="/shop">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  // Calculate dynamic price based on variant
  const currentPrice = product.basePrice + (selectedVariant?.priceModifier || 0);

  // Get unique colors and storages for selectors
  const uniqueColors = Array.from(new Set(product.variants.map(v => v.color)));
  const uniqueStorages = Array.from(new Set(product.variants.map(v => v.storage))).filter(s => s !== "N/A");

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-500">
      <Link href="/shop" className="inline-flex items-center text-sm font-medium text-muted hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-secondary/20 rounded-2xl overflow-hidden p-8 border border-border">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-contain mix-blend-multiply p-8"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold tracking-wider text-muted uppercase mb-2">{product.brand}</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-3xl font-bold">₹{currentPrice.toLocaleString("en-IN")}</span>
          </div>

          <p className="text-muted text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Variants Selection */}
          {product.variants.length > 0 && (
            <div className="space-y-6 mb-8 border-t border-b border-border py-6">
              {/* Color Selector */}
              {uniqueColors.length > 0 && uniqueColors[0] !== "N/A" && (
                <div className="space-y-3">
                  <span className="font-semibold text-sm uppercase tracking-wider block">Color</span>
                  <div className="flex flex-wrap gap-3">
                    {uniqueColors.map(color => {
                      const isSelected = selectedVariant?.color === color;
                      return (
                        <button
                          key={color}
                          onClick={() => {
                            const newVariant = product.variants.find(v => v.color === color && v.storage === selectedVariant?.storage) 
                              || product.variants.find(v => v.color === color);
                            if (newVariant) setSelectedVariant(newVariant);
                          }}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                            isSelected 
                              ? "border-primary bg-primary text-primary-foreground" 
                              : "border-border hover:border-muted"
                          }`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Storage Selector */}
              {uniqueStorages.length > 0 && (
                <div className="space-y-3">
                  <span className="font-semibold text-sm uppercase tracking-wider block">Storage</span>
                  <div className="flex flex-wrap gap-3">
                    {uniqueStorages.map(storage => {
                      const isSelected = selectedVariant?.storage === storage;
                      return (
                        <button
                          key={storage}
                          onClick={() => {
                            const newVariant = product.variants.find(v => v.storage === storage && v.color === selectedVariant?.color) 
                              || product.variants.find(v => v.storage === storage);
                            if (newVariant) setSelectedVariant(newVariant);
                          }}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            isSelected 
                              ? "border-primary bg-primary/5 text-primary" 
                              : "border-border hover:border-muted"
                          }`}
                        >
                          {storage}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">Key Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-muted uppercase">{key}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EMI Plans */}
          <div className="mt-auto">
            <EMIPlanSelector options={product.emiOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
