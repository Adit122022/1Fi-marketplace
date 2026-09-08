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

  const mrpPrice = Math.round(currentPrice * 1.15);
  const discountPercent = Math.round(((mrpPrice - currentPrice) / mrpPrice) * 100);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Premium Minimal Header */}
      <div className="bg-white/80 backdrop-blur-md flex items-center px-4 py-4 sticky top-0 z-50 border-b border-gray-100">
        <Link href="/shop" className="mr-4 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-800">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <span className="font-extrabold text-[15px] uppercase tracking-widest mx-auto text-gray-900 absolute left-1/2 -translate-x-1/2">
          {product.brand}
        </span>
      </div>

      {/* Hero Image Gallery */}
      <div className="w-full bg-[#F7F7F7] relative">
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            className="object-contain p-8 mix-blend-multiply drop-shadow-sm"
            priority
          />
        </div>
        {/* Sleek Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex justify-center gap-3 pb-6 overflow-x-auto">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative w-14 h-14 rounded-xl border-2 transition-all overflow-hidden ${
                  activeImage === idx ? "border-gray-900 shadow-md scale-105" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="px-5 py-6 max-w-xl mx-auto">
        <div className="mb-2">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            {product.brand}
          </span>
        </div>
        <h1 className="text-2xl font-bold leading-tight text-gray-900 mb-4">
          {product.name}
        </h1>
        
        {/* Pricing */}
        <div className="flex items-end gap-3 mb-6">
          <span className="text-3xl font-extrabold text-black">
            ₹{currentPrice.toLocaleString("en-IN")}
          </span>
          <span className="text-gray-400 line-through text-lg font-medium mb-0.5">
            ₹{mrpPrice.toLocaleString("en-IN")}
          </span>
          <span className="bg-gray-100 text-gray-800 font-bold px-2 py-1 rounded text-xs mb-1 uppercase tracking-wide">
            {discountPercent}% Off
          </span>
        </div>

        {/* Variants Selection */}
        {product.variants.length > 0 && (
          <div className="py-6 border-t border-b border-gray-100 space-y-6">
            {uniqueColors.length > 0 && uniqueColors[0] !== "N/A" && (
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-3">Color</span>
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
                        className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                          isSelected 
                            ? "border-black bg-black text-white shadow-md" 
                            : "border-gray-200 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {uniqueStorages.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-3">Storage</span>
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
                        className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                          isSelected 
                            ? "border-black bg-black text-white shadow-md" 
                            : "border-gray-200 text-gray-700 hover:border-gray-400"
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

        {/* Highlights / Specs */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="py-6 border-b border-gray-100">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Specifications</h3>
            <div className="space-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4 text-sm">
                  <span className="text-gray-500 font-medium">{key}</span>
                  <span className="text-gray-900 font-medium col-span-2">{value}</span>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                <span className="text-gray-500 font-medium">Description</span>
                <span className="text-gray-900 col-span-2 leading-relaxed">{product.description}</span>
              </div>
            </div>
          </div>
        )}

        {/* EMI Plans Widget */}
        <div className="py-6">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Payment Options</h3>
          <EMIPlanSelector options={product.emiOptions} />
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-4 flex gap-3 z-50">
        <button className="flex-1 bg-white text-black font-extrabold py-3.5 text-sm uppercase tracking-wider rounded-xl border-2 border-black transition-all hover:bg-gray-50">
          Add to Bag
        </button>
        <button className="flex-1 bg-black text-white font-extrabold py-3.5 text-sm uppercase tracking-wider rounded-xl border-2 border-black shadow-lg transition-all hover:bg-gray-900">
          Checkout
        </button>
      </div>
    </div>
  );
}
