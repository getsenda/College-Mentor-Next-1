import { Search, X, Plus, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

import { College } from "./colleges/CollegeCompareCard";
import { ImageWithFallback } from "./figma/FallBack";
import { collegeService } from "@/services/collegeService";
import collegeDefaultIcon from "../../public/assets/amity.png";
import { mapApiCollegeToUI } from "@/utils/mappingcolleges";
import Image from "next/image";

interface CollegeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedColleges: (College | null)[];
  onSelect: (college: College) => void;
}

export function CollegeSelector({
  open,
  onOpenChange,
  selectedColleges,
  onSelect,
}: CollegeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const PAGE_SIZE = 20;
  const [searchColleges, setSearchColleges] = useState<College[]>([]);
  const [page, setPage] = useState(0);

  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);





  const selectedIds = selectedColleges
    .filter((c): c is College => c !== null)
    .map((c) => c.id);
  const extractNirfRank = (rank?: string): number => {
    if (!rank) return 0;
    const match = rank.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  useEffect(() => {
    if (open) {
      setPage(0);
    }
  }, [open]);


  useEffect(() => {
    console.log("Page changed:", page);
  }, [page]);


  /** 🔥 Fetch colleges */
  useEffect(() => {
    if (!open) return;

    const fetchColleges = async () => {
      setLoading(true);
      try {
        const res = await collegeService.getSearchColleges(page, PAGE_SIZE);

        // ✅ Replace data for each page
        setSearchColleges(res.results.map(mapApiCollegeToUI));
        setTotalCount(res.count);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [open, page]);




  /** 🔍 Client-side filter (kept same as old code) */
  const filteredColleges = searchColleges.filter(
    (college) =>
      !selectedIds.includes(college.id) &&
      (college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );


  const handleSelect = (college: College) => {
    onSelect(college);
    onOpenChange(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] sm:max-h-[80vh] p-0 gap-0 overflow-y-auto border-0 shadow-2xl w-[95vw] sm:w-full rounded-xl">
        {/* Header */}
        <DialogHeader className="px-4 sm:px-8 pt-4 sm:pt-8 pb-0 border-b border-border/50 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-xl font-normal">
                Select College to Compare
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-0.5 sm:mt-1 text-xs sm:text-sm">
                Choose from our list of colleges across India
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Search */}
        <div className="px-4 sm:px-8 pt-3 sm:pt-6 pb-3 sm:pb-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              placeholder="Search by college name or location..."
              className="pl-10 sm:pl-14 h-10 sm:h-12 rounded-2xl text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">
            {filteredColleges.length} colleges available
          </p>
        </div>

        {/* College List */}
        <ScrollArea className="h-[50vh] sm:h-[380px] px-2 sm:px-4 py-2">
          {filteredColleges.length ? (
            <div className="space-y-2">
              {filteredColleges.map((college) => {
                const isSelected = selectedIds.includes(college.id);

                return (
                  <button
                    key={college.id}
                    onClick={() => !isSelected && handleSelect(college)}
                    disabled={isSelected}
                    className="w-full p-2 sm:p-3 rounded-xl border hover:shadow"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 border rounded-lg p-1.5 sm:p-2 bg-muted/30 flex items-center justify-center flex-shrink-0">
                        {college.logo ? (
                          <ImageWithFallback
                            src={college.logo}
                            alt={college.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Image
                            src={collegeDefaultIcon}
                            alt={college.name}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-0.5 sm:mb-1 text-left line-clamp-1">
                          {college.name}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground text-left truncate">
                          {college.location}
                        </p>

                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                          <Badge className="text-[8px] sm:text-[10px] px-1.5 sm:px-2">
                            NIRF {college.nirfRank}
                          </Badge>
                          <Badge variant="secondary" className="text-[8px] sm:text-[10px] px-1.5 sm:px-2">
                            {college.type}
                          </Badge>
                          <span className="text-[10px] sm:text-xs">
                            ★ {college.rating}/5
                          </span>
                        </div>
                      </div>

                      {!isSelected && (
                        <Button size="sm" className="flex-shrink-0 bg-secondary hover:to-primary/80 shadow-md text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 sm:py-1.5 h-auto whitespace-nowrap">
                          <Plus className="w-3 h-3" /> Select
                        </Button>
                      )}
                    </div>
                  </button>
                );
              })}

              <div className="flex justify-center pt-4 pb-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={() => setPage((p) => p + 1)}
                >
                  {loading ? "Loading..." : "Load More"}
                </Button>
              </div>

            </div>
          ) : (
            <p className="text-center text-muted-foreground py-20">
              No colleges found
            </p>
          )}
        </ScrollArea>
        {totalPages > 1 && (
          <div className="flex justify-center gap-1 sm:gap-2 pt-3 sm:pt-6 pb-1 sm:pb-2 px-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 0}
              onClick={() => setPage(p => Math.max(0, p - 1))}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i)
              .slice(Math.max(0, page - 1), page + 2)
              .map(pageNumber => (
                <Button
                  key={pageNumber}
                  size="sm"
                  variant={page === pageNumber ? "default" : "outline"}
                  onClick={() => setPage(pageNumber)}
                  className="text-xs sm:text-sm px-2 sm:px-3"
                >
                  {pageNumber + 1}
                </Button>
              ))}

            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages - 1}
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              Next
            </Button>
          </div>
        )}

        <div className="text-center text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 mb-3 sm:mb-6">
          Page {page + 1} of {totalPages}
        </div>


        {/* Footer */}
        {/* <div className="px-8 py-5 border-t flex justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedIds.length} of 4 selected
          </p>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
