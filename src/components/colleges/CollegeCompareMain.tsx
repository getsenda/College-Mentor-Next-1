"use client";
import { useEffect, useState } from "react";
import { Download, Navigation, RefreshCw } from "lucide-react";
import collegeDefaultIcon from "../../../public/assets/amity.png";
import { College } from "./CollegeCompareCard";
import { toast, Toaster } from "sonner";
import { CollegeSlot } from "./CollegeCompareSlot";
import { HeroSearch } from "./CollegeCompareHero";
import { Button } from "../ui/button";

import { CollegeSelector } from "../CollegeSelector";
import PrimaryNavigation from "../header/PrimaryNavigation";
import { FrequentComparison } from "./FrequentComparison";
import { CompareScholarships } from "./CollegeCompareScholarship";
import { SuccessStories } from "./CollegeCompareSuccessStories";
import { CollegeCompareFAQ } from "./CollegeCompareFAQ";
import { BookMentorSession } from "./BookMentorSession";
import { ComparisonTable } from "./CollegeComparison";
import { ComparisonCollege } from "@/services/comparisontable";
import { collegeService } from "@/services/collegeService";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { compareCollegesStore } from "@/utils/compareCollegesStore";





export default function CollegeCompareMain() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const mapComparisonCollegeToUI = (item: ComparisonCollege): College => ({
    id: String(item.id),

    name: item.tabs?.overview?.about?.name ?? "—",
    location: [
      item.tabs?.overview?.about?.city,
      item.tabs?.overview?.about?.state,
    ].filter(Boolean).join(", "),

    city: item.tabs?.overview?.about?.city ?? "",
    type: item.tabs?.overview?.about?.institute_type ?? "Unknown",

    logo: collegeDefaultIcon.src,
    banner: "",

    nirfRank:
      Number(
        item.tabs?.overview?.highlights?.nirf_ranking_2025
          ?.match(/\d+/)?.[0]
      ) || 0,

    rating: 0,
    reviews: 0,

    fees: "Not Available",
    avgPackage:
      item.tabs?.overview?.highlights?.placement_2025_2026?.average_package ??
      "Not Available",
    highestPackage:
      item.tabs?.overview?.highlights?.placement_2025_2026?.highest_package ??
      "Not Available",
    // ✅ COURSE MAPPING
    courseType:
      item.tabs?.courses_fees?.items?.[0].course_name ?? "-",
    courseName: item.tabs?.courses_fees?.items?.[0].course_name ?? "–",
    courseDuration: item.tabs?.courses_fees?.items?.[0].duration ?? "–",
    totalFees: item.tabs?.courses_fees?.items?.[0].total_fees ?? "–",

    courses: [],
    approvals: [],
  });

  const [selectedColleges, setSelectedColleges] = useState<(College | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [expandScholarships, setExpandScholarships] = useState(false);
  const [loadingComparison, setLoadingComparison] = useState(false);
  const [comparisonColleges, setComparisonColleges] =
    useState<ComparisonCollege[]>([]);
  const [frequentComparisons, setFrequentComparisons] = useState<
    { college1: College; college2: College }[]
  >([]);

  // Auto-add college from URL param (coming from college details page)
  useEffect(() => {
    const addId = searchParams.get("addId");
    if (!addId) return;

    const collegeId = Number(addId);
    if (isNaN(collegeId)) return;

    // Remove param from URL to avoid re-triggering
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("addId");
    router.replace(`${pathname}?${newSearchParams.toString()}`);

    // Check if already in a slot
    const alreadyAdded = selectedColleges.some(c => c && Number(c.id) === collegeId);
    if (alreadyAdded) return;

    // Fetch college data via compare API and add to first empty slot
    const fetchAndAdd = async () => {
      try {
        const res = await collegeService.compareColleges([collegeId]);
        if (res.length > 0) {
          const college = mapComparisonCollegeToUI(res[0]);
          setSelectedColleges(prev => {
            const updated = [...prev];
            const emptySlot = updated.findIndex(c => c === null);
            if (emptySlot !== -1) {
              updated[emptySlot] = college;
            }
            return updated;
          });
          toast.success(`${college.name} added to comparison`);
        }
      } catch (err) {
        console.error("Failed to auto-add college", err);
      }
    };

    fetchAndAdd();
  }, [searchParams]);

  const handleSelectCollege = (slotIndex: number) => {
    setActiveSlot(slotIndex);
  };
  useEffect(() => {
    const fetchFrequentComparisons = async () => {
      try {
        const res = await collegeService.getPopularComparisons();

        /*
          API response:
          [
            { collegeId1, collegeName1, collegeId2, collegeName2 }
          ]
        */

        const mapped = res.map(item => ({
          college1: {
            id: String(item.collegeId1),
            name: item.collegeName1,
            logo: collegeDefaultIcon.src,
          } as College,
          college2: {
            id: String(item.collegeId2),
            name: item.collegeName2,
            logo: collegeDefaultIcon.src,
          } as College,
        }));

        setFrequentComparisons(mapped);
      } catch (err) {
        console.error("Failed to load frequent comparisons", err);
      }
    };

    fetchFrequentComparisons();
  }, []);

  useEffect(() => {
    const ids = selectedColleges
      .filter((c): c is College => c !== null)
      .map(c => Number(c.id));

    // Call API only when 2+ colleges selected
    if (ids.length < 1) {
      setComparisonColleges([]);
      return;
    }

    const fetchComparison = async () => {
      setLoadingComparison(true);
      try {
        const res = await collegeService.compareColleges(ids);

        // 🔑 THIS WAS MISSING
        setComparisonColleges(res);
      } catch (err) {
        console.error("Comparison API failed", err);
        toast.error("Failed to load comparison data");
        setComparisonColleges([]);
      } finally {
        setLoadingComparison(false);
      }
    };

    fetchComparison();
  }, [selectedColleges]);

  const handleCollegeSelect = (college: College) => {
    if (activeSlot !== null) {
      const newSelected = [...selectedColleges];
      newSelected[activeSlot] = college;
      setSelectedColleges(newSelected);
      setActiveSlot(null);
      compareCollegesStore.addId(Number(college.id));
      toast.success(`${college.name} added to comparison`);
    }
  };

  const handleRemoveCollege = (slotIndex: number) => {
    const college = selectedColleges[slotIndex];
    const newSelected = [...selectedColleges];
    newSelected[slotIndex] = null;
    setSelectedColleges(newSelected);
    setShowComparison(false);
    if (college) {
      compareCollegesStore.removeId(Number(college.id));
      toast.success(`${college.name} removed from comparison`);
    }
  };

  const handleRemoveFromComparison = (collegeId: number) => {
    const slotIndex = selectedColleges.findIndex(
      c => c && Number(c.id) === collegeId
    );

    if (slotIndex !== -1) {
      handleRemoveCollege(slotIndex);
    }
  };


  const handleReset = () => {
    setSelectedColleges([null, null, null, null]);
    setShowComparison(false);
    compareCollegesStore.clear();
    toast.success("Comparison reset");
  };

  const handleEditSelection = () => {
    setShowComparison(false);
    // Scroll to top and then slightly down to show the slots
    setTimeout(() => {
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }, 100);
  };

  const selectedCount = selectedColleges.filter(c => c !== null).length;
  const validColleges = selectedColleges.filter((c): c is College => c !== null);

  const handleHeroSearchClick = () => {
    // Find the first empty slot
    const firstEmptySlot = selectedColleges.findIndex(c => c === null);
    if (firstEmptySlot !== -1) {
      setActiveSlot(firstEmptySlot);
    } else {
      toast.error("All slots are full. Please remove a college to add another.");
    }
  };

  const handleFrequentCompare = (college1: College, college2: College) => {
    const newSelected = [...selectedColleges];
    newSelected[0] = college1;
    newSelected[1] = college2;
    setSelectedColleges(newSelected);
    setShowComparison(false);
    setExpandScholarships(false);
    toast.success("Colleges added to comparison!");

    // Scroll to top to show the college slots with selected colleges
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScholarshipCompare = (college1: College, college2: College) => {
    const newSelected: (College | null)[] = [null, null, null, null];
    newSelected[0] = college1;
    newSelected[1] = college2;
    setSelectedColleges(newSelected);
    setShowComparison(false);
    setExpandScholarships(true);
    toast.success("Colleges added to comparison!");

    // Scroll to scholarships section after a short delay
    setTimeout(() => {
      const scholarshipsSection = document.getElementById('scholarships-section');
      if (scholarshipsSection) {
        scholarshipsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  // // Frequent comparison pairs
  // const frequentComparisons = [
  //   { college1: mockColleges[0], college2: mockColleges[1] },
  //   { college1: mockColleges[0], college2: mockColleges[2] },
  //   { college1: mockColleges[1], college2: mockColleges[3] },
  //   { college1: mockColleges[2], college2: mockColleges[4] },
  //   { college1: mockColleges[3], college2: mockColleges[5] },
  //   { college1: mockColleges[0], college2: mockColleges[5] },
  //   { college1: mockColleges[1], college2: mockColleges[4] },
  //   { college1: mockColleges[2], college2: mockColleges[3] },
  // ];

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation />
      <Toaster />

      {!showComparison && (
        <HeroSearch onSearchClick={handleHeroSearchClick} />
      )}

      <div className="container mx-auto px-4 py-8">
        {!showComparison ? (
          <>
            {/* College Compare Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight mb-4">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">College Compare</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto"> Choose from our list of top colleges across India</p>
            </div>

            {/* College Selection Slots */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mx-auto max-w-7xl">
              {selectedColleges.map((college, index) => (
                <CollegeSlot
                  key={index}
                  college={college}
                  slotNumber={index + 1}
                  onSelect={() => handleSelectCollege(index)}
                  onRemove={() => handleRemoveCollege(index)}
                />
              ))}
            </div>

            {/* Progress Indicator */}
            {selectedCount > 0 && (
              <div className="mb-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-semibold text-[#173CBA]">{selectedCount}/4 Colleges</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00C798] to-[#14B8A6] transition-all duration-500 ease-out"
                    style={{ width: `${(selectedCount / 4) * 100}%` }}
                  ></div>
                </div>
                {selectedCount >= 2 && selectedCount < 4 && (
                  <p className="text-sm text-[#00C798] mt-2 text-center">
                    ✓ Ready to compare! You can add {4 - selectedCount} more college{4 - selectedCount !== 1 ? 's' : ''} if needed.
                  </p>
                )}
              </div>
            )}

            {/* Reset Button - only show if colleges selected */}
            {selectedCount > 0 && (
              <div className="flex justify-center mb-8">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  size="lg"
                  className="gap-2 px-4 sm:px-6 py-5 sm:py-6 text-base sm:text-lg border-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all"
                >
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                  Reset All
                </Button>
              </div>
            )}

            {selectedCount === 0 && (
              <div className="mt-8 max-w-md mx-auto bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <p className="text-blue-800 font-medium">
                  🎯 Start by selecting colleges to compare their features side by side!
                </p>
              </div>
            )}

            {/* Show Detailed Comparison when at least 1 college is selected */}
            {selectedCount >= 1 && (
              <div className="mt-10">
                <div className="mb-8 px-2">
                  <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 w-full max-w-7xl mx-auto">
                    <h4 className="mb-2 text-base sm:text-lg">📊 Detailed Comparison</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {selectedCount === 1
                        ? "Viewing details for 1 college. Add more colleges to compare!"
                        : `Comparing ${selectedCount} colleges across all parameters`
                      }
                    </p>
                  </div>
                </div>
                <ComparisonTable
                  colleges={comparisonColleges}
                  onRemove={handleRemoveFromComparison}
                  expandScholarships={expandScholarships}
                />

              </div>
            )}
          </>
        ) : (
          <>
            {/* Comparison View */}
            <div className="mb-8 mt-12 px-2 ">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                <div>
                  <h4 className="mb-2 text-base sm:text-lg">📊 Detailed Comparison</h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Comparing {validColleges.length} colleges across all parameters
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  {/* <Button
                    variant="outline"
                    onClick={handleEditSelection}
                    className="gap-2 border-2 text-sm w-full sm:w-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit Selection</span>
                    <span className="sm:hidden">Edit</span>
                  </Button> */}
                  <Button
                    variant="outline"
                    onClick={handleEditSelection}
                    className="gap-2 border-2 text-sm w-full sm:w-auto relative z-50"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit Selection</span>
                    <span className="sm:hidden">Edit</span>
                  </Button>

                  {/* <Button className="gap-2 bg-gradient-to-r from-[#173CBA] to-[#186BBF] hover:from-[#186BBF] hover:to-[#173CBA] text-sm w-full sm:w-auto">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download PDF</span>
                    <span className="sm:hidden">Download</span>
                  </Button> */}
                </div>
              </div>
            </div>

            <ComparisonTable
              colleges={comparisonColleges}
              onRemove={handleRemoveFromComparison}
              expandScholarships={expandScholarships}
            />

            {/* Popular Comparison Section */}
            <div className="mt-10">
              <FrequentComparison
                comparisons={frequentComparisons}
                onCompare={handleFrequentCompare}
              />
            </div>
          </>
        )}
      </div>

      {/* College Selector Modal */}
      <CollegeSelector
        open={activeSlot !== null}
        onOpenChange={(open) => !open && setActiveSlot(null)}
        // colleges={mockColleges}
        selectedColleges={selectedColleges}
        onSelect={handleCollegeSelect}
      />

      {/* Frequent Comparison Section */}
      {!showComparison && (
        <FrequentComparison
          comparisons={frequentComparisons}
          onCompare={handleFrequentCompare}
        />
      )}
      <CompareScholarships comparisons={frequentComparisons} onCompare={handleScholarshipCompare} />
      <SuccessStories />
      <CollegeCompareFAQ />
      <BookMentorSession />

    </div>
  );
}