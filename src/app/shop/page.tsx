"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductList } from "@/components/shop/ProductList";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type Tab = "brands" | "stores" | "marketplace";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<Tab>("marketplace");

  return (
    <div className="w-full max-w-2xl mx-auto pb-8">
      {/* Top Purple Banner */}
      <div className="bg-gradient-to-b from-[#250d5f] to-[#4c1d95] text-white pt-12 pb-24 relative overflow-hidden h-[340px]">
        <div className="relative z-10 px-6 h-full flex flex-col justify-center pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-transparent text-xs font-semibold tracking-wide mb-6 w-fit">
            <span className="text-sm">✨</span> NO-COST EMIs
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight mb-2">
            Shop today,<br/>
            <span className="italic font-normal">Pay later using</span><br/>
            Mutual funds.
          </h1>
          <p className="text-[13px] text-white/90 max-w-[220px] mt-4 leading-snug font-light">
            No credit score required. No interest.<br/>Backed by your investments.
          </p>
        </div>
        {/* The generated hero collage */}
        <div className="absolute top-0 right-0 w-[65%] h-full z-0 translate-x-[10%] translate-y-[-5%]">
          <Image 
            src="/hero_collage.jpg" 
            alt="Products Collage" 
            fill 
            className="object-contain object-right mix-blend-lighten opacity-95 scale-[1.1]"
            priority
          />
        </div>
      </div>

      {/* Tabs Container (Overlapping banner) */}
      <div className="px-4 -mt-10 relative z-20">
        <div className="bg-[#f8f6fc] rounded-[2rem] p-1.5 flex shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab("brands")}
            className={cn(
              "flex-1 py-3.5 text-[13px] font-bold rounded-[1.5rem] transition-all relative",
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
              "flex-1 py-3.5 text-[13px] font-bold rounded-[1.5rem] transition-all relative",
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
              "flex-1 py-3.5 text-[13px] font-bold rounded-[1.5rem] transition-all relative",
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
            className="w-full bg-white border-none rounded-full py-4 pl-12 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4c1d95]/20 placeholder-gray-400"
            placeholder="Search online stores..."
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 mt-8">
        {activeTab === "brands" && (
          <div className="space-y-4">
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
            <ProductList />
          </div>
        )}
      </div>
    </div>
  );
}
