import { Plus, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/FallBack";
import { Badge } from "../ui/badge";
import { College } from "./CollegeCompareCard";

interface CollegeSlotProps {
  college: College | null;
  slotNumber: number;
  onSelect: () => void;
  onRemove: () => void;
}

export function CollegeSlot({ college, slotNumber, onSelect, onRemove }: CollegeSlotProps) {
  if (!college) {
    return (
      <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white hover:border-[#14B8A6] hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={onSelect}>
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[280px]">
          {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8F5E8] to-[#E8F5E8]/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Plus className="w-5 h-5 text-[#14B8A6] group-hover:rotate-90 transition-transform duration-300" />
          </div> */}
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#E8F5E8] text-[#173CBA] text-xs font-semibold mb-3">
            SLOT {slotNumber}
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 text-lg">Add University</h3>
          <p className="text-sm text-gray-500 text-center mb-4 max-w-[200px]">
            Click to select a college for comparison
          </p>
          <Button onClick={onSelect} variant="outline" className="border-[#14B8A6] text-[#14B8A6] hover:bg-[#E8F5E8] hover:text-secondary">
          <Plus className="w-5 h-5 text-[#14B8A6] group-hover:rotate-90 transition-transform duration-300 " /> Select University
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-[#14B8A6]/30 bg-white relative hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00C798] to-[#14B8A6]"></div>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 right-3 h-8 w-8 hover:bg-red-50 hover:text-red-600 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <X className="w-4 h-4" />
      </Button>
      
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#173CBA] to-[#186BBF] text-white text-xs font-semibold mb-4">
            SLOT {slotNumber}
          </div>
          
          <div className="w-24 h-24 rounded-xl border-2 border-gray-200 p-2 mb-4 bg-white shadow-sm">
            <ImageWithFallback
              src={college.logo}
              alt={college.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          <h3 className="font-semibold mb-2 min-h-[48px] flex items-center text-lg">{college.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{college.location}</p>
          
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <Badge className="bg-[#E8F5E8] text-[#173CBA] hover:bg-[#14B8A6] hover:text-white">NIRF #{college.nirfRank}</Badge>
            <Badge variant="secondary" className="bg-primary">{college.type}</Badge>
          </div>
          
          {/* <div className="w-full space-y-3 text-sm bg-gray-50 rounded-lg p-4"> */}
            {/* <div className="flex justify-between items-center">
              <span className="text-gray-600">Rating:</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-yellow-600">★ {college.rating}</span>
                <span className="text-gray-400">/5</span>
              </div>
            </div> */}
            {/* <div className="h-px bg-gray-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Fees:</span>
              <span className="font-semibold text-[#173CBA]">{college.fees}</span>
            </div> */}
            {/* <div className="h-px bg-gray-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Package:</span>
              <span className="font-semibold text-[#00C798]">{college.avgPackage}</span>
            </div> */}
          {/* </div> */}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4 border-[#14B8A6] text-[#14B8A6] hover:bg-[#E8F5E8] hover:text-secondary"
            onClick={onSelect}
          >
            Change University
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}