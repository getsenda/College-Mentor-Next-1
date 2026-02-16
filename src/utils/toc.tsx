import { BookOpen, ChevronRight, LucideIcon } from "lucide-react";

export interface TOCItem {
  id: string;
  title: string;
  icon: LucideIcon;
  condition?: boolean; // If false, item won't be shown
}

interface TableOfContentsProps {
  items: TOCItem[];
  scrollToSection: (id: string) => void;
}

/**
 * Reusable Table of Contents component for all tabs.
 * Items are filtered based on their condition prop (defaults to true).
 */
export default function TableOfContents({ items, scrollToSection }: TableOfContentsProps) {
  // Filter items based on condition (default to true if not specified)
  const visibleItems = items.filter(item => item.condition !== false);

  if (visibleItems.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/10">
      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Table of Contents
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {visibleItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-left px-4 py-2 rounded-md hover:bg-primary/10 transition-all duration-300 text-sm text-muted-foreground hover:text-primary flex items-center gap-2 group hover:scale-[1.02]"
          >
            <item.icon className="w-4 h-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            <span className="flex-1">{item.title}</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button>
        ))}
      </div>
    </div>
  );
}