"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReadMoreTextProps {
  content: string;
  maxLines?: number;
  className?: string;
}

const ReadMoreText = ({ content, maxLines = 5, className = "" }: ReadMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Approximate line count based on content length and average chars per line
  const lines = content.split('\n');
  const shouldTruncate = lines.length > maxLines;

  const displayContent = shouldTruncate && !isExpanded
    ? lines.slice(0, maxLines).join('\n') + "..."
    : content;

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isExpanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {displayContent}
          </p>
        </motion.div>
      </AnimatePresence>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 inline-flex items-center gap-1 text-secondary hover:text-secondary/80 font-medium transition-colors"
        >
          {isExpanded ? (
            <>
              Read Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ReadMoreText;
