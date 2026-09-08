"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ProductList } from "@/components/shop/ProductList";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

type Tab = "brands" | "stores" | "marketplace";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<Tab>("marketplace");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto pb-8">
      {/* Banner — full image, no overlay needed */}
      <div className="relative w-full overflow-hidden h-[214px]">
        <Image
          src="/hero_collage.png"
          alt="Shop today, Pay later using Mutual funds"
          fill
          className="object-contain object-center"
          priority
        />
      </div>

      {/* Tabs Container (Overlapping banner) */}
      <div className="px-4 -mt-10 relative z-20">
        <div className="bg-[#f8f6fc] rounded-[2rem] p-1.5 flex overflow-x-auto hide-scrollbar shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab("brands")}
            className={cn(
              "flex-1 whitespace-nowrap px-6 py-3.5 text-[13px] font-bold rounded-[1.5rem] transition-all relative",
              activeTab === "brands"
                ? "bg-white text-[#4c1d95] shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            Top Brands
            {activeTab === "brands" && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#4c1d95] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("stores")}
            className={cn(
              "flex-1 whitespace-nowrap px-6 py-3.5 text-[13px] font-bold rounded-[1.5rem] transition-all relative",
              activeTab === "stores"
                ? "bg-white text-[#4c1d95] shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            Nearby Stores
            {activeTab === "stores" && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#4c1d95] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("marketplace")}
            className={cn(
              "flex-1 whitespace-nowrap px-6 py-3.5 text-[13px] font-bold rounded-[1.5rem] transition-all relative",
              activeTab === "marketplace"
                ? "bg-white text-[#4c1d95] shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            1Fi Marketplace
            {activeTab === "marketplace" && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#4c1d95] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-none rounded-full py-2 pl-12 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4c1d95]/20 placeholder-gray-400"
            placeholder="Search products..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 mt-2 ">
        {activeTab === "brands" && (
          <div className="space-y-4 p-3">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Top Brands</h2>

            {/* Mock Top Brands from screenshot */}
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-[10px]">AIR INDIA</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Air India</h3>
                <p className="text-xs text-gray-500">No-cost EMIs upto 18 months</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shrink-0">
                {/* Simple apple icon approximation */}
                <div className="w-5 h-5 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Apple Premium Reseller</h3>
                <p className="text-xs text-gray-500">No-cost EMIs upto 24 months</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "stores" && (
          <div className="py-12 text-center text-gray-500">
            <p>Nearby Stores feature is currently under development.</p>
          </div>
        )}

        {activeTab === "marketplace" && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-lg font-bold text-gray-900 mb-4">1Fi Marketplace</h2>
            <ProductList searchQuery={searchQuery} />
          </div>
        )}
      </div>
    </div>
  );
}
