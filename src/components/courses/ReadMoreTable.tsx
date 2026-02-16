"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

interface ReadMoreTableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  maxRows?: number;
  className?: string;
}

const ReadMoreTable = ({ columns, data, maxRows = 4, className = "" }: ReadMoreTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = data.length > maxRows;
  const displayData = shouldTruncate && !isExpanded ? data.slice(0, maxRows) : data;

  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="font-semibold text-foreground"
                  style={{ width: column.width }}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {displayData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="border-b border-border last:border-0"
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: row[column.key] || '-' }}
                    />
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 inline-flex items-center gap-1 text-secondary hover:text-secondary/80 font-medium transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show More ({data.length - maxRows} more rows) <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ReadMoreTable;
