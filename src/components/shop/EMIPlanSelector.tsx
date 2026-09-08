"use client";

import { useState } from "react";
import { EMIOption } from "@/types";
import { Check, Zap } from "lucide-react";

interface EMIPlanSelectorProps {
  options: EMIOption[];
  onSelect?: (option: EMIOption) => void;
}

export function EMIPlanSelector({ options, onSelect }: EMIPlanSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!options || options.length === 0) {
    return (
      <p className="text-gray-500 text-sm py-4">
        No EMI options available for this product.
      </p>
    );
  }

  const handleSelect = (option: EMIOption) => {
    setSelectedId(option.id);
    if (onSelect) onSelect(option);
  };

  const selectedOption = options.find(o => o.id === selectedId);

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        const isNoCost = option.interestRate === 0;

        return (
          <button
            key={option.id}
            onClick={() => handleSelect(option)}
            className={`w-full text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
              isSelected
                ? "border-[#4c1d95] bg-[#4c1d95]/5 shadow-md shadow-purple-100"
                : "border-gray-200 bg-white hover:border-[#4c1d95]/40"
            }`}
          >
            <div className="px-4 py-4 flex items-center justify-between gap-3">
              {/* Left: Plan details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-extrabold text-[17px] leading-none ${isSelected ? "text-[#4c1d95]" : "text-gray-900"}`}>
                    {option.tenureMonths} Months
                  </span>
                  {isNoCost && (
                    <span className="inline-flex items-center gap-0.5 bg-green-50 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                      <Zap className="w-2.5 h-2.5 fill-green-600" />
                      No Cost
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  {isNoCost ? "0% interest" : `${option.interestRate}% p.a.`}
                  {" · "}
                  ₹{option.processingFee.toLocaleString("en-IN")} processing fee
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Total: ₹{option.totalAmount.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Right: Monthly EMI + Radio */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className={`font-extrabold text-[18px] leading-none ${isSelected ? "text-[#4c1d95]" : "text-gray-900"}`}>
                    ₹{option.monthlyEMI.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium mt-0.5">/month</div>
                </div>

                {/* Radio indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isSelected
                    ? "border-[#4c1d95] bg-[#4c1d95]"
                    : "border-gray-300 bg-white"
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>
            </div>

            {/* Selected plan footer bar */}
            {isSelected && (
              <div className="bg-[#4c1d95] px-4 py-2 flex items-center justify-between">
                <span className="text-white text-[11px] font-bold">
                  ✓ Selected — 1Fi Mutual Fund Backed EMI
                </span>
                <span className="text-white/70 text-[10px]">Backed by your investments</span>
              </div>
            )}
          </button>
        );
      })}

      {/* CTA Button */}
      <div className="pt-2">
        <button
          disabled={!selectedId}
          onClick={() => {
            if (selectedOption) {
              alert(`Proceeding with ${selectedOption.tenureMonths}-month EMI plan at ₹${selectedOption.monthlyEMI.toLocaleString("en-IN")}/mo`);
            }
          }}
          className={`w-full py-4 rounded-2xl font-extrabold text-[14px] uppercase tracking-wider transition-all duration-200 ${
            selectedId
              ? "bg-[#4c1d95] text-white shadow-lg shadow-purple-200 hover:bg-[#3b0d8a] active:scale-95"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {selectedId
            ? `Proceed — ₹${selectedOption?.monthlyEMI.toLocaleString("en-IN")}/mo`
            : "Select a plan to proceed"}
        </button>
      </div>
    </div>
  );
}
