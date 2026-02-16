"use client";

import { Bookmark, Download, Share2 } from 'lucide-react';
import { SalaryChart } from './SalaryChart';
import { ComparisonSection } from './CompareSectionCourses';
import { CollegesCarousel } from './CollegeCarousel';
import { CourseDetail } from '@/components/data/coursecompare';

interface DetailedComparisonProps {
  courses: CourseDetail[];
  onBookmark: (courseId: string) => void;
  onDownload: () => void;
  bookmarkedCourses: Set<string>;
  isLoggedIn: boolean;
}

export function DetailedComparison({
  courses,
  onBookmark,
  onDownload,
  bookmarkedCourses,
  isLoggedIn
}: DetailedComparisonProps) {
  return (
    <div className="space-y-4 md:space-y-8 pb-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h4 className="text-gray-900 text-base md:text-lg font-semibold">📊 Detailed Comparison</h4>
        {/* <div className="flex items-center gap-3"> */}
        {/* <button
            onClick={onDownload}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm md:text-base"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Comparison</span>
            <span className="sm:hidden">Download</span> */}
        {/* {!isLoggedIn && <span className="text-xs opacity-75 hidden md:inline">(Login Required)</span>} */}
        {/* </button> */}
        {/* </div> */}
      </div>

      {/* Overview */}
      <ComparisonSection title="Overview">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-3 md:px-6 py-2 md:py-4 text-gray-600 text-xs md:text-sm w-24 md:w-48">Details</th>
                {courses.map((course) => (
                  <th key={course.id} className="px-3 md:px-6 py-2 md:py-4 text-left min-w-[120px]">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-gray-900 text-xs md:text-base">{course.tabs.overview.name ?? "NA"}</div>
                        <div className="text-[10px] md:text-sm text-gray-500 hidden md:block">{course.tabs.overview.degree_name ?? "NA"}</div>
                      </div>
                      {/* <button
                        // onClick={() => onBookmark(course.id)}
                        className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                          bookmarkedCourses.has(course.id)
                            ? 'text-yellow-500 bg-yellow-50'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title={isLoggedIn ? 'Bookmark' : 'Login to bookmark'}
                      > */}
                      {/* <Bookmark
                          className="w-3 h-3 md:w-4 md:h-4"
                          fill={bookmarkedCourses.has(course.id) ? 'currentColor' : 'none'}
                        />
                      </button> */}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <ComparisonRow
                label="Degree Types"
                values={courses.map(c =>
                  c.tabs.overview.highlights?.degree_types?.join(", ") || "N/A"
                )}
              />

              {/* <ComparisonRow label="Stream" values={courses.map(c => c.stream)} /> */}
              <ComparisonRow
                label="Duration"
                values={courses.map(c =>
                  c.tabs.overview.highlights?.duration
                    ? Object.entries(c.tabs.overview.highlights.duration)
                      .map(([level, value]) => `${level}: ${value}`)
                      .join(" | ")
                    : "N/A"
                )}
              />

              <ComparisonRow
                label="Degree Programmes"
                values={courses.map(c =>
                  c.tabs.overview.highlights?.degree_programme
                    ? Object.values(c.tabs.overview.highlights.degree_programme).join(" | ")
                    : "N/A"
                )}
              />

            </tbody>
          </table>
        </div>
      </ComparisonSection>

      {/* Eligibility Criteria */}
      <ComparisonSection title="Eligibility Criteria">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <tbody>
              <ComparisonRow label="Minimum Marks" values={courses.map(c => c.tabs.overview.highlights?.eligibility_criteria
                ? Object.values(c.tabs.overview.highlights.eligibility_criteria).join(" | ")
                : "N/A")} />
              {/* <ComparisonRow
                label="Subjects Required"
                values={courses.map(c => c.subjectsRequired.join(', '))}
              /> */}
              <ComparisonRow
                label="Entrance Exams"
                values={courses.map(c => c.tabs.overview.highlights?.entrance_exams
                  ? Object.values(c.tabs.overview.highlights.entrance_exams).join(" | ")
                  : "N/A")}
                highlight
              />
            </tbody>
          </table>
        </div>
      </ComparisonSection>

      {/* Curriculum */}
      <ComparisonSection title="Curriculum">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <tbody>
              <ComparisonRow
                label="Key Subjects"
                values={courses.map(c => "N/A")}
              />
              <ComparisonRow
                label="Specializations"
                values={courses.map(c => "N/A")}
                highlight
              />
              <ComparisonRow
                label="Internship"
                values={courses.map(c => "N/A")}
              />
              <ComparisonRow
                label="Project Work"
                values={courses.map(c => "N/A")}
              />
            </tbody>
          </table>
        </div>
      </ComparisonSection>

      {/* Fees Structure */}
      <ComparisonSection title="Fees Structure">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <tbody>
              <ComparisonRow
                label="Average Annual Fees"
                values={courses.map(c =>
                  c.tabs.overview.highlights?.average_fee
                    ? Object.entries(c.tabs.overview.highlights.average_fee)
                      .map(([level, value]) => `${level}: ${value}`)
                      .join(" | ")
                    : "N/A"
                )}
                highlight
              />


              <ComparisonRow
                label="Average Salary"
                values={courses.map(c =>
                  c.tabs.overview.highlights?.average_salary
                    ? Object.entries(c.tabs.overview.highlights.average_salary)
                      .map(([level, value]) => `${level}: ${value}`)
                      .join(" | ")
                    : "N/A"
                )}

              />


            </tbody>
          </table>
        </div>
      </ComparisonSection>

      {/* Top Colleges */}
      <ComparisonSection title="Top Colleges Offering">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 md:p-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-50 rounded-xl p-3 md:p-4">

              {/* Course Name */}
              <h4 className="text-gray-900 mb-3 text-sm md:text-lg font-medium">
                {course.tabs.overview.name}
              </h4>

              {/* Colleges Carousel */}
              <CollegesCarousel
                colleges={course.tabs.top_colleges.items}
              />

            </div>
          ))}
        </div>
      </ComparisonSection>


      {/* Career Opportunities */}
      <ComparisonSection title="Career Opportunities">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <tbody>
              <ComparisonRow
                label="Key Job Role"
                values={courses.map(c =>
                  c.tabs.overview.highlights.job_profiles?.length
                    ? c.tabs.overview.highlights.job_profiles

                      .join(", ")
                    : "N/A"
                )}
                highlight
              />

              <ComparisonRow
                label="Top Recruiters"
                values={courses.map(c =>
                  c.tabs.overview.highlights.top_recruiters?.length
                    ? c.tabs.overview.highlights.top_recruiters


                      .join(", ")
                    : "N/A"
                )}
                highlight
              />

              {/* <ComparisonRow
                label="Hiring Industries"
                values={courses.map(c => c.hiringIndustries.join(', '))}
              /> */}
            </tbody>
          </table>
        </div>
      </ComparisonSection>

      {/* Average Salary */}
      <ComparisonSection title="Average Salary & Trends">
        <div className="space-y-4 md:space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <tbody>
                <ComparisonRow
                  label="Average Starting Package"
                  values={courses.map(c =>
                    c.tabs.overview.highlights.average_salary
                      ? Object.entries(c.tabs.overview.highlights.average_salary)
                        .map(([level, value]) => `${level}: ${value}`)
                        .join(" | ")
                      : "N/A"
                  )}
                  highlight
                />

              </tbody>
            </table>
          </div>

          <div className="px-3 md:px-6">
            <h4 className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base font-medium">Salary Growth Trend</h4>
            <div className="overflow-x-auto">
              <div className="w-full flex-1">
                <SalaryChart courses={courses} />
              </div>

            </div>
          </div>
        </div>
      </ComparisonSection>

      {/* Future Scope */}
      <ComparisonSection title="Future Scope">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <tbody>
              <ComparisonRow
                label="Higher Study Options"
                values={courses.map(c => 'N/A')}

              />
              <ComparisonRow
                label="Emerging Fields"
                values={courses.map(c => 'N/A')}
              />
            </tbody>
          </table>
        </div>
      </ComparisonSection>

      {/* Student Reviews & Insights */}
      <ComparisonSection title="Student Reviews & Insights">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <tbody>
              <ComparisonRow
                label="Sentiment Score"
                values={courses.map(c => 'N/A')}
                highlight
              />
              <ComparisonRow
                label="Total Reviews"
                values={courses.map(c => 'N/A')}
              />
              <ComparisonRow
                label="Student Highlights"
                values={courses.map(c => 'N/A')}
              />
            </tbody>
          </table>
        </div>
      </ComparisonSection>

      {/* Subject Coverage - Detailed View */}
      <ComparisonSection title="Subject Coverage">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-3 md:px-6 py-2 md:py-4 text-gray-600 text-xs md:text-sm w-24 md:w-48">Course</th>
                {courses.map((course) => (
                  <th key={course.id} className="px-3 md:px-6 py-2 md:py-4 text-left">
                    {/* <div className="text-gray-900 text-xs md:text-base">{course.name}</div> */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-600 align-top text-xs md:text-sm">
                  Core Subjects
                </td>

                {courses.map((course) => (
                  <td
                    key={course.id}
                    className="px-3 md:px-6 py-2 md:py-4 align-top"
                  >
                    {/* Scroll Container */}
                    <div className="max-h-56 overflow-y-auto pr-2">
                      {course.tabs.curriculum.items.map((item, idx) => (
                        <div key={idx} className="mb-3">

                          {/* Programme Type */}
                          <div className="font-semibold text-gray-800 text-xs md:text-sm mb-1">
                            {item.programme_type}
                          </div>

                          {/* Subjects */}
                          <ul className="space-y-1">
                            {item.core_subjects.map((subject, subIdx) => (
                              <li
                                key={subIdx}
                                className="text-gray-900 flex items-start gap-1.5 text-xs md:text-sm"
                              >
                                <span className="text-cyan-600 mt-0.5">•</span>
                                <span>{subject}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>


            </tbody>
          </table>
        </div>
      </ComparisonSection>

      {/* Specializations - Detailed View */}
      <ComparisonSection title="Specializations">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-3 md:px-6 py-2 md:py-4 text-gray-600 text-xs md:text-sm w-24 md:w-48">Options</th>
                {courses.map((course) => (
                  <th key={course.id} className="px-3 md:px-6 py-2 md:py-4 text-left">
                    {/* <div className="text-gray-900 text-xs md:text-base">{course.name}</div> */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-600 align-top text-xs md:text-sm">Specializations</td>
                {courses.map((course) => (
                  <td key={course.id} className="px-3 md:px-6 py-2 md:py-4 align-top">
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <h5 className="text-[10px] md:text-sm text-cyan-600 mb-1.5 md:mb-2 font-medium">Available:</h5>
                        {/* <ul className="space-y-0.5 md:space-y-1">
                          {course.specializations.slice(0, 4).map((spec, idx) => (
                            <li key={idx} className="text-gray-900 flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                              <span className="text-cyan-600">→</span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>  */}
                        <p>N/A</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] md:text-sm text-purple-600 mb-1.5 md:mb-2 font-medium">Emerging:</h5>
                        {/* <ul className="space-y-0.5 md:space-y-1">
                          {course.emergingFields.slice(0, 3).map((field, idx) => (
                            <li key={idx} className="text-gray-900 flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                              <span className="text-purple-600">★</span>
                              <span>{field}</span>
                            </li>
                          ))}
                        </ul> */}
                        <p>N/A</p>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </ComparisonSection>

      {/* Share & Download Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-200">
        <button
          onClick={() => {
            // const courseNames = courses.map(c => c.name).join(' vs ');
            const shareUrl = `${window.location.origin}${window.location.pathname}?compare=${courses.map(c => c.id).join(',')}`;
            navigator.clipboard.writeText(shareUrl);
            // toast.success(`Comparison link copied! (${courseNames})`);
          }}
          className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-white border-2 border-cyan-600 text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors text-sm md:text-base font-medium min-w-[160px] justify-center"
        >
          <Share2 className="w-4 h-4 md:w-5 md:h-5" />
          Share Comparison
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm md:text-base font-medium min-w-[160px] justify-center"
        >
          <Download className="w-4 h-4 md:w-5 md:h-5" />
          Download Comparison
        </button>
      </div>
    </div>
  );
}

function ComparisonRow({
  label,
  values,
  highlight = false
}: {
  label: string;
  values: string[];
  highlight?: boolean;
}) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-3 md:px-6 py-2 md:py-4 text-gray-600 text-xs md:text-sm w-24 md:w-48">{label}</td>
      {values.map((value, idx) => (
        <td
          key={idx}
          className={`px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm ${highlight ? 'text-cyan-600 font-medium' : 'text-gray-900'}`}
        >
          {value}
        </td>
      ))}
    </tr>
  );
}