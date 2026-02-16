"use client";

import { CourseDetail } from "@/components/data/coursecompare";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface SalaryChartProps {
  courses: CourseDetail[];
}

/* -----------------------------
   Extract numeric average
-------------------------------- */
const getAverageSalary = (salary?: string): number => {
  if (!salary) return 0;

  const matches = salary.match(/(\d+(\.\d+)?)/g);
  if (!matches) return 0;

  const numbers = matches.map(Number);

  // If only one number
  if (numbers.length === 1) return numbers[0];

  // If range → return midpoint
  return (numbers[0] + numbers[1]) / 2;
};

/* -----------------------------
   Pick best available level
-------------------------------- */
const getBestSalary = (
  salaryObj?: Record<string, string>
): number => {
  if (!salaryObj) return 0;

  const priorityOrder = [
    "undergraduate",
    "postgraduate",
    "phd",
    "diploma"
  ];

  for (const level of priorityOrder) {
    if (salaryObj[level]) {
      return getAverageSalary(salaryObj[level]);
    }
  }

  return 0;
};

export function SalaryChart({ courses }: SalaryChartProps) {
  /* -----------------------------
     Prepare chart data
  -------------------------------- */
  const chartData = courses.map((course) => ({
    name: course.tabs.overview.name,
    salary: getBestSalary(
      course.tabs.overview.highlights.average_salary
    )
  }));

  /* Optional debug */
  // console.log(chartData);

  return (
    <div className="w-full h-[400px] md:h-96 bg-white p-4 rounded-xl border border-gray-200">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />

          <XAxis
            dataKey="name"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
          />

          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            label={{
              value: "Salary (LPA)",
              angle: -90,
              position: "insideLeft",
              fill: "#6b7280",
              fontSize: 12
            }}
          />

          <Tooltip
            formatter={(value: number | undefined) =>
              value !== undefined ? `₹ ${value.toFixed(1)} LPA` : "N/A"
            }
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px"
            }}
          />

          <Legend />

          <Bar
            dataKey="salary"
            fill="#0891b2"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
