"use client";

import { useState } from "react";
import { EMIOption } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";

interface EMIPlanSelectorProps {
  options: EMIOption[];
  onSelect?: (option: EMIOption) => void;
}

export function EMIPlanSelector({ options, onSelect }: EMIPlanSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!options || options.length === 0) {
    return <p className="text-muted text-sm">No EMI options available for this product.</p>;
  }

  const handleSelect = (option: EMIOption) => {
    setSelectedId(option.id);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <h3 className="font-semibold text-lg">Select 1Fi Mutual Fund Backed EMI Plan</h3>
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all border-2 ${
                isSelected ? "border-primary bg-primary/5" : "border-transparent hover:border-primary/30"
              }`}
              onClick={() => handleSelect(option)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg">{option.tenureMonths} Months</span>
                    {option.interestRate === 0 && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                        No Cost EMI
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted">
                    {option.interestRate > 0 ? `${option.interestRate}% Interest` : "0% Interest"} • 
                    ₹{option.processingFee} Processing Fee
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-primary">₹{option.monthlyEMI.toLocaleString("en-IN")}/mo</div>
                  <div className="text-xs text-muted">Total: ₹{option.totalAmount.toLocaleString("en-IN")}</div>
                </div>
                <div className="ml-4 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full border-border" />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="pt-4 border-t border-border mt-6">
        <Button 
          className="w-full h-12 text-lg" 
          disabled={!selectedId}
          onClick={() => alert("Proceeding to checkout with selected plan!")}
        >
          {selectedId ? "Proceed with Selected Plan" : "Select a plan to proceed"}
        </Button>
      </div>
    </div>
  );
}
