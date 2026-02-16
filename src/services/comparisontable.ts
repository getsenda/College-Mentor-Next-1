// models/ComparisonCollege.ts
export interface CutoffItem {
  exam_name: string;
  course_name: string;
  category: string;
  round: string | null;
  opening_rank?: number;
  closing_rank?: number;
  year: number;
  cutoff_marks?: string;
  cutoff_details_json?: Record<string, any>;
}
export interface ComparisonCollege {
  id: number;
  tabs: {
    overview?: {
      about?: {
        name: string;
        institute_type: string;
        city: string;
        state: string;
        campus_area?: number;
      };
      highlights?: {
        nirf_ranking_2025?: string;
        placement_2025_2026?: {
          average_package?: string;
          highest_package?: string;
        };
      };
    };

    placements?: {
      latest_stats?: {
        placement_rate?: string;
        average_package?: string;
        highest_package?: string;
      };
    };
    rankings?: {
      items: {
        ranking_name: string;
        rank: string;
        year: number;
      }[];
    };
    courses_fees?: {
      items: {
        programme_level: string;   // Undergraduate / Postgraduate
        course_name: string;
        duration: string;
        total_fees: string;
        fee_per_semester?: string;
        specializations?: string[];
        hostel_fees?: string;
        additional_info_json?: {
          seats?: string;
          eligibility?: string;
          entrance_exam?: string;
        };
        
      }[];
    };
    admission?: {
      items: {
        entrance_tests: string;
        eligibility_criteria: string;
        important_dates_json?:
        {
          date: String;
        }

      }[];
    },

    scholarships?: {

      items: {

        scholarship_name: string,
        scholarship_type: string,
        amount: string,
        eligibility_criteria: string,
        benefits: string,
        income_limit: string,
        cgpa_requirement: string,
        category: string,
        renewal_conditions: "",
        application_process: string,
        scholarship_details_json: {},

      }[];

    }
    /** ✅ NEW: Campus Facilities */
    campus_facilities?: {
      intro?: string;
      items?: {
        facility_category: string;
        facility_name: string;
        description?: string;
        capacity?: string;
        features?: string;
        fees_charges?: string;
        availability?: string;
        facility_details_json?: Record<string, any>;
      }[];
    };
    cutoff?: {
      intro?: string;
      items: CutoffItem[];
    };

  }

};


