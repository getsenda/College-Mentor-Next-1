import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ComparisonCollege } from "@/services/comparisontable";

export function downloadCollegeComparisonPdf(colleges: ComparisonCollege[]) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  const primaryColor: [number, number, number] = [23, 60, 186]; // #173CBA
  const headerBg: [number, number, number] = [23, 60, 186];
  const headerText: [number, number, number] = [255, 255, 255];
  const altRowBg: [number, number, number] = [245, 247, 255];

  // Title
  doc.setFontSize(20);
  doc.setTextColor(...primaryColor);
  doc.text("College Comparison Report", 14, 18);

  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, 14, 25);

  const collegeNames = colleges.map(
    (c) => c.tabs?.overview?.about?.name ?? "College"
  );

  const colHeaders = ["Parameter", ...collegeNames];

  const safe = (val: any) => (val != null && val !== "" ? String(val) : "NA");

  const getValue = (c: ComparisonCollege, getter: (c: ComparisonCollege) => any) => {
    try {
      return safe(getter(c));
    } catch {
      return "NA";
    }
  };

  // Build rows per section
  const sections: { title: string; rows: string[][] }[] = [
    {
      title: "Overview",
      rows: [
        ["College Type", ...colleges.map((c) => getValue(c, (c) => c.tabs?.overview?.about?.institute_type))],
        ["Location", ...colleges.map((c) => getValue(c, (c) => [c.tabs?.overview?.about?.city, c.tabs?.overview?.about?.state].filter(Boolean).join(", ")))],
        ["Campus Size", ...colleges.map((c) => getValue(c, (c) => c.tabs?.overview?.about?.campus_area ? `${c.tabs.overview.about.campus_area} acres` : null))],
        ["Study Mode", ...colleges.map((c) => getValue(c, (c) => c.tabs?.overview?.about?.institute_type === "Online" ? "Online" : "On-Campus"))],
      ],
    },
    {
      title: "Rankings & Accreditations",
      rows: [
        ["NIRF Rank", ...colleges.map((c) => getValue(c, (c) => c.tabs?.overview?.highlights?.nirf_ranking_2025))],
      ],
    },
    {
      title: "Course Details",
      rows: [
        ["Course Name", ...colleges.map((c) => getValue(c, (c) => c.tabs?.courses_fees?.items?.[0]?.course_name))],
        ["Course Level", ...colleges.map((c) => getValue(c, (c) => c.tabs?.courses_fees?.items?.[0]?.programme_level))],
        ["Duration", ...colleges.map((c) => getValue(c, (c) => c.tabs?.courses_fees?.items?.[0]?.duration))],
        ["Total Fees", ...colleges.map((c) => getValue(c, (c) => c.tabs?.courses_fees?.items?.[0]?.total_fees))],
      ],
    },
    {
      title: "Admission & Eligibility",
      rows: [
        ["Eligibility", ...colleges.map((c) => getValue(c, (c) => c.tabs?.admission?.items?.[0]?.eligibility_criteria))],
        ["Entrance Tests", ...colleges.map((c) => getValue(c, (c) => c.tabs?.admission?.items?.[0]?.entrance_tests))],
      ],
    },
    {
      title: "Scholarships",
      rows: [
        ["Scholarships Available", ...colleges.map((c) => (c.tabs?.scholarships?.items?.length ?? 0) > 0 ? "Yes" : "No")],
        ["Top Scholarship", ...colleges.map((c) => getValue(c, (c) => c.tabs?.scholarships?.items?.[0]?.scholarship_name))],
        ["Amount", ...colleges.map((c) => getValue(c, (c) => c.tabs?.scholarships?.items?.[0]?.amount))],
      ],
    },
    {
      title: "Fees",
      rows: [
        ["Hostel Fees", ...colleges.map((c) => {
          const f = c.tabs?.campus_facilities?.items?.find((i) => i.facility_name?.toLowerCase().includes("hostel") && i.fees_charges?.trim());
          return safe(f?.fees_charges);
        })],
        ["Mess Fees", ...colleges.map((c) => {
          const f = c.tabs?.campus_facilities?.items?.find((i) => i.facility_name?.toLowerCase().includes("mess") && i.fees_charges?.trim());
          return safe(f?.fees_charges);
        })],
      ],
    },
    {
      title: "Placements",
      rows: [
        ["Average Package", ...colleges.map((c) => getValue(c, (c) => c.tabs?.placements?.latest_stats?.average_package))],
        ["Highest Package", ...colleges.map((c) => getValue(c, (c) => c.tabs?.placements?.latest_stats?.highest_package))],
        ["Placement Rate", ...colleges.map((c) => getValue(c, (c) => c.tabs?.placements?.latest_stats?.placement_rate))],
      ],
    },
    {
      title: "Cut-off",
      rows: [
        ["Cut-off Marks", ...colleges.map((c) => getValue(c, (c) => c.tabs?.cutoff?.items?.[0]?.cutoff_marks))],
        ["Opening Rank", ...colleges.map((c) => getValue(c, (c) => c.tabs?.cutoff?.items?.[0]?.opening_rank))],
        ["Closing Rank", ...colleges.map((c) => getValue(c, (c) => c.tabs?.cutoff?.items?.[0]?.closing_rank))],
      ],
    },
    {
      title: "Total Seats",
      rows: [
        ["Total Seats", ...colleges.map((c) => {
          const course = c.tabs?.courses_fees?.items?.find((i) => i.additional_info_json?.seats);
          return safe(course?.additional_info_json?.seats);
        })],
      ],
    },
    {
      title: "Infrastructure & Facilities",
      rows: [
        ["Facilities", ...colleges.map((c) => {
          const items = c.tabs?.campus_facilities?.items;
          if (!items?.length) return "NA";
          return items.map((f) => f.facility_name).filter(Boolean).join(", ");
        })],
      ],
    },
  ];

  // College names header row
  autoTable(doc, {
    startY: 32,
    head: [colHeaders],
    body: [],
    theme: "grid",
    headStyles: { fillColor: headerBg, textColor: headerText, fontSize: 10, fontStyle: "bold", halign: "center" },
    margin: { left: 14, right: 14 },
  });

  // Render tables
  let startY = (doc as any).lastAutoTable.finalY + 4;

  sections.forEach((section) => {
    // Section header
    autoTable(doc, {
      startY,
      head: [[{ content: section.title, colSpan: colHeaders.length, styles: { halign: "left", fontSize: 11, fillColor: headerBg, textColor: headerText, fontStyle: "bold" } }]],
      body: section.rows.map((row) =>
        row.map((cell, i) => ({
          content: cell,
          styles: i === 0 ? { fontStyle: "bold" as const, cellWidth: 40 } : {},
        }))
      ),
      columns: colHeaders.map((h, i) => ({
        header: i === 0 ? "Parameter" : h,
        dataKey: String(i),
      })),
      theme: "grid",
      headStyles: { fillColor: headerBg, textColor: headerText, fontSize: 9 },
      bodyStyles: { fontSize: 8, cellPadding: 3 },
      alternateRowStyles: { fillColor: altRowBg },
      styles: { overflow: "linebreak", cellWidth: "auto" },
      margin: { left: 14, right: 14 },
      showHead: false,
    });

    startY = (doc as any).lastAutoTable.finalY + 4;

    // Add new page if running out of space
    if (startY > 170) {
      doc.addPage();
      startY = 14;
    }
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("College Mentor - College Comparison Report", 14, doc.internal.pageSize.height - 8);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 8);
  }

  // Generate filename
  const names = collegeNames.map((n) => n.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 20)).join("_vs_");
  doc.save(`College_Comparison_${names}.pdf`);
}
