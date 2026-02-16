import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Brain,
  Users,
  BookOpen,
  Calculator,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "IKIGAI Test", icon: Brain, href: "#ikigai", description: "Discover your purpose" },
  { name: "Mentorship", icon: Users, href: "#mentorship", description: "Connect with experts" },
  { name: "ExamSuite", icon: BookOpen, href: "#examsuite", description: "Exam preparation tools" },
  { name: "Predictors/Tools", icon: Calculator, href: "#predictors", description: "College & rank predictors" },
];

// Pixel sizes that match your tailwind classes (sm screens)
// Collapsed: sm:w-14 => 56px. Expanded: sm:w-64 => 256px
const COLLAPSED_WIDTH = 56;
const EXPANDED_WIDTH = 256;

const FloatingSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSecondaryNavVisible, setIsSecondaryNavVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track secondary navigation visibility based on scroll position
  // Secondary nav is hidden when scrollTop > 50, so sidebar should only show when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Secondary nav is visible when scrollTop <= 50, hidden when scrollTop > 50
      // So FloatingSidebar should only be visible when scrollTop > 50 (secondary nav is hidden)
      setIsSecondaryNavVisible(scrollTop <= 50);
    };

    // Check initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When pointer enters/leaves
  const handleMouseEnter = () => {
    if (!isMobile) setIsExpanded(true);
  };
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsExpanded(false);
      setHoveredItem(null);
    }
  };

  // transform origin for expand animation
  const originClass = "origin-right";

  // Only show sidebar when secondary navigation is hidden (scrolled down)
  if (isSecondaryNavVisible) {
    return null;
  }

  return (
    // hide on mobile like your original: hidden on small screens, visible on sm+
    <div
      className="hidden sm:block fixed right-6 top-1/2 -translate-y-1/2 z-[60]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "bg-white/95 backdrop-blur-lg border border-border/50 rounded-2xl shadow-strong transition-all duration-300 overflow-hidden group",
          originClass,
          isExpanded ? "w-56 sm:w-64" : "w-12 sm:w-14"
        )}
        onClick={() => isMobile && setIsExpanded((s) => !s)}
      >
        {/* Header */}
        <div
          className="p-2 border-b border-border/20"
        >
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "transition-all duration-300",
                isExpanded ? "opacity-100" : "opacity-0 w-0"
              )}
            >
              <h3 className="text-xs font-semibold text-foreground">Quick Access</h3>
            </div>

            <div className="flex items-center justify-start w-8 h-6">
              <Button
                size="lg"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-primary/10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded((s) => !s);
                }}
              >
                {isExpanded ? (
                  <ChevronLeft size={15} className="text-primary" />
                ) : (
                  <ChevronRight size={15} className="text-primary" />
                )}
              </Button>
            </div>

            {/* Mobile X (not used since hidden on mobile) */}
            {isMobile && isExpanded && (
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-primary/10 ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
              >
                <X size={14} className="text-primary" />
              </Button>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="p-3">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="relative">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start p-1.5 mb-0.5 rounded-lg transition-all duration-300 group/item relative overflow-hidden",
                    "h-8",
                    "hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 hover:shadow-soft hover:scale-105 transform-gpu",
                    hoveredItem === item.name && "bg-gradient-to-r from-primary/10 to-secondary/10 shadow-soft scale-105"
                  )}
                  onMouseEnter={() => !isMobile && setHoveredItem(item.name)}
                  onMouseLeave={() => !isMobile && setHoveredItem(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    const el = document.querySelector(item.href);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-md transition-all duration-300",
                      hoveredItem === item.name ? "bg-gradient-primary text-white shadow-medium" : "bg-muted/50 text-primary group-hover/item:bg-primary group-hover/item:text-white"
                    )}
                  >
                    <Icon size={12} />
                  </div>

                  <div
                    className={cn(
                      "ml-1.5 flex-1 transition-all duration-300",
                      isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}
                  >
                    <div className="text-xs font-medium text-foreground group-hover/item:text-white">{item.name}</div>
                  </div>

                  {/* Hover indicator & ripple */}
                  <div className={cn(
                    "absolute right-1 w-1 h-5 bg-gradient-primary rounded-full transition-all duration-300",
                    hoveredItem === item.name ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  )} />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl transition-all duration-300",
                    hoveredItem === item.name ? "scale-100 opacity-100" : "scale-90 opacity-0"
                  )} />
                </Button>

                {/* Tooltip when collapsed */}
                {!isExpanded && hoveredItem === item.name && (
                  <div className={cn(
                    "absolute top-1/2 -translate-y-1/2 z-50 animate-in duration-200 left-full ml-3"
                  )}>
                    <div className="bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-strong border border-border/50 backdrop-blur-sm">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                      <div className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-popover border-border/50 rotate-45 left-0 -translate-x-1 border-l border-t"
                      )} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {isExpanded && (
          <div className="border-t border-border/20">
            <div className="text-[10px] text-muted-foreground text-center py-1">
              Hover to expand
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FloatingSidebar;
