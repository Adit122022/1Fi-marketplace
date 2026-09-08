import Link from "next/link";
import { Home, Store, ReceiptText, BarChart3, User } from "lucide-react";

export function BottomNav() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 px-6 py-4 flex justify-between items-center">
      <Link href="#" className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600">
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wide">Home</span>
      </Link>
      <Link href="/shop" className="relative flex flex-col items-center gap-1.5 text-[#4c1d95]">
        <div className="absolute -top-4 w-6 h-1 bg-[#4c1d95] rounded-b-full" />
        <Store className="w-5 h-5 fill-purple-100/50" />
        <span className="text-[10px] font-bold tracking-wide">Shop</span>
      </Link>
      <Link href="#" className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600">
        <ReceiptText className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wide">EMI Dues</span>
      </Link>
      <Link href="#" className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600">
        <BarChart3 className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wide">Limit</span>
      </Link>
      <Link href="#" className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600">
        <User className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wide">Profile</span>
      </Link>
    </div>
  );
}
