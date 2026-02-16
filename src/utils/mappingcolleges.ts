import type { SearchCollegeItem } from "@/services/collegeService";
import type { College } from "@/components/colleges/CollegeCompareCard";

export const mapApiCollegeToUI = (item: SearchCollegeItem): College => {
  return {
    id: String(item.id), // UI uses string id

    name: item.collegeName,

    location: `${item.city}, ${item.state}`,
    city: item.city,

    type: item.institutionType, // keep as string

    logo: item.logo ?? "",
    banner: "",

    nirfRank: item.nirfRanking2025
      ? Number(item.nirfRanking2025.match(/\d+/)?.[0])
      : 0,

    rating: item.naacScore ?? 4.0,
    reviews: 0,

    fees: "",
    avgPackage: "",
    highestPackage: "",

    courses: [],
    approvals: item.naacAccreditation ? [item.naacAccreditation] : [],
  };
};
