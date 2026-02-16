import React, { JSX } from "react";

/**
 * Utility for rendering WYSIWYG content from Django admin.
 * Handles both HTML content (when edited in admin) and plain text (default generated content).
 *
 * WYSIWYG fields in the system:
 * - CollegeOverview: short_description, overview_description, international_collaboration_description,
 *   academic_industry_collaboration_description, academic_industry_collaboration_details, rankings_intro,
 *   admissions_intro, cutoff_intro, placements_intro, placement_process, summer_internships_intro,
 *   scholarships_intro, research_intro, campus_facilities_intro, online_courses_intro
 * - CollegeAdmission: admission_process, eligibility_criteria
 * - CollegeInternationalExchange: programme_details, eligibility, benefits
 * - CollegeResearch: research_domain, facilities_description, patent_status
 * - CollegeCampusFacility: description, fees_charges
 * - CollegeScholarship: eligibility_criteria, benefits, renewal_conditions, application_process
 * - CollegeCampusLife: campus_life_intro, student_clubs_intro, student_clubs_details, fest_intro,
 *   fest_details, tech_fests_intro, tech_fests_details, counselling_intro, counselling_details
 * - CollegeOnlineCourse: description
 * - CollegeFAQ: answer
 */

interface RenderHTMLProps {
  content: string | undefined | null;
  className?: string;
  fallback?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Checks if a string contains HTML tags
 */
const containsHTML = (str: string): boolean => {
  // Check for common HTML tags
  return /<[a-z][\s\S]*>/i.test(str);
};

/**
 * Renders content that may be HTML or plain text.
 * - If content contains HTML tags, renders using dangerouslySetInnerHTML
 * - If content is plain text, renders as-is with proper line breaks
 * - Returns fallback or null if content is empty
 */
export const RenderHTML: React.FC<RenderHTMLProps> = ({
  content,
  className = "prose prose-sm max-w-none",
  fallback = null,
  as: Component = "div",
}) => {
  if (!content || content.trim() === "") {
    return <>{fallback}</>;
  }

  // If content contains HTML tags, render as HTML
  if (containsHTML(content)) {
    return (
      <Component
        dangerouslySetInnerHTML={{ __html: content }}
        className={className}
      />
    );
  }

  // Plain text - render with preserved line breaks
  return (
    <Component className={className}>
      {content.split('\n').map((line, index, array) => (
        <React.Fragment key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Component>
  );
};

/**
 * Hook-style function for inline rendering (useful in complex JSX)
 * Returns the content with proper HTML handling
 */
export const renderHTMLContent = (
  content: string | undefined | null,
  className: string = "prose prose-sm max-w-none"
): React.ReactNode => {
  if (!content || content.trim() === "") {
    return null;
  }

  if (containsHTML(content)) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      {content.split('\n').map((line, index, array) => (
        <React.Fragment key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * Utility to check if content exists and is not empty
 */
export const hasContent = (content: string | undefined | null): boolean => {
  return Boolean(content && content.trim() !== "");
};

export default RenderHTML;