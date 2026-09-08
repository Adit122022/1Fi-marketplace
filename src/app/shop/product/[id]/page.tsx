"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield, Truck, RotateCcw, Star } from "lucide-react";
import { getProductById } from "@/services/api";
import { Product, Variant } from "@/types";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { EMIPlanSelector } from "@/components/shop/EMIPlanSelector";

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
      <div className="bg-white min-h-screen">
        <div className="h-14 border-b border-gray-100 flex items-center px-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24 mx-auto" />
        </div>
        <Skeleton className="w-full aspect-square" />
        <div className="px-5 pt-6 space-y-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-9 w-1/2" />
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-4 w-20" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
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

  // Computed values
  const currentPrice = product.basePrice + (selectedVariant?.priceModifier || 0);
  const mrpPrice = Math.round(currentPrice * 1.15);
  const discountPercent = Math.round(((mrpPrice - currentPrice) / mrpPrice) * 100);
  const uniqueColors = Array.from(new Set(product.variants.map(v => v.color)));
  const uniqueStorages = Array.from(new Set(product.variants.map(v => v.storage))).filter(s => s !== "N/A");
  const startingEMI = product.emiOptions.length > 0
    ? Math.min(...product.emiOptions.map(o => o.monthlyEMI))
    : null;

  return (
    <div className="bg-white min-h-screen pb-28">

      {/* Sticky Header */}
      <div className="bg-white/90 backdrop-blur-md flex items-center px-4 py-4 sticky top-0 z-50 border-b border-gray-100">
        <Link href="/shop" className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="font-extrabold text-[13px] uppercase tracking-[0.15em] text-gray-900 absolute left-1/2 -translate-x-1/2">
          {product.brand}
        </span>
      </div>

      {/* Image Gallery */}
      <div className="bg-[#F5F5F5] relative">
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <Image
            key={activeImage}
            src={product.images[activeImage]}
            alt={product.name}
            fill
            className="object-contain p-10 mix-blend-multiply"
            priority
          />
          {product.isNew && (
            <div className="absolute top-4 left-4 bg-black text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
              New
            </div>
          )}
          <div className="absolute top-4 right-4 bg-[#4c1d95] text-white text-[10px] font-black px-2.5 py-1 rounded-full">
            {discountPercent}% OFF
          </div>
        </div>

        {product.images.length > 1 ? (
          <div className="flex justify-center gap-3 pb-5 px-4 overflow-x-auto">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative w-12 h-12 rounded-xl border-2 transition-all duration-200 overflow-hidden shrink-0 ${
                  activeImage === idx
                    ? "border-gray-900 shadow-lg scale-110"
                    : "border-transparent bg-white opacity-60 hover:opacity-90"
                }`}
              >
                <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-1.5 pb-5">
            <div className="w-6 h-1 rounded-full bg-gray-900" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-5 pt-5 pb-4 max-w-xl mx-auto">
        <p className="text-[10px] font-black text-[#4c1d95] uppercase tracking-widest mb-1">{product.brand}</p>
        <h1 className="text-[22px] font-bold leading-snug text-gray-900 mb-3">{product.name}</h1>

        {/* Rating row */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center bg-green-600 text-white rounded px-1.5 py-0.5 gap-0.5">
            <span className="text-[11px] font-bold">4.4</span>
            <Star className="w-2.5 h-2.5 fill-white" />
          </div>
          <span className="text-xs text-gray-400 font-medium">1,243 ratings</span>
          <span className="text-gray-200">·</span>
          <span className="text-xs text-green-600 font-semibold">In Stock</span>
        </div>

        {/* Price block */}
        <div className="bg-gray-50 rounded-2xl px-4 py-3 mb-5">
          <div className="flex items-end gap-2 mb-1">
            <span className="text-[32px] font-black text-gray-900 leading-none">
              ₹{currentPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-gray-400 line-through text-base font-medium mb-1">
              ₹{mrpPrice.toLocaleString("en-IN")}
            </span>
          </div>
          {startingEMI && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-black bg-[#4c1d95] text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                1Fi EMI
              </span>
              <span className="text-xs text-gray-600 font-medium">
                from ₹{startingEMI.toLocaleString("en-IN")}/mo · No cost option available
              </span>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { icon: Truck, label: "Free Delivery", sub: "Tomorrow" },
            { icon: Shield, label: "1Fi Assured", sub: "Genuine product" },
            { icon: RotateCcw, label: "Easy Returns", sub: "7 day policy" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center bg-gray-50 rounded-xl py-3 px-2 gap-1">
              <Icon className="w-4 h-4 text-[#4c1d95]" />
              <span className="text-[10px] font-bold text-gray-800 leading-tight">{label}</span>
              <span className="text-[9px] text-gray-400 font-medium">{sub}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2 bg-gray-50" />

      {/* Variants */}
      {product.variants.length > 0 && (
        <div className="px-5 py-5 max-w-xl mx-auto space-y-5">
          {uniqueColors.length > 0 && uniqueColors[0] !== "N/A" && (
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
                Color — <span className="text-gray-900 normal-case font-semibold">{selectedVariant?.color}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
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
                      className={`px-4 py-2 rounded-full border text-[12px] font-semibold transition-all duration-200 ${
                        isSelected
                          ? "border-[#4c1d95] bg-[#4c1d95] text-white shadow-md shadow-purple-200"
                          : "border-gray-200 text-gray-700 hover:border-gray-400 bg-white"
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
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
                Storage — <span className="text-gray-900 normal-case font-semibold">{selectedVariant?.storage}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {uniqueStorages.map(storage => {
                  const isSelected = selectedVariant?.storage === storage;
                  const storageVariant = product.variants.find(v => v.storage === storage);
                  const storagePrice = storageVariant ? product.basePrice + storageVariant.priceModifier : product.basePrice;
                  return (
                    <button
                      key={storage}
                      onClick={() => {
                        const newVariant = product.variants.find(v => v.storage === storage && v.color === selectedVariant?.color)
                          || product.variants.find(v => v.storage === storage);
                        if (newVariant) setSelectedVariant(newVariant);
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-[12px] font-semibold transition-all duration-200 flex flex-col items-start ${
                        isSelected
                          ? "border-[#4c1d95] bg-[#4c1d95]/5 text-[#4c1d95]"
                          : "border-gray-200 text-gray-700 hover:border-gray-400 bg-white"
                      }`}
                    >
                      <span>{storage}</span>
                      <span className={`text-[10px] font-bold ${isSelected ? "text-[#4c1d95]/70" : "text-gray-400"}`}>
                        ₹{storagePrice.toLocaleString("en-IN")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="h-2 bg-gray-50" />

      {/* Specs */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <div className="px-5 py-5 max-w-xl mx-auto">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Specifications</p>
          <div className="divide-y divide-gray-100">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex py-3 gap-4 text-sm">
                <span className="text-gray-400 font-medium w-28 shrink-0">{key}</span>
                <span className="text-gray-900 font-medium flex-1">{value}</span>
              </div>
            ))}
            <div className="flex py-3 gap-4 text-sm">
              <span className="text-gray-400 font-medium w-28 shrink-0">About</span>
              <span className="text-gray-600 flex-1 leading-relaxed">{product.description}</span>
            </div>
          </div>
        </div>
      )}

      <div className="h-2 bg-gray-50" />

      {/* EMI Section */}
      <div className="px-5 py-5 max-w-xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-1 bg-[#4c1d95] rounded-full" />
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">1Fi Payment Options</p>
        </div>
        <EMIPlanSelector options={product.emiOptions} />
      </div>

      {/* Sticky Bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3 z-50"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <button className="flex-1 bg-white text-[#4c1d95] font-extrabold py-3.5 text-[13px] uppercase tracking-wider rounded-2xl border-2 border-[#4c1d95] transition-all duration-200 hover:bg-purple-50 active:scale-95">
          Add to Bag
        </button>
        <button className="flex-1 bg-[#4c1d95] text-white font-extrabold py-3.5 text-[13px] uppercase tracking-wider rounded-2xl shadow-lg shadow-purple-200 transition-all duration-200 hover:bg-[#3b0d8a] active:scale-95">
          Buy Now
        </button>
      </div>
    </div>
  );
}
