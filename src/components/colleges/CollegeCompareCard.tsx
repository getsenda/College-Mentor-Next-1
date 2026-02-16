import { MapPin, Star, TrendingUp, Award, CheckCircle, Plus, Check } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/FallBack";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";


// export interface College {
//   id: string;
//   name: string;
//   location: string;
//   city: string;
//   type: "Government" | "Private";
//   logo: string;
//   banner: string;
//   nirfRank: number;
//   rating: number;
//   reviews: number;
//   fees: string;
//   avgPackage: string;
//   highestPackage: string;
//   courses: string[];
//   approvals: string[];
//   featured?: boolean;
// }
// 🔹 UI / DOMAIN MODEL
export interface College {
  id: string;
  name: string;
  location: string;
  city: string;
            // New field for campus area

  type: string;                 // ✅ now flexible

  logo: string;
  banner: string;

  nirfRank: number;
  rating: number;
  reviews: number;

  fees: string;
  avgPackage: string;
  highestPackage: string;

  courses: string[];
  approvals: string[];
  courseType?: string;
  courseName?: string;
  courseDuration?: string;
  totalFees?: string;
  featured?: boolean;
}

interface CollegeCardProps {
  college: College;
  isComparing: boolean;
  onCompareToggle: (college: College) => void;
}

export function CollegeCard({ college, isComparing, onCompareToggle }: CollegeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40">
        <ImageWithFallback
          src={college.banner}
          alt={college.name}
          className="w-full h-full object-cover"
        />
        {college.featured && (
          <Badge className="absolute top-3 left-3 bg-orange-500">Featured</Badge>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="sm"
            variant={isComparing ? "default" : "secondary"}
            className="gap-1"
            onClick={() => onCompareToggle(college)}
          >
            {isComparing ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Compare
              </>
            )}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex gap-3 mb-3">
          <ImageWithFallback
            src={college.logo}
            alt={`${college.name} logo`}
            className="w-16 h-16 object-contain border rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{college.name}</h3>
            <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
              <MapPin className="w-3 h-3" />
              <span>{college.location}</span>
            </div>
            <Badge variant="outline" className="text-xs">{college.type}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-3 pb-3 border-b">
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm">NIRF #{college.nirfRank}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{college.rating}/5</span>
            <span className="text-xs text-gray-500">({college.reviews})</span>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Fees:</span>
            <span className="font-semibold">{college.fees}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Avg. Package:</span>
            <span className="font-semibold text-green-600">{college.avgPackage}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Highest Package:</span>
            <span className="font-semibold text-green-700">{college.highestPackage}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {college.approvals.slice(0, 3).map((approval) => (
            <Badge key={approval} variant="secondary" className="text-xs gap-1">
              <CheckCircle className="w-3 h-3" />
              {approval}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">View Details</Button>
          <Button className="flex-1">Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
