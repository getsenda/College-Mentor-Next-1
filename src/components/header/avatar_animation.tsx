import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useScroll } from 'framer-motion';
import centralStudentMain from '../../../public/assets/indian-avatar-3.jpg';
import { FloatingLayer } from '@/components/FloatingLayer';
import Image from 'next/image';

interface AvatarAnimationProps {
  heroSectionRef: React.RefObject<HTMLElement | null>;
}

export const AvatarAnimation: React.FC<AvatarAnimationProps> = ({ heroSectionRef }) => {
  const centralAvatarRef = useRef<HTMLImageElement>(null);
  const [hideCentralAvatar, setHideCentralAvatar] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [shouldPulseGreenAtStudyAbroadMap, setShouldPulseGreenAtStudyAbroadMap] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseComplete, setPauseComplete] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [hideZigZagCycles, setHideZigZagCycles] = useState(false);
  const [isDockedAtQuickAccessTitle, setIsDockedAtQuickAccessTitle] = useState(false);

  // Viewport-relative motion values (no spring physics - eliminates shaking)
  const avatarX = useMotionValue(0);
  const avatarY = useMotionValue(0);
  const avatarScale = useMotionValue(1);

  // Track scroll position reactively
  const { scrollY } = useScroll();

  const [maxAvatarTravelY, setMaxAvatarTravelY] = useState<number | null>(null);
  const [pulseTravelDistance, setPulseTravelDistance] = useState<number | null>(null);
  const avatarStartCenterXRef = useRef<number | null>(null);
  const avatarStartCenterYRef = useRef<number | null>(null);
  const pauseStartTime = useRef<number | null>(null);
  const currentTravelY = useRef(0);
  const additionalTravelY = useRef(0);
  const zigZagStartScrollY = useRef<number | null>(null);
  const initialTopLeftX = useRef<number | null>(null);
  const initialTopLeftY = useRef<number | null>(null);
  const heroCenterXRef = useRef<number | null>(null);
  const heroCenterYRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0); // Track last scroll position to detect user scroll
  const wasNearPulsePointRef = useRef<boolean>(false); // Track if we were previously near the pulse point
  const quickAccessTitleDockScrollY = useRef<number | null>(null); // Track scroll position when avatar docks at quick-access-title
  const quickAccessTitleDockY = useRef<number | null>(null); // Track Y position when docked at quick-access-title
  const quickAccessTitleDockX = useRef<number | null>(null); // Track X position when docked at quick-access-title
  const quickAccessTitleDockScale = useRef<number | null>(null); // Track scale when docked at quick-access-title
  const postDock115StartScrollY = useRef<number | null>(null); // Track scroll position when 40px gap movement starts
  const postFirstDockStartScrollY = useRef<number | null>(null); // Track scroll position when 20px gap movement starts from first blue pulse dock
  const ikigaiCenterMovementStartScrollY = useRef<number | null>(null); // Track scroll position when movement from quick-access-title to ikigai center starts
  const ikigaiCenterMovementStartY = useRef<number | null>(null); // Track actual Y position when movement starts
  const ikigaiCenterMovementStartX = useRef<number | null>(null); // Track actual X position when movement starts
  const [isMovingToIkigaiCenter, setIsMovingToIkigaiCenter] = useState(false);
  const [isDockedAtIkigaiCenter, setIsDockedAtIkigaiCenter] = useState(false); // Track when avatar is docked at ikigai center
  const ikigaiCenterDockScrollY = useRef<number | null>(null); // Track scroll position when avatar docks at ikigai center
  const ikigaiCenterDockY = useRef<number | null>(null); // Track Y position when avatar docks at ikigai center
  const ikigaiCenterDockX = useRef<number | null>(null); // Track X position when avatar docks at ikigai center
  const ikigaiCenterDockScale = useRef<number | null>(null); // Track scale when avatar docks at ikigai center
  const ikigaiDownwardMovementStartScrollY = useRef<number | null>(null); // Track scroll position when downward movement starts (gap <= 40px)
  const ikigaiDownwardMovementStartY = useRef<number | null>(null); // Track actual Y position when downward movement from ikigai starts
  const ikigaiDownwardMovementStartX = useRef<number | null>(null); // Track actual X position when downward movement from ikigai starts
  const [isDockedAfter100px, setIsDockedAfter100px] = useState(false); // Track when avatar is docked after moving 100px down
  const examCircleToIkigaiReverseStartY = useRef<number | null>(null); // Track Y position when reverse movement from exam-circle to ikigai starts
  const examCircleToIkigaiReverseStartX = useRef<number | null>(null); // Track X position when reverse movement from exam-circle to ikigai starts
  const examCircleToIkigaiReverseStartScrollY = useRef<number | null>(null); // Track scroll position when reverse movement from exam-circle starts
  const after100pxDockScrollY = useRef<number | null>(null); // Track scroll position when avatar docks after 100px
  const after100pxDockY = useRef<number | null>(null); // Track Y position when avatar docks after 100px
  const after100pxDockX = useRef<number | null>(null); // Track X position when avatar docks after 100px
  const after100pxDockScale = useRef<number | null>(null); // Track scale when avatar docks after 100px
  const forwardMovementStartX = useRef<number | null>(null); // Store forward movement's start X position for reverse path
  const forwardMovementStartY = useRef<number | null>(null); // Store forward movement's start Y position for reverse path
  const forwardMovementStartScale = useRef<number | null>(null); // Store forward movement's start scale for reverse path
  const previousAvatarY = useRef<number | null>(null); // Track previous Y position to detect rapid changes
  const previousAvatarX = useRef<number | null>(null); // Track previous X position to detect rapid changes
  const flickerDetectionCount = useRef<number>(0); // Count rapid position changes to detect flickering
  const [isDockedAtToolsSmartSolutions, setIsDockedAtToolsSmartSolutions] = useState(false); // Track when avatar is docked at tools-smart-solutions
  const [isMovingToToolsSmartSolutions, setIsMovingToToolsSmartSolutions] = useState(false); // Track when avatar is moving to tools-smart-solutions
  const toolsSmartSolutionsMovementStartScrollY = useRef<number | null>(null); // Track scroll position when movement to tools-smart-solutions starts
  const toolsSmartSolutionsMovementStartY = useRef<number | null>(null); // Track Y position when movement starts
  const toolsSmartSolutionsMovementStartX = useRef<number | null>(null); // Track X position when movement starts
  const toolsSmartSolutionsDockScrollY = useRef<number | null>(null); // Track scroll position when avatar docks at tools-smart-solutions
  const toolsSmartSolutionsDockY = useRef<number | null>(null); // Track Y position when docked
  const toolsSmartSolutionsDockX = useRef<number | null>(null); // Track X position when docked
  const toolsSmartSolutionsDockScale = useRef<number | null>(null); // Track scale when docked
  const toolsSmartSolutionsToExamCircleReverseStartScrollY = useRef<number | null>(null); // Track scroll position when reverse movement from tools-smart-solutions starts
  const toolsSmartSolutionsToExamCircleReverseStartY = useRef<number | null>(null); // Track Y position when reverse movement starts
  const toolsSmartSolutionsToExamCircleReverseStartX = useRef<number | null>(null); // Track X position when reverse movement starts
  const [isDockedAtPartnersSection, setIsDockedAtPartnersSection] = useState(false); // Track when avatar is docked at partners-section
  const [isMovingToPartnersSection, setIsMovingToPartnersSection] = useState(false); // Track when avatar is moving to partners-section
  const partnersSectionMovementStartScrollY = useRef<number | null>(null); // Track scroll position when movement to partners-section starts
  const partnersSectionMovementStartY = useRef<number | null>(null); // Track Y position when movement starts
  const partnersSectionMovementStartX = useRef<number | null>(null); // Track X position when movement starts
  const partnersSectionDockScrollY = useRef<number | null>(null); // Track scroll position when avatar docks at partners-section
  const partnersSectionDockY = useRef<number | null>(null); // Track Y position when docked
  const partnersSectionDockX = useRef<number | null>(null); // Track X position when docked
  const partnersSectionDockScale = useRef<number | null>(null); // Track scale when docked
  const partnersSectionToToolsSmartSolutionsReverseStartScrollY = useRef<number | null>(null); // Track scroll position when reverse movement from partners-section starts
  const partnersSectionToToolsSmartSolutionsReverseStartY = useRef<number | null>(null); // Track Y position when reverse movement starts
  const partnersSectionToToolsSmartSolutionsReverseStartX = useRef<number | null>(null); // Track X position when reverse movement starts
  const [isDockedAtScholarshipsLoans, setIsDockedAtScholarshipsLoans] = useState(false); // Track when avatar is docked at why-choose-our-mentoring-program
  const [isMovingToScholarshipsLoans, setIsMovingToScholarshipsLoans] = useState(false); // Track when avatar is moving to why-choose-our-mentoring-program
  const scholarshipsLoansMovementStartScrollY = useRef<number | null>(null); // Track scroll position when movement to why-choose-our-mentoring-program starts
  const scholarshipsLoansMovementStartY = useRef<number | null>(null); // Track Y position when movement starts
  const scholarshipsLoansMovementStartX = useRef<number | null>(null); // Track X position when movement starts
  const scholarshipsLoansDockScrollY = useRef<number | null>(null); // Track scroll position when avatar docks at why-choose-our-mentoring-program
  const scholarshipsLoansDockY = useRef<number | null>(null); // Track Y position when docked
  const scholarshipsLoansDockX = useRef<number | null>(null); // Track X position when docked
  const scholarshipsLoansDockScale = useRef<number | null>(null); // Track scale when docked
  const scholarshipsLoansToPartnersSectionReverseStartScrollY = useRef<number | null>(null); // Track scroll position when reverse movement from why-choose-our-mentoring-program starts
  const scholarshipsLoansToPartnersSectionReverseStartY = useRef<number | null>(null); // Track Y position when reverse movement starts
  const scholarshipsLoansToPartnersSectionReverseStartX = useRef<number | null>(null); // Track X position when reverse movement starts
  const [isDockedAtGlobalEducation, setIsDockedAtGlobalEducation] = useState(false); // Track when avatar is docked at global-education
  const [isMovingToGlobalEducation, setIsMovingToGlobalEducation] = useState(false); // Track when avatar is moving to global-education
  const globalEducationMovementStartScrollY = useRef<number | null>(null); // Track scroll position when movement to global-education starts
  const globalEducationMovementStartY = useRef<number | null>(null); // Track Y position when movement starts
  const globalEducationMovementStartX = useRef<number | null>(null); // Track X position when movement starts
  const globalEducationDockScrollY = useRef<number | null>(null); // Track scroll position when avatar docks at global-education
  const globalEducationDockY = useRef<number | null>(null); // Track Y position when docked
  const globalEducationDockX = useRef<number | null>(null); // Track X position when docked
  const globalEducationDockScale = useRef<number | null>(null); // Track scale when docked
  const globalEducationToScholarshipsLoansReverseStartScrollY = useRef<number | null>(null); // Track scroll position when reverse movement from global-education starts
  const globalEducationToScholarshipsLoansReverseStartY = useRef<number | null>(null); // Track Y position when reverse movement starts
  const globalEducationToScholarshipsLoansReverseStartX = useRef<number | null>(null); // Track X position when reverse movement starts
  const [isDockedAtStudyAbroadMap, setIsDockedAtStudyAbroadMap] = useState(false); // Track when avatar is docked at study-abroad-map
  const [isMovingToStudyAbroadMap, setIsMovingToStudyAbroadMap] = useState(false); // Track when avatar is moving to study-abroad-map
  const studyAbroadMapMovementStartScrollY = useRef<number | null>(null); // Track scroll position when movement to study-abroad-map starts
  const studyAbroadMapMovementStartY = useRef<number | null>(null); // Track Y position when movement starts
  const studyAbroadMapMovementStartX = useRef<number | null>(null); // Track X position when movement starts
  const studyAbroadMapDockScrollY = useRef<number | null>(null); // Track scroll position when avatar docks at study-abroad-map
  const studyAbroadMapDockY = useRef<number | null>(null); // Track Y position when docked
  const studyAbroadMapDockX = useRef<number | null>(null); // Track X position when docked
  const studyAbroadMapDockScale = useRef<number | null>(null); // Track scale when docked
  const studyAbroadMapToGlobalEducationReverseStartScrollY = useRef<number | null>(null); // Track scroll position when reverse movement from study-abroad-map starts
  const studyAbroadMapToGlobalEducationReverseStartY = useRef<number | null>(null); // Track Y position when reverse movement starts
  const studyAbroadMapToGlobalEducationReverseStartX = useRef<number | null>(null); // Track X position when reverse movement starts
  const [isDockedAtScholarshipPathGreenIcon, setIsDockedAtScholarshipPathGreenIcon] = useState(false); // Track when avatar is docked at scholarship-programs
  const [isMovingToScholarshipPathGreenIcon, setIsMovingToScholarshipPathGreenIcon] = useState(false); // Track when avatar is moving to scholarship-programs
  const scholarshipPathGreenIconMovementStartScrollY = useRef<number | null>(null); // Track scroll position when movement to scholarship-programs starts
  const scholarshipPathGreenIconMovementStartY = useRef<number | null>(null); // Track Y position when movement starts
  const scholarshipPathGreenIconMovementStartX = useRef<number | null>(null); // Track X position when movement starts
  const scholarshipPathGreenIconDockScrollY = useRef<number | null>(null); // Track scroll position when avatar docks at scholarship-programs
  const scholarshipPathGreenIconDockY = useRef<number | null>(null); // Track Y position when docked
  const scholarshipPathGreenIconDockX = useRef<number | null>(null); // Track X position when docked
  const scholarshipPathGreenIconDockScale = useRef<number | null>(null); // Track scale when docked
  const scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY = useRef<number | null>(null); // Track scroll position when reverse movement from scholarship-programs starts
  const scholarshipPathGreenIconToStudyAbroadMapReverseStartY = useRef<number | null>(null); // Track Y position when reverse movement starts
  const scholarshipPathGreenIconToStudyAbroadMapReverseStartX = useRef<number | null>(null); // Track X position when reverse movement starts

  // Measure avatar start center and hero bounds; keep motion confined to hero only
  useEffect(() => {
    const computeMaxTravel = () => {
      const heroEl = heroSectionRef.current;
      const avatarEl = centralAvatarRef.current;
      if (!heroEl || !avatarEl) return;

      const avatarRect = avatarEl.getBoundingClientRect();
      if (avatarStartCenterXRef.current === null || avatarStartCenterYRef.current === null) {
        avatarStartCenterXRef.current = avatarRect.left + avatarRect.width / 2 + window.scrollX;
        avatarStartCenterYRef.current = avatarRect.top + avatarRect.height / 2 + window.scrollY;
      }

      const heroRect = heroEl.getBoundingClientRect();
      const heroTop = heroRect.top + window.scrollY;
      const heroBottom = heroRect.bottom + window.scrollY;
      const heroWidth = heroRect.width;
      const heroHeight = heroRect.height;

      // Calculate hero center in viewport coordinates (for fixed positioning)
      const heroCenterX = heroRect.left + heroRect.width / 2;
      const heroCenterY = heroRect.top + heroRect.height / 2;
      heroCenterXRef.current = heroCenterX;
      heroCenterYRef.current = heroCenterY;

      // Calculate initial top-left position (relative to center where avatar is positioned)
      // Position avatar in top-left area: -40% of width to left, use smaller fixed offset for Y to ensure visibility
      if (initialTopLeftX.current === null || initialTopLeftY.current === null) {
        initialTopLeftX.current = -(heroWidth * 0.7); // Start 40% to the left of center
        // Use a smaller, more conservative offset to ensure avatar is visible from start
        // Limit to max 120px upward to prevent hiding on smaller screens
        // Don't add header offset here - docking position should be at original location
        const maxUpwardOffset = Math.min(heroHeight * 0.12, 120);
        initialTopLeftY.current = -maxUpwardOffset; // Start with limited upward offset (no header padding at docking)
        // Set initial motion values to top-left position (viewport coordinates, rounded)
        avatarX.set(Math.round(heroCenterX + initialTopLeftX.current));
        avatarY.set(Math.round(heroCenterY + initialTopLeftY.current));
      }

      // Pulse point - where avatar stops and pulses (73% of hero height)
      const pulseDist = Math.max(120, Math.min(800, (heroBottom - heroTop) * 0.73));
      setPulseTravelDistance(pulseDist);
      // Max travel - avatar continues beyond pulse point (250% of hero height for much more movement)
      const maxTravel = Math.max(120, Math.min(2000, (heroBottom - heroTop) * 2.5));
      setMaxAvatarTravelY(maxTravel);
    };

    const recompute = () => {
      // Add a small delay to ensure layout is settled
      setTimeout(() => {
        window.requestAnimationFrame(computeMaxTravel);
      }, 100);
    };

    // Initial computation with delay
    setTimeout(() => {
      computeMaxTravel();
    }, 200);

    window.addEventListener('load', recompute, { once: false } as any);
    window.addEventListener('resize', recompute);
    window.addEventListener('orientationchange', recompute as any);
    return () => {
      window.removeEventListener('load', recompute as any);
      window.removeEventListener('resize', recompute);
      window.removeEventListener('orientationchange', recompute as any);
    };
  }, [heroSectionRef, avatarX, avatarY]);

  useEffect(() => {
    // Listen for visibility changes from HowItWorks transitioning avatar
    const onToggle = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      setHideCentralAvatar(Boolean(ce.detail));
    };
    window.addEventListener('transitioning-avatar-active', onToggle as EventListener);
    return () => window.removeEventListener('transitioning-avatar-active', onToggle as EventListener);
  }, []);

  // Avatar stays docked at pulse point until 40px gap between avatar and header
  // No automatic release - only releases when gap >= 40px and user is scrolling down

  // Sync motion manually (smooth, stable) - viewport-relative
  useEffect(() => {
    if (!heroSectionRef.current) return;

    // Easing function similar to easeInOutCubic
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);

    // Get header height to add padding so avatar doesn't hide behind it
    const getHeaderHeight = (): number => {
      const header = document.querySelector('header, nav, [role="navigation"]') as HTMLElement;
      if (header) {
        return header.offsetHeight || 80;
      }
      return 80;
    };

    // Sync motion manually (smooth, stable) - viewport-relative
    const unsubscribe = scrollY.on("change", (scrollYValue) => {
      const heroEl = heroSectionRef.current;
      const avatarEl = centralAvatarRef.current;
      if (!heroEl || !avatarEl) return;

      // Measure hero section (viewport coordinates)
      const heroRect = heroEl.getBoundingClientRect();
      const heroTop = heroRect.top + scrollYValue;
      const heroBottom = heroRect.bottom + scrollYValue;
      const startThreshold = heroTop + 40;
      const endThreshold = heroBottom - 10;
      const pulseDist = pulseTravelDistance ?? 500;
      const maxTravel = maxAvatarTravelY ?? 620;
      const headerHeight = getHeaderHeight();

      // Update hero center position (viewport coordinates)
      const heroCenterX = heroRect.left + heroRect.width / 2;
      const heroCenterY = heroRect.top + heroRect.height / 2;
      heroCenterXRef.current = heroCenterX;
      heroCenterYRef.current = heroCenterY;

      if (scrollYValue <= startThreshold) {
        // Reset to initial top-left position
        const heroWidth = heroRect.width;
        const heroHeight = heroRect.height;
        const topLeftX = -(heroWidth * 0.45); // 45% to the left of center
        // Use a smaller, more conservative offset to ensure avatar is visible from start
        // Don't add header offset here - docking position should be at original location
        const maxUpwardOffset = Math.min(heroHeight * 0.04, 120);
        const topLeftY = -maxUpwardOffset; // Limited upward offset (no header padding at docking)
        initialTopLeftX.current = topLeftX;
        initialTopLeftY.current = topLeftY;
        // Set viewport-relative position (rounded to eliminate jitter)
        avatarX.set(Math.round(heroCenterX + topLeftX));
        avatarY.set(Math.round(heroCenterY + topLeftY));
        avatarScale.set(1); // Reset scale
        currentTravelY.current = 0;
        additionalTravelY.current = 0;
        setShouldPulse(false);
        setIsPaused(false);
        setPauseComplete(false);
        pauseStartTime.current = null;
        zigZagStartScrollY.current = null; // Reset movement start position
        setHideZigZagCycles(false); // Reset cycle visibility
        wasNearPulsePointRef.current = false; // Reset pulse point tracking
        setIsDockedAtQuickAccessTitle(false); // Reset quick-access-title dock state
        quickAccessTitleDockScrollY.current = null; // Reset quick-access-title dock scroll position
        quickAccessTitleDockY.current = null; // Reset quick-access-title dock Y position
        quickAccessTitleDockX.current = null; // Reset quick-access-title dock X position
        quickAccessTitleDockScale.current = null; // Reset quick-access-title dock scale
        postDock115StartScrollY.current = null; // Reset post-dock movement start
        postFirstDockStartScrollY.current = null; // Reset first dock movement start
        ikigaiCenterMovementStartScrollY.current = null; // Reset ikigai center movement start
        ikigaiCenterMovementStartY.current = null; // Reset ikigai center movement start Y position
        ikigaiCenterMovementStartX.current = null; // Reset ikigai center movement start X position
        setIsMovingToIkigaiCenter(false); // Reset ikigai center movement state
        setIsDockedAfter100px(false); // Reset 100px dock state
        after100pxDockScrollY.current = null; // Reset 100px dock scroll position
        after100pxDockY.current = null; // Reset 100px dock Y position
        after100pxDockX.current = null; // Reset 100px dock X position
        after100pxDockScale.current = null; // Reset 100px dock scale
        forwardMovementStartX.current = null; // Reset forward movement start X
        forwardMovementStartY.current = null; // Reset forward movement start Y
        forwardMovementStartScale.current = null; // Reset forward movement start scale
        setIsDockedAtToolsSmartSolutions(false); // Reset tools-smart-solutions dock state
        setIsMovingToToolsSmartSolutions(false); // Reset tools-smart-solutions movement state
        toolsSmartSolutionsMovementStartScrollY.current = null; // Reset tools-smart-solutions movement start scroll
        toolsSmartSolutionsMovementStartY.current = null; // Reset tools-smart-solutions movement start Y
        toolsSmartSolutionsMovementStartX.current = null; // Reset tools-smart-solutions movement start X
        toolsSmartSolutionsDockScrollY.current = null; // Reset tools-smart-solutions dock scroll
        toolsSmartSolutionsDockY.current = null; // Reset tools-smart-solutions dock Y
        toolsSmartSolutionsDockX.current = null; // Reset tools-smart-solutions dock X
        toolsSmartSolutionsDockScale.current = null; // Reset tools-smart-solutions dock scale
        toolsSmartSolutionsToExamCircleReverseStartScrollY.current = null; // Reset reverse movement start scroll
        toolsSmartSolutionsToExamCircleReverseStartY.current = null; // Reset reverse movement start Y
        toolsSmartSolutionsToExamCircleReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtPartnersSection(false); // Reset partners-section dock state
        setIsMovingToPartnersSection(false); // Reset partners-section movement state
        partnersSectionMovementStartScrollY.current = null; // Reset partners-section movement start scroll
        partnersSectionMovementStartY.current = null; // Reset partners-section movement start Y
        partnersSectionMovementStartX.current = null; // Reset partners-section movement start X
        partnersSectionDockScrollY.current = null; // Reset partners-section dock scroll
        partnersSectionDockY.current = null; // Reset partners-section dock Y
        partnersSectionDockX.current = null; // Reset partners-section dock X
        partnersSectionDockScale.current = null; // Reset partners-section dock scale
        partnersSectionToToolsSmartSolutionsReverseStartScrollY.current = null; // Reset reverse movement start scroll
        partnersSectionToToolsSmartSolutionsReverseStartY.current = null; // Reset reverse movement start Y
        partnersSectionToToolsSmartSolutionsReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtScholarshipsLoans(false); // Reset why-choose-our-mentoring-program dock state
        setIsMovingToScholarshipsLoans(false); // Reset why-choose-our-mentoring-program movement state
        scholarshipsLoansMovementStartScrollY.current = null; // Reset why-choose-our-mentoring-program movement start scroll
        scholarshipsLoansMovementStartY.current = null; // Reset why-choose-our-mentoring-program movement start Y
        scholarshipsLoansMovementStartX.current = null; // Reset why-choose-our-mentoring-program movement start X
        scholarshipsLoansDockScrollY.current = null; // Reset why-choose-our-mentoring-program dock scroll
        scholarshipsLoansDockY.current = null; // Reset why-choose-our-mentoring-program dock Y
        scholarshipsLoansDockX.current = null; // Reset why-choose-our-mentoring-program dock X
        scholarshipsLoansDockScale.current = null; // Reset why-choose-our-mentoring-program dock scale
        scholarshipsLoansToPartnersSectionReverseStartScrollY.current = null; // Reset reverse movement start scroll
        scholarshipsLoansToPartnersSectionReverseStartY.current = null; // Reset reverse movement start Y
        scholarshipsLoansToPartnersSectionReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtGlobalEducation(false); // Reset global-education dock state
        setIsMovingToGlobalEducation(false); // Reset global-education movement state
        globalEducationMovementStartScrollY.current = null; // Reset global-education movement start scroll
        globalEducationMovementStartY.current = null; // Reset global-education movement start Y
        globalEducationMovementStartX.current = null; // Reset global-education movement start X
        globalEducationDockScrollY.current = null; // Reset global-education dock scroll
        globalEducationDockY.current = null; // Reset global-education dock Y
        globalEducationDockX.current = null; // Reset global-education dock X
        globalEducationDockScale.current = null; // Reset global-education dock scale
        globalEducationToScholarshipsLoansReverseStartScrollY.current = null; // Reset reverse movement start scroll
        globalEducationToScholarshipsLoansReverseStartY.current = null; // Reset reverse movement start Y
        globalEducationToScholarshipsLoansReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtStudyAbroadMap(false); // Reset study-abroad-map dock state
        setIsMovingToStudyAbroadMap(false); // Reset study-abroad-map movement state
        setShouldPulseGreenAtStudyAbroadMap(false); // Reset green pulse effect
        studyAbroadMapMovementStartScrollY.current = null; // Reset study-abroad-map movement start scroll
        studyAbroadMapMovementStartY.current = null; // Reset study-abroad-map movement start Y
        studyAbroadMapMovementStartX.current = null; // Reset study-abroad-map movement start X
        studyAbroadMapDockScrollY.current = null; // Reset study-abroad-map dock scroll
        studyAbroadMapDockY.current = null; // Reset study-abroad-map dock Y
        studyAbroadMapDockX.current = null; // Reset study-abroad-map dock X
        studyAbroadMapDockScale.current = null; // Reset study-abroad-map dock scale
        studyAbroadMapToGlobalEducationReverseStartScrollY.current = null; // Reset reverse movement start scroll
        studyAbroadMapToGlobalEducationReverseStartY.current = null; // Reset reverse movement start Y
        studyAbroadMapToGlobalEducationReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtScholarshipPathGreenIcon(false); // Reset scholarship-programs dock state
        setIsMovingToScholarshipPathGreenIcon(false); // Reset scholarship-programs movement state
        scholarshipPathGreenIconMovementStartScrollY.current = null; // Reset scholarship-programs movement start scroll
        scholarshipPathGreenIconMovementStartY.current = null; // Reset scholarship-programs movement start Y
        scholarshipPathGreenIconMovementStartX.current = null; // Reset scholarship-programs movement start X
        scholarshipPathGreenIconDockScrollY.current = null; // Reset scholarship-programs dock scroll
        scholarshipPathGreenIconDockY.current = null; // Reset scholarship-programs dock Y
        scholarshipPathGreenIconDockX.current = null; // Reset scholarship-programs dock X
        scholarshipPathGreenIconDockScale.current = null; // Reset scholarship-programs dock scale
        scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current = null; // Reset reverse movement start scroll
        scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current = null; // Reset reverse movement start Y
        scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current = null; // Reset reverse movement start X
        // Ensure hero avatar visible while within hero
        setHideCentralAvatar(false); // Always show avatar when at start
        return;
      }

      const rawProgress = (scrollYValue - startThreshold) / Math.max(1, (endThreshold - startThreshold));
      const eased = easeInOutCubic(Math.min(1, Math.max(0, rawProgress)));

      // Calculate base travel to pulse point (from initial top-left position)
      // Need to account for starting Y offset (initialTopLeftY does NOT include headerHeight - docking stays at original position)
      const initialYOffset = initialTopLeftY.current ?? 0;
      // Adjust pulse distance: we want to travel from initialYOffset to pulseDist
      // So the distance to travel is pulseDist - initialYOffset
      const adjustedPulseDist = pulseDist - initialYOffset; // Adjust pulse distance to account for starting position
      const baseTravel = adjustedPulseDist * eased;
      const totalTravelFromStart = initialYOffset + baseTravel; // Total travel from top-left start (no header offset - docking at original position)

      // Ensure avatar is visible from the start - make sure it's not hidden
      if (scrollYValue <= startThreshold + 100) { // Within first 100px of scroll
        setHideCentralAvatar(false);
      }

      // Check if avatar has reached pulse point
      const reachedPulsePoint = baseTravel >= adjustedPulseDist * 0.98;

      // Reset docking state when avatar moves away from pulse point (allows re-docking)
      // Use a slightly lower threshold (0.95) to create a hysteresis zone and prevent flickering
      // Only reset when we were previously near the pulse point and now we're not (moving away)
      // This prevents resetting when moving toward the pulse point from the start
      const nearPulsePoint = baseTravel >= adjustedPulseDist * 0.95;
      const wasNearPulsePoint = wasNearPulsePointRef.current;

      // Update the ref to track current state for next frame
      wasNearPulsePointRef.current = nearPulsePoint;

      // Only reset if we were previously near the pulse point and now we're not (moving away)
      if (wasNearPulsePoint && !nearPulsePoint && (isDocked || pauseComplete)) {
        // Avatar has moved away from pulse point (either upward or downward), reset docking state to allow re-docking
        setIsDocked(false);
        setIsPaused(false);
        setPauseComplete(false);
        setShouldPulse(false);
        pauseStartTime.current = null;
        zigZagStartScrollY.current = null; // Reset movement start position
        wasNearPulsePointRef.current = false; // Reset pulse point tracking
        setIsDockedAtQuickAccessTitle(false); // Reset quick-access-title dock state
        quickAccessTitleDockScrollY.current = null; // Reset quick-access-title dock scroll position
        quickAccessTitleDockY.current = null; // Reset quick-access-title dock Y position
        quickAccessTitleDockX.current = null; // Reset quick-access-title dock X position
        quickAccessTitleDockScale.current = null; // Reset quick-access-title dock scale
        postDock115StartScrollY.current = null; // Reset post-dock movement start
        postFirstDockStartScrollY.current = null; // Reset first dock movement start
        ikigaiCenterMovementStartScrollY.current = null; // Reset ikigai center movement start
        ikigaiCenterMovementStartY.current = null; // Reset ikigai center movement start Y position
        ikigaiCenterMovementStartX.current = null; // Reset ikigai center movement start X position
        setIsMovingToIkigaiCenter(false); // Reset ikigai center movement state
        setIsDockedAtIkigaiCenter(false); // Reset ikigai center dock state
        ikigaiCenterDockScrollY.current = null; // Reset ikigai center dock scroll position
        ikigaiCenterDockY.current = null; // Reset ikigai center dock Y position
        ikigaiCenterDockX.current = null; // Reset ikigai center dock X position
        ikigaiCenterDockScale.current = null; // Reset ikigai center dock scale
        ikigaiDownwardMovementStartScrollY.current = null; // Reset downward movement start scroll position
        ikigaiDownwardMovementStartY.current = null; // Reset downward movement start Y position
        ikigaiDownwardMovementStartX.current = null; // Reset downward movement start X position
        setIsDockedAfter100px(false); // Reset 100px dock state
        after100pxDockScrollY.current = null; // Reset 100px dock scroll position
        after100pxDockY.current = null; // Reset 100px dock Y position
        after100pxDockX.current = null; // Reset 100px dock X position
        after100pxDockScale.current = null; // Reset 100px dock scale
        forwardMovementStartX.current = null; // Reset forward movement start X
        forwardMovementStartY.current = null; // Reset forward movement start Y
        forwardMovementStartScale.current = null; // Reset forward movement start scale
        examCircleToIkigaiReverseStartScrollY.current = null; // Reset reverse movement start scroll
        examCircleToIkigaiReverseStartY.current = null; // Reset reverse movement start Y
        examCircleToIkigaiReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtToolsSmartSolutions(false); // Reset tools-smart-solutions dock state
        setIsMovingToToolsSmartSolutions(false); // Reset tools-smart-solutions movement state
        toolsSmartSolutionsMovementStartScrollY.current = null; // Reset tools-smart-solutions movement start scroll
        toolsSmartSolutionsMovementStartY.current = null; // Reset tools-smart-solutions movement start Y
        toolsSmartSolutionsMovementStartX.current = null; // Reset tools-smart-solutions movement start X
        toolsSmartSolutionsDockScrollY.current = null; // Reset tools-smart-solutions dock scroll
        toolsSmartSolutionsDockY.current = null; // Reset tools-smart-solutions dock Y
        toolsSmartSolutionsDockX.current = null; // Reset tools-smart-solutions dock X
        toolsSmartSolutionsDockScale.current = null; // Reset tools-smart-solutions dock scale
        toolsSmartSolutionsToExamCircleReverseStartScrollY.current = null; // Reset reverse movement start scroll
        toolsSmartSolutionsToExamCircleReverseStartY.current = null; // Reset reverse movement start Y
        toolsSmartSolutionsToExamCircleReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtPartnersSection(false); // Reset partners-section dock state
        setIsMovingToPartnersSection(false); // Reset partners-section movement state
        partnersSectionMovementStartScrollY.current = null; // Reset partners-section movement start scroll
        partnersSectionMovementStartY.current = null; // Reset partners-section movement start Y
        partnersSectionMovementStartX.current = null; // Reset partners-section movement start X
        partnersSectionDockScrollY.current = null; // Reset partners-section dock scroll
        partnersSectionDockY.current = null; // Reset partners-section dock Y
        partnersSectionDockX.current = null; // Reset partners-section dock X
        partnersSectionDockScale.current = null; // Reset partners-section dock scale
        partnersSectionToToolsSmartSolutionsReverseStartScrollY.current = null; // Reset reverse movement start scroll
        partnersSectionToToolsSmartSolutionsReverseStartY.current = null; // Reset reverse movement start Y
        partnersSectionToToolsSmartSolutionsReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtScholarshipsLoans(false); // Reset why-choose-our-mentoring-program dock state
        setIsMovingToScholarshipsLoans(false); // Reset why-choose-our-mentoring-program movement state
        scholarshipsLoansMovementStartScrollY.current = null; // Reset why-choose-our-mentoring-program movement start scroll
        scholarshipsLoansMovementStartY.current = null; // Reset why-choose-our-mentoring-program movement start Y
        scholarshipsLoansMovementStartX.current = null; // Reset why-choose-our-mentoring-program movement start X
        scholarshipsLoansDockScrollY.current = null; // Reset why-choose-our-mentoring-program dock scroll
        scholarshipsLoansDockY.current = null; // Reset why-choose-our-mentoring-program dock Y
        scholarshipsLoansDockX.current = null; // Reset why-choose-our-mentoring-program dock X
        scholarshipsLoansDockScale.current = null; // Reset why-choose-our-mentoring-program dock scale
        scholarshipsLoansToPartnersSectionReverseStartScrollY.current = null; // Reset reverse movement start scroll
        scholarshipsLoansToPartnersSectionReverseStartY.current = null; // Reset reverse movement start Y
        scholarshipsLoansToPartnersSectionReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtGlobalEducation(false); // Reset global-education dock state
        setIsMovingToGlobalEducation(false); // Reset global-education movement state
        globalEducationMovementStartScrollY.current = null; // Reset global-education movement start scroll
        globalEducationMovementStartY.current = null; // Reset global-education movement start Y
        globalEducationMovementStartX.current = null; // Reset global-education movement start X
        globalEducationDockScrollY.current = null; // Reset global-education dock scroll
        globalEducationDockY.current = null; // Reset global-education dock Y
        globalEducationDockX.current = null; // Reset global-education dock X
        globalEducationDockScale.current = null; // Reset global-education dock scale
        globalEducationToScholarshipsLoansReverseStartScrollY.current = null; // Reset reverse movement start scroll
        globalEducationToScholarshipsLoansReverseStartY.current = null; // Reset reverse movement start Y
        globalEducationToScholarshipsLoansReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtStudyAbroadMap(false); // Reset study-abroad-map dock state
        setIsMovingToStudyAbroadMap(false); // Reset study-abroad-map movement state
        studyAbroadMapMovementStartScrollY.current = null; // Reset study-abroad-map movement start scroll
        studyAbroadMapMovementStartY.current = null; // Reset study-abroad-map movement start Y
        studyAbroadMapMovementStartX.current = null; // Reset study-abroad-map movement start X
        studyAbroadMapDockScrollY.current = null; // Reset study-abroad-map dock scroll
        studyAbroadMapDockY.current = null; // Reset study-abroad-map dock Y
        studyAbroadMapDockX.current = null; // Reset study-abroad-map dock X
        studyAbroadMapDockScale.current = null; // Reset study-abroad-map dock scale
        studyAbroadMapToGlobalEducationReverseStartScrollY.current = null; // Reset reverse movement start scroll
        studyAbroadMapToGlobalEducationReverseStartY.current = null; // Reset reverse movement start Y
        studyAbroadMapToGlobalEducationReverseStartX.current = null; // Reset reverse movement start X
        setIsDockedAtScholarshipPathGreenIcon(false); // Reset scholarship-programs dock state
        setIsMovingToScholarshipPathGreenIcon(false); // Reset scholarship-programs movement state
        scholarshipPathGreenIconMovementStartScrollY.current = null; // Reset scholarship-programs movement start scroll
        scholarshipPathGreenIconMovementStartY.current = null; // Reset scholarship-programs movement start Y
        scholarshipPathGreenIconMovementStartX.current = null; // Reset scholarship-programs movement start X
        scholarshipPathGreenIconDockScrollY.current = null; // Reset scholarship-programs dock scroll
        scholarshipPathGreenIconDockY.current = null; // Reset scholarship-programs dock Y
        scholarshipPathGreenIconDockX.current = null; // Reset scholarship-programs dock X
        scholarshipPathGreenIconDockScale.current = null; // Reset scholarship-programs dock scale
        scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current = null; // Reset reverse movement start scroll
        scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current = null; // Reset reverse movement start Y
        scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current = null; // Reset reverse movement start X
      }

      // Additional check: if scrolling upward from movement phase, ensure we reset properly
      // When scrollY decreases and we're past the pulse point, we should exit movement phase
      if (pauseComplete && reachedPulsePoint && zigZagStartScrollY.current !== null) {
        const movementStartScroll = zigZagStartScrollY.current;
        // If we've scrolled back up past where movement started, reset to allow re-docking
        if (scrollYValue < movementStartScroll) {
          setIsDocked(false);
          setIsPaused(false);
          setPauseComplete(false);
          setShouldPulse(false);
          pauseStartTime.current = null;
          zigZagStartScrollY.current = null;
          wasNearPulsePointRef.current = false; // Reset pulse point tracking
          setIsDockedAtQuickAccessTitle(false); // Reset quick-access-title dock state
          postDock115StartScrollY.current = null; // Reset post-dock movement start
          postFirstDockStartScrollY.current = null; // Reset first dock movement start
          setIsDockedAtIkigaiCenter(false); // Reset ikigai center dock state
          ikigaiCenterDockScrollY.current = null; // Reset ikigai center dock scroll position
          ikigaiCenterDockY.current = null; // Reset ikigai center dock Y position
          ikigaiCenterDockX.current = null; // Reset ikigai center dock X position
          ikigaiCenterDockScale.current = null; // Reset ikigai center dock scale
          setIsDockedAfter100px(false); // Reset 100px dock state
          after100pxDockScrollY.current = null; // Reset 100px dock scroll position
          after100pxDockY.current = null; // Reset 100px dock Y position
          after100pxDockX.current = null; // Reset 100px dock X position
          after100pxDockScale.current = null; // Reset 100px dock scale
          setIsDockedAtToolsSmartSolutions(false); // Reset tools-smart-solutions dock state
          setIsMovingToToolsSmartSolutions(false); // Reset tools-smart-solutions movement state
          toolsSmartSolutionsMovementStartScrollY.current = null; // Reset tools-smart-solutions movement start scroll
          toolsSmartSolutionsMovementStartY.current = null; // Reset tools-smart-solutions movement start Y
          toolsSmartSolutionsMovementStartX.current = null; // Reset tools-smart-solutions movement start X
          toolsSmartSolutionsDockScrollY.current = null; // Reset tools-smart-solutions dock scroll
          toolsSmartSolutionsDockY.current = null; // Reset tools-smart-solutions dock Y
          toolsSmartSolutionsDockX.current = null; // Reset tools-smart-solutions dock X
          toolsSmartSolutionsDockScale.current = null; // Reset tools-smart-solutions dock scale
          toolsSmartSolutionsToExamCircleReverseStartScrollY.current = null; // Reset reverse movement start scroll
          toolsSmartSolutionsToExamCircleReverseStartY.current = null; // Reset reverse movement start Y
          toolsSmartSolutionsToExamCircleReverseStartX.current = null; // Reset reverse movement start X
          setIsDockedAtPartnersSection(false); // Reset partners-section dock state
          setIsMovingToPartnersSection(false); // Reset partners-section movement state
          partnersSectionMovementStartScrollY.current = null; // Reset partners-section movement start scroll
          partnersSectionMovementStartY.current = null; // Reset partners-section movement start Y
          partnersSectionMovementStartX.current = null; // Reset partners-section movement start X
          partnersSectionDockScrollY.current = null; // Reset partners-section dock scroll
          partnersSectionDockY.current = null; // Reset partners-section dock Y
          partnersSectionDockX.current = null; // Reset partners-section dock X
          partnersSectionDockScale.current = null; // Reset partners-section dock scale
          partnersSectionToToolsSmartSolutionsReverseStartScrollY.current = null; // Reset reverse movement start scroll
          partnersSectionToToolsSmartSolutionsReverseStartY.current = null; // Reset reverse movement start Y
          partnersSectionToToolsSmartSolutionsReverseStartX.current = null; // Reset reverse movement start X
        }
      }

      // Reset first dock movement when scrolling back up
      if (postFirstDockStartScrollY.current !== null) {
        const firstDockStartScroll = postFirstDockStartScrollY.current;
        if (scrollYValue < firstDockStartScroll) {
          postFirstDockStartScrollY.current = null; // Reset first dock movement start
        }
      }

      // Reset quick-access-title dock state when scrolling back up from post-dock movement
      if (isDockedAtQuickAccessTitle && postDock115StartScrollY.current !== null) {
        const postDockStartScroll = postDock115StartScrollY.current;
        if (scrollYValue < postDockStartScroll) {
          postDock115StartScrollY.current = null; // Reset post-dock movement start
        }
      }

      // Reset ikigai center movement when scrolling back up
      if (isMovingToIkigaiCenter && ikigaiCenterMovementStartScrollY.current !== null) {
        const ikigaiMovementStartScroll = ikigaiCenterMovementStartScrollY.current;
        if (scrollYValue < ikigaiMovementStartScroll) {
          ikigaiCenterMovementStartScrollY.current = null; // Reset ikigai center movement start
          ikigaiCenterMovementStartY.current = null; // Reset ikigai center movement start Y position
          ikigaiCenterMovementStartX.current = null; // Reset ikigai center movement start X position
          setIsMovingToIkigaiCenter(false); // Reset movement state
        }
      }

      // Reset ikigai center dock when scrolling back up significantly
      // Only reset if we have movement start positions (came from quick-access-title), not if we came from exam-circle
      if (isDockedAtIkigaiCenter && ikigaiCenterDockScrollY.current !== null) {
        const dockScrollY = ikigaiCenterDockScrollY.current;
        // Only reset if we have movement start positions (came from quick-access-title position)
        // If we came from exam-circle, we don't have movement start positions, so don't reset
        // This prevents flickering when scrolling up from ikigai center after coming from exam-circle
        if (ikigaiCenterMovementStartScrollY.current !== null && scrollYValue < dockScrollY - 100) {
          // Only reset if scrolled back up significantly (more than 100px) AND we have movement data
          setIsDockedAtIkigaiCenter(false);
          ikigaiCenterDockScrollY.current = null;
          ikigaiCenterDockY.current = null;
          ikigaiCenterDockX.current = null;
          ikigaiCenterDockScale.current = null;
          setIsDockedAfter100px(false); // Reset 100px dock state
          after100pxDockScrollY.current = null; // Reset 100px dock scroll position
          after100pxDockY.current = null; // Reset 100px dock Y position
          after100pxDockX.current = null; // Reset 100px dock X position
          after100pxDockScale.current = null; // Reset 100px dock scale
          setIsDockedAtToolsSmartSolutions(false); // Reset tools-smart-solutions dock state
          setIsMovingToToolsSmartSolutions(false); // Reset tools-smart-solutions movement state
          toolsSmartSolutionsMovementStartScrollY.current = null; // Reset tools-smart-solutions movement start scroll
          toolsSmartSolutionsMovementStartY.current = null; // Reset tools-smart-solutions movement start Y
          toolsSmartSolutionsMovementStartX.current = null; // Reset tools-smart-solutions movement start X
          toolsSmartSolutionsDockScrollY.current = null; // Reset tools-smart-solutions dock scroll
          toolsSmartSolutionsDockY.current = null; // Reset tools-smart-solutions dock Y
          toolsSmartSolutionsDockX.current = null; // Reset tools-smart-solutions dock X
          toolsSmartSolutionsDockScale.current = null; // Reset tools-smart-solutions dock scale
          toolsSmartSolutionsToExamCircleReverseStartScrollY.current = null; // Reset reverse movement start scroll
          toolsSmartSolutionsToExamCircleReverseStartY.current = null; // Reset reverse movement start Y
          toolsSmartSolutionsToExamCircleReverseStartX.current = null; // Reset reverse movement start X
          setIsDockedAtPartnersSection(false); // Reset partners-section dock state
          setIsMovingToPartnersSection(false); // Reset partners-section movement state
          partnersSectionMovementStartScrollY.current = null; // Reset partners-section movement start scroll
          partnersSectionMovementStartY.current = null; // Reset partners-section movement start Y
          partnersSectionMovementStartX.current = null; // Reset partners-section movement start X
          partnersSectionDockScrollY.current = null; // Reset partners-section dock scroll
          partnersSectionDockY.current = null; // Reset partners-section dock Y
          partnersSectionDockX.current = null; // Reset partners-section dock X
          partnersSectionDockScale.current = null; // Reset partners-section dock scale
          partnersSectionToToolsSmartSolutionsReverseStartScrollY.current = null; // Reset reverse movement start scroll
          partnersSectionToToolsSmartSolutionsReverseStartY.current = null; // Reset reverse movement start Y
          partnersSectionToToolsSmartSolutionsReverseStartX.current = null; // Reset reverse movement start X
        }
      }

      // Handle reverse movement when scrolling up from exam-green-circle back to ikigai center
      // Follow exact same pattern as quick-access-title to ikigai-center-image reverse movement
      if (isDockedAfter100px && after100pxDockScrollY.current !== null && after100pxDockX.current !== null && after100pxDockY.current !== null && after100pxDockScale.current !== null) {
        const dockScrollY = after100pxDockScrollY.current;
        const scrollDelta = scrollYValue - dockScrollY;

        // If scrolling up (negative delta), start reverse diagonal movement
        if (scrollDelta < 0) {
          // Get ikigai center element for target position (same as forward movement's start position)
          const ikigaiCenterEl = document.getElementById('ikigai-center-image');

          if (ikigaiCenterEl) {
            // Check if we have the forward movement start positions stored (same pattern as quick-access-title)
            if (forwardMovementStartX.current !== null && forwardMovementStartY.current !== null && forwardMovementStartScale.current !== null) {
              // Initialize reverse movement start positions on first scroll up
              // Capture the exam-circle dock position at the moment reverse starts (before it gets updated)
              if (examCircleToIkigaiReverseStartScrollY.current === null) {
                examCircleToIkigaiReverseStartScrollY.current = scrollYValue;
                // Use the stored dock position (captured at moment reverse starts)
                examCircleToIkigaiReverseStartX.current = after100pxDockX.current;
                examCircleToIkigaiReverseStartY.current = after100pxDockY.current;
              }

              // Calculate reverse progress: how far back we've scrolled from dock position
              const maxReverseDistance = 600; // Match forward movement's maxScrollDistance for same path
              const scrollUpDistance = Math.max(0, dockScrollY - scrollYValue); // Distance scrolled up
              const rawProgress = Math.min(1, Math.max(0, scrollUpDistance / maxReverseDistance));
              // Apply easing function for smoother movement (easeInOutCubic) - same as forward
              const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
              const reverseProgress = easeInOutCubic(rawProgress);

              // Use reverse diagonal interpolation: start from exam-circle dock (end) back to ikigai center (start)
              // Use the captured start position (not the updated one)
              const examCircleEndX = examCircleToIkigaiReverseStartX.current ?? after100pxDockX.current ?? 0; // Exam-circle dock X (captured when reverse started)
              const examCircleEndY = examCircleToIkigaiReverseStartY.current ?? after100pxDockY.current ?? 0; // Exam-circle dock Y (captured when reverse started)
              const ikigaiStartX = forwardMovementStartX.current; // ikigai center position (forward movement's start)
              const ikigaiStartY = forwardMovementStartY.current; // ikigai center position (forward movement's start)

              // Reverse interpolation: from end (exam-circle) back to start (ikigai center)
              const currentX = examCircleEndX + (ikigaiStartX - examCircleEndX) * reverseProgress;
              const currentY = examCircleEndY + (ikigaiStartY - examCircleEndY) * reverseProgress;

              // Calculate scale: reverse from exam-circle scale back to ikigai scale
              const startScale = after100pxDockScale.current; // Scale at exam-circle dock (forward movement's end scale)
              const endScale = forwardMovementStartScale.current; // Scale at ikigai center (forward movement's start scale)
              const currentScale = startScale + (endScale - startScale) * reverseProgress;

              // Animate exam-green-circle scale: shrink from big (1) to small/invisible (0) as avatar leaves
              // Reverse progress: 0 = at circle (full size), 1 = at ikigai (invisible)
              const examCircleEl = document.getElementById('exam-green-circle');
              if (examCircleEl) {
                const circleMaxScale = 1.0; // Full size when avatar is at circle
                const circleMinScale = 0.0; // Invisible when avatar leaves
                const circleCurrentScale = circleMaxScale * (1 - reverseProgress); // Shrink as avatar moves away
                (examCircleEl as HTMLElement).style.transform = `scale(${Math.max(0, circleCurrentScale)})`;
                (examCircleEl as HTMLElement).style.opacity = `${Math.max(0, Math.min(1, circleCurrentScale))}`;
                (examCircleEl as HTMLElement).style.display = circleCurrentScale > 0.05 ? 'block' : 'none';
              }

              avatarX.set(Math.round(currentX));
              avatarY.set(Math.round(currentY));
              avatarScale.set(currentScale);

              // If we've reached the start (ikigai center position), dock at ikigai center properly
              if (reverseProgress >= 1) {
                // Recalculate ikigai position right before storing to ensure accuracy
                // Use exact same calculation as when docking from quick-access-title
                const ikigaiRectFinal = ikigaiCenterEl.getBoundingClientRect();
                const ikigaiCenterX = ikigaiRectFinal.left + ikigaiRectFinal.width / 2;
                const ikigaiCenterY = ikigaiRectFinal.top + ikigaiRectFinal.height / 2;

                // Target position: ikigai center position, 24px to the right and 24px down (same as quick-access-title docking)
                const ikigaiDockedX = Math.round(ikigaiCenterX + 24);
                const ikigaiDockedY = Math.round(ikigaiCenterY + 24);

                // Get the actual size of the ikigai center image
                const ikigaiImageWidth = ikigaiRectFinal.width;
                const avatarBaseSize = 48;
                const ikigaiDockedScale = ikigaiImageWidth / avatarBaseSize; // Scale to match image width

                // Reset exam-circle dock state
                setIsDockedAfter100px(false);
                after100pxDockScrollY.current = null;
                after100pxDockY.current = null;
                after100pxDockX.current = null;
                after100pxDockScale.current = null;
                // Reset reverse movement start
                examCircleToIkigaiReverseStartScrollY.current = null;
                examCircleToIkigaiReverseStartY.current = null;
                examCircleToIkigaiReverseStartX.current = null;

                // Dock at ikigai center (same as when coming from quick-access-title)
                setIsDockedAtIkigaiCenter(true);
                ikigaiCenterDockScrollY.current = scrollYValue;
                ikigaiCenterDockY.current = ikigaiDockedY;
                ikigaiCenterDockX.current = ikigaiDockedX;
                ikigaiCenterDockScale.current = ikigaiDockedScale;

                // Reset downward movement start so it can be recaptured when scrolling down again
                ikigaiDownwardMovementStartScrollY.current = null;
                ikigaiDownwardMovementStartY.current = null;
                ikigaiDownwardMovementStartX.current = null;

                // Keep forwardMovementStartX/Y/Scale so we can use them for next reverse movement if needed
                // (They will be updated when we move to exam-circle again)

                // Ensure avatar is positioned exactly at ikigai center
                avatarX.set(ikigaiDockedX);
                avatarY.set(ikigaiDockedY);
                avatarScale.set(ikigaiDockedScale);
              }

              return; // Exit early to prevent other movement logic
            } else {
              // Fallback: follow ikigai element smoothly if movement data not available
              // This shouldn't happen if forward movement stored positions correctly
              const ikigaiRect = ikigaiCenterEl.getBoundingClientRect();
              const currentIkigaiX = ikigaiRect.left + ikigaiRect.width / 2 + 24;
              const currentIkigaiY = ikigaiRect.top + ikigaiRect.height / 2 + 24;
              const avatarBaseSize = 48;
              const ikigaiImageWidth = ikigaiRect.width;
              const ikigaiScale = ikigaiImageWidth / avatarBaseSize;

              avatarX.set(Math.round(currentIkigaiX));
              avatarY.set(Math.round(currentIkigaiY));
              avatarScale.set(ikigaiScale);

              return; // Exit early
            }
          }
          return; // Exit early to prevent other movement logic
        } else {
          // Scrolling down, reset reverse movement if it was active
          if (examCircleToIkigaiReverseStartScrollY.current !== null) {
            examCircleToIkigaiReverseStartScrollY.current = null;
            examCircleToIkigaiReverseStartY.current = null;
            examCircleToIkigaiReverseStartX.current = null;
          }
        }
      }

      if (reachedPulsePoint && !isPaused && !pauseComplete && !isDocked) {
        // Just reached pulse point, dock avatar exactly and begin pause
        // Calculate consistent dock position (same calculation used in paused state)
        const targetX = 30; // Move 30px to the right of center

        // Calculate dock Y position: pulse point position + 30px down
        const pulsePointY = heroCenterY + totalTravelFromStart;
        const dockOffsetY = 30; // Move docking position down by 30px
        const baseDockY = pulsePointY + dockOffsetY;

        // Calculate minimum Y position to maintain 40px gap from header
        // Avatar center Y = headerBottom + 40px gap + 24px (half avatar height)
        const minAvatarY = headerHeight + 40 + 24;

        // Final dock Y: use the same calculation for consistency
        const finalDockY = Math.max(baseDockY, minAvatarY);

        // Move directly to dock position (no smooth transition)
        avatarX.set(Math.round(heroCenterX + targetX));
        avatarY.set(Math.round(finalDockY));
        setIsDocked(true);
        setIsPaused(true);
        setShouldPulse(true);
        pauseStartTime.current = Date.now();
        return; // Stop movement during docking/pulse
      }

      if (isPaused && !pauseComplete) {
        // While paused, keep docking avatar completely fixed at dock position
        // Use the SAME dock position calculation as initial docking for consistency
        const targetX = 30; // Move 30px to the right of center

        // Calculate dock Y position: pulse point position + 30px down (same as initial docking)
        const pulsePointY = heroCenterY + totalTravelFromStart;
        const dockOffsetY = 30; // Move docking position down by 30px
        const baseDockY = pulsePointY + dockOffsetY;

        // Calculate minimum Y position to maintain 40px gap from header
        const headerBottom = headerHeight;
        // Avatar center Y = headerBottom + 40px gap + 24px (half avatar height)
        const minAvatarY = headerBottom + 40 + 24;

        // Final dock Y: use the same calculation as initial docking
        const finalDockY = Math.max(baseDockY, minAvatarY);

        // Keep avatar fixed at dock position (direct position, no transition)
        avatarX.set(Math.round(heroCenterX + targetX)); // Move 30px to the right
        avatarY.set(Math.round(finalDockY));

        // Calculate gap between avatar top and header bottom
        // Avatar height is 48px, so half height is 24px
        const avatarHalfHeight = 24;
        const avatarTop = finalDockY - avatarHalfHeight;
        const gap = avatarTop - headerBottom;

        // Check if 500ms pulse duration has passed
        const pulseDuration = 500; // 500ms pulse duration
        const timeSincePauseStart = pauseStartTime.current ? Date.now() - pauseStartTime.current : 0;
        const pulseComplete = timeSincePauseStart >= pulseDuration;

        // Only release when: 500ms pulse duration has passed AND gap >= 40px AND user is scrolling down
        if (pulseComplete && gap >= 40 && scrollYValue > lastScrollYRef.current) {
          setIsPaused(false);
          setPauseComplete(true);
          setIsDocked(false);
          setShouldPulse(false);
          zigZagStartScrollY.current = scrollYValue; // Track where movement starts
          postFirstDockStartScrollY.current = null; // Reset first dock movement when transitioning to next phase
          // Continue to vertical movement phase below (don't return)
        } else {
          // Update last scroll position
          lastScrollYRef.current = scrollYValue;
          setShouldPulse(true); // Keep pulsing while docked (for 500ms)
          return; // Stay docked if pulse not complete, gap is less than 40px, or not scrolling down
        }
      }

      // Update last scroll position for scroll detection
      lastScrollYRef.current = scrollYValue;

      // Phase 3: After the pulse, avatar moves vertically downward in a straight line covering 90% of hero section height
      if (!isPaused && pauseComplete && reachedPulsePoint) {
        // FIRST: Handle reverse movement when scrolling up from exam-green-circle back to ikigai center
        // Follow exact same pattern as quick-access-title to ikigai-center-image reverse movement
        if (isDockedAfter100px && after100pxDockScrollY.current !== null && after100pxDockX.current !== null && after100pxDockY.current !== null && after100pxDockScale.current !== null) {
          const dockScrollY = after100pxDockScrollY.current;
          const scrollDelta = scrollYValue - dockScrollY;

          // If scrolling up (negative delta), start reverse diagonal movement
          if (scrollDelta < 0) {
            // Get ikigai center element for target position (same as forward movement's start position)
            const ikigaiCenterEl = document.getElementById('ikigai-center-image');

            if (ikigaiCenterEl) {
              // Check if we have the forward movement start positions stored (same pattern as quick-access-title)
              if (forwardMovementStartX.current !== null && forwardMovementStartY.current !== null && forwardMovementStartScale.current !== null) {
                // Initialize reverse movement start positions on first scroll up
                // Capture the exam-circle dock position at the moment reverse starts (before it gets updated)
                if (examCircleToIkigaiReverseStartScrollY.current === null) {
                  examCircleToIkigaiReverseStartScrollY.current = scrollYValue;
                  // Use the stored dock position (captured at moment reverse starts)
                  examCircleToIkigaiReverseStartX.current = after100pxDockX.current;
                  examCircleToIkigaiReverseStartY.current = after100pxDockY.current;
                }

                // Calculate reverse progress: how far back we've scrolled from dock position
                const maxReverseDistance = 600; // Match forward movement's maxScrollDistance for same path
                const scrollUpDistance = Math.max(0, dockScrollY - scrollYValue); // Distance scrolled up
                const rawProgress = Math.min(1, Math.max(0, scrollUpDistance / maxReverseDistance));
                // Apply easing function for smoother movement (easeInOutCubic) - same as forward
                const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
                const reverseProgress = easeInOutCubic(rawProgress);

                // Use reverse diagonal interpolation: start from exam-circle dock (end) back to ikigai center (start)
                // Use the captured start position (not the updated one)
                const examCircleEndX = examCircleToIkigaiReverseStartX.current ?? after100pxDockX.current ?? 0; // Exam-circle dock X (captured when reverse started)
                const examCircleEndY = examCircleToIkigaiReverseStartY.current ?? after100pxDockY.current ?? 0; // Exam-circle dock Y (captured when reverse started)
                const ikigaiStartX = forwardMovementStartX.current; // ikigai center position (forward movement's start)
                const ikigaiStartY = forwardMovementStartY.current; // ikigai center position (forward movement's start)

                // Reverse interpolation: from end (exam-circle) back to start (ikigai center)
                const currentX = examCircleEndX + (ikigaiStartX - examCircleEndX) * reverseProgress;
                const currentY = examCircleEndY + (ikigaiStartY - examCircleEndY) * reverseProgress;

                // Calculate scale: reverse from exam-circle scale back to ikigai scale
                const startScale = after100pxDockScale.current; // Scale at exam-circle dock (forward movement's end scale)
                const endScale = forwardMovementStartScale.current; // Scale at ikigai center (forward movement's start scale)
                const currentScale = startScale + (endScale - startScale) * reverseProgress;

                // Animate exam-green-circle scale: shrink from big (1) to small/invisible (0) as avatar leaves
                // Reverse progress: 0 = at circle (full size), 1 = at ikigai (invisible)
                const examCircleEl = document.getElementById('exam-green-circle');
                if (examCircleEl) {
                  const circleMaxScale = 1.0; // Full size when avatar is at circle
                  const circleMinScale = 0.0; // Invisible when avatar leaves
                  const circleCurrentScale = circleMaxScale * (1 - reverseProgress); // Shrink as avatar moves away
                  (examCircleEl as HTMLElement).style.transform = `scale(${Math.max(0, circleCurrentScale)})`;
                  (examCircleEl as HTMLElement).style.opacity = `${Math.max(0, Math.min(1, circleCurrentScale))}`;
                  (examCircleEl as HTMLElement).style.display = circleCurrentScale > 0.05 ? 'block' : 'none';
                }

                avatarX.set(Math.round(currentX));
                avatarY.set(Math.round(currentY));
                avatarScale.set(currentScale);

                // If we've reached the start (ikigai center position), dock at ikigai center properly
                if (reverseProgress >= 1) {
                  // Recalculate ikigai position right before storing to ensure accuracy
                  // Use exact same calculation as when docking from quick-access-title
                  const ikigaiRectFinal = ikigaiCenterEl.getBoundingClientRect();
                  const ikigaiCenterX = ikigaiRectFinal.left + ikigaiRectFinal.width / 2;
                  const ikigaiCenterY = ikigaiRectFinal.top + ikigaiRectFinal.height / 2;

                  // Target position: ikigai center position, 24px to the right and 24px down (same as quick-access-title docking)
                  const ikigaiDockedX = Math.round(ikigaiCenterX + 24);
                  const ikigaiDockedY = Math.round(ikigaiCenterY + 24);

                  // Get the actual size of the ikigai center image
                  const ikigaiImageWidth = ikigaiRectFinal.width;
                  const avatarBaseSize = 48;
                  const ikigaiDockedScale = ikigaiImageWidth / avatarBaseSize; // Scale to match image width

                  // Reset exam-circle dock state
                  setIsDockedAfter100px(false);
                  after100pxDockScrollY.current = null;
                  after100pxDockY.current = null;
                  after100pxDockX.current = null;
                  after100pxDockScale.current = null;
                  // Reset reverse movement start
                  examCircleToIkigaiReverseStartScrollY.current = null;
                  examCircleToIkigaiReverseStartY.current = null;
                  examCircleToIkigaiReverseStartX.current = null;

                  // Dock at ikigai center (same as when coming from quick-access-title)
                  setIsDockedAtIkigaiCenter(true);
                  ikigaiCenterDockScrollY.current = scrollYValue;
                  ikigaiCenterDockY.current = ikigaiDockedY;
                  ikigaiCenterDockX.current = ikigaiDockedX;
                  ikigaiCenterDockScale.current = ikigaiDockedScale;

                  // Reset downward movement start so it can be recaptured when scrolling down again
                  ikigaiDownwardMovementStartScrollY.current = null;
                  ikigaiDownwardMovementStartY.current = null;
                  ikigaiDownwardMovementStartX.current = null;

                  // Keep forwardMovementStartX/Y/Scale so we can use them for next reverse movement if needed
                  // (They will be updated when we move to exam-circle again)

                  // Ensure avatar is positioned exactly at ikigai center
                  avatarX.set(ikigaiDockedX);
                  avatarY.set(ikigaiDockedY);
                  avatarScale.set(ikigaiDockedScale);
                }

                return; // Exit early to prevent other movement logic
              } else {
                // Fallback: follow ikigai element smoothly if movement data not available
                // This shouldn't happen if forward movement stored positions correctly
                const ikigaiRect = ikigaiCenterEl.getBoundingClientRect();
                const currentIkigaiX = ikigaiRect.left + ikigaiRect.width / 2 + 24;
                const currentIkigaiY = ikigaiRect.top + ikigaiRect.height / 2 + 24;
                const avatarBaseSize = 48;
                const ikigaiImageWidth = ikigaiRect.width;
                const ikigaiScale = ikigaiImageWidth / avatarBaseSize;

                avatarX.set(Math.round(currentIkigaiX));
                avatarY.set(Math.round(currentIkigaiY));
                avatarScale.set(ikigaiScale);

                return; // Exit early
              }
            }
            return; // Exit early to prevent other movement logic
          } else {
            // Scrolling down, reset reverse movement if it was active
            if (examCircleToIkigaiReverseStartScrollY.current !== null) {
              examCircleToIkigaiReverseStartScrollY.current = null;
              examCircleToIkigaiReverseStartY.current = null;
              examCircleToIkigaiReverseStartX.current = null;
            }
          }
        }

        // SECOND: Handle scrolling down from ikigai center dock position (must be checked before any movement logic)
        if (isDockedAtIkigaiCenter && ikigaiCenterDockScrollY.current !== null && ikigaiCenterDockY.current !== null && ikigaiCenterDockX.current !== null && ikigaiCenterDockScale.current !== null) {
          // Get ikigai center element to get current position for gap calculation
          const ikigaiCenterEl = document.getElementById('ikigai-center-image');
          if (!ikigaiCenterEl) {
            // If element not found, reset dock state
            setIsDockedAtIkigaiCenter(false);
            return;
          }

          const ikigaiRect = ikigaiCenterEl.getBoundingClientRect();
          const headerHeight = getHeaderHeight();
          const headerBottom = headerHeight;

          // Use the stored dock position (viewport coordinates when first docked)
          // Keep this fixed - don't update it when following ikigai
          const baseDockX = ikigaiCenterDockX.current;
          const baseDockY = ikigaiCenterDockY.current;
          const baseDockScale = ikigaiCenterDockScale.current;

          // Calculate gap between stored dock position and header (for determining when to start movement)
          // Account for avatar size at dock scale
          const avatarHalfHeightAtDock = (48 * baseDockScale) / 2; // Half height considering scale
          const avatarTopAtDock = baseDockY - avatarHalfHeightAtDock;
          const gapAtDock = avatarTopAtDock - headerBottom;

          // Also check current ikigai position to follow it when gap is sufficient
          const currentIkigaiY = ikigaiRect.top + ikigaiRect.height / 2 + 24;
          const currentIkigaiX = ikigaiRect.left + ikigaiRect.width / 2 + 24;

          const dockScrollY = ikigaiCenterDockScrollY.current;
          const scrollDelta = scrollYValue - dockScrollY;

          // If scrolling back up, use reverse diagonal interpolation to go back to quick-access-title position
          if (scrollDelta < 0) {
            // Scrolling back up - use reverse diagonal interpolation (same path as going down)
            // Reset downward movement start when scrolling back up
            if (ikigaiDownwardMovementStartScrollY.current !== null) {
              ikigaiDownwardMovementStartScrollY.current = null;
              ikigaiDownwardMovementStartY.current = null;
              ikigaiDownwardMovementStartX.current = null;
            }

            // Check if we have the movement start positions stored
            if (ikigaiCenterMovementStartScrollY.current !== null && ikigaiCenterMovementStartY.current !== null && ikigaiCenterMovementStartX.current !== null) {
              // Calculate reverse progress: how far back we've scrolled from dock position
              // Use adaptive calculation matching forward movement
              const ikigaiEndX = baseDockX; // Current ikigai dock X
              const ikigaiEndY = baseDockY; // Current ikigai dock Y
              const ikigaiStartX = ikigaiCenterMovementStartX.current; // quick-access-title dock X
              const ikigaiStartY = ikigaiCenterMovementStartY.current; // quick-access-title dock Y

              // Calculate actual distance for adaptive scroll distance
              const actualDistance = Math.sqrt(
                Math.pow(ikigaiEndX - ikigaiStartX, 2) + Math.pow(ikigaiEndY - ikigaiStartY, 2)
              );
              // Use viewport height as base, but scale based on actual distance
              const viewportHeight = window.innerHeight;
              const baseScrollDistance = Math.min(viewportHeight * 0.4, actualDistance * 0.8); // 40% of viewport or 80% of actual distance, whichever is smaller
              const movementScrollDistance = Math.max(baseScrollDistance, 150); // Minimum 150px for smooth movement

              const scrollUpDistance = Math.max(0, dockScrollY - scrollYValue); // Distance scrolled up
              const reverseProgress = Math.min(1, Math.max(0, scrollUpDistance / movementScrollDistance));

              // Use reverse diagonal interpolation: start from ikigai center (end) back to quick-access-title (start)
              // (ikigaiEndX, ikigaiEndY, ikigaiStartX, ikigaiStartY already calculated above)

              // Reverse interpolation: from end (ikigai) back to start (quick-access-title)
              const currentX = ikigaiEndX + (ikigaiStartX - ikigaiEndX) * reverseProgress;
              const currentY = ikigaiEndY + (ikigaiStartY - ikigaiEndY) * reverseProgress;

              // Calculate scale: reverse from ikigai scale back to 0.8 (quick-access-title scale)
              const avatarBaseSize = 48;
              const ikigaiImageWidth = ikigaiRect.width;
              const targetScale = ikigaiImageWidth / avatarBaseSize;
              const startScale = 0.8; // Scale at quick-access-title dock
              const currentScale = targetScale + (startScale - targetScale) * reverseProgress;

              avatarX.set(Math.round(currentX));
              avatarY.set(Math.round(currentY));
              avatarScale.set(currentScale);

              // If we've reached the start (quick-access-title position), reset dock state but keep movement data for resume
              if (reverseProgress >= 1) {
                setIsDockedAtIkigaiCenter(false);
                setIsMovingToIkigaiCenter(false);
                ikigaiCenterDockScrollY.current = null;
                ikigaiCenterDockY.current = null;
                ikigaiCenterDockX.current = null;
                ikigaiCenterDockScale.current = null;
                setIsDockedAfter100px(false); // Reset 100px dock state
                after100pxDockScrollY.current = null; // Reset 100px dock scroll position
                after100pxDockY.current = null; // Reset 100px dock Y position
                after100pxDockX.current = null; // Reset 100px dock X position
                after100pxDockScale.current = null; // Reset 100px dock scale
                setIsDockedAtToolsSmartSolutions(false); // Reset tools-smart-solutions dock state
                setIsMovingToToolsSmartSolutions(false); // Reset tools-smart-solutions movement state
                toolsSmartSolutionsMovementStartScrollY.current = null; // Reset tools-smart-solutions movement start scroll
                toolsSmartSolutionsMovementStartY.current = null; // Reset tools-smart-solutions movement start Y
                toolsSmartSolutionsMovementStartX.current = null; // Reset tools-smart-solutions movement start X
                toolsSmartSolutionsDockScrollY.current = null; // Reset tools-smart-solutions dock scroll
                toolsSmartSolutionsDockY.current = null; // Reset tools-smart-solutions dock Y
                toolsSmartSolutionsDockX.current = null; // Reset tools-smart-solutions dock X
                toolsSmartSolutionsDockScale.current = null; // Reset tools-smart-solutions dock scale
                toolsSmartSolutionsToExamCircleReverseStartScrollY.current = null; // Reset reverse movement start scroll
                toolsSmartSolutionsToExamCircleReverseStartY.current = null; // Reset reverse movement start Y
                toolsSmartSolutionsToExamCircleReverseStartX.current = null; // Reset reverse movement start X
                setIsDockedAtPartnersSection(false); // Reset partners-section dock state
                setIsMovingToPartnersSection(false); // Reset partners-section movement state
                partnersSectionMovementStartScrollY.current = null; // Reset partners-section movement start scroll
                partnersSectionMovementStartY.current = null; // Reset partners-section movement start Y
                partnersSectionMovementStartX.current = null; // Reset partners-section movement start X
                partnersSectionDockScrollY.current = null; // Reset partners-section dock scroll
                partnersSectionDockY.current = null; // Reset partners-section dock Y
                partnersSectionDockX.current = null; // Reset partners-section dock X
                partnersSectionDockScale.current = null; // Reset partners-section dock scale
                partnersSectionToToolsSmartSolutionsReverseStartScrollY.current = null; // Reset reverse movement start scroll
                partnersSectionToToolsSmartSolutionsReverseStartY.current = null; // Reset reverse movement start Y
                partnersSectionToToolsSmartSolutionsReverseStartX.current = null; // Reset reverse movement start X
                setIsDockedAtScholarshipsLoans(false); // Reset why-choose-our-mentoring-program dock state
                setIsMovingToScholarshipsLoans(false); // Reset why-choose-our-mentoring-program movement state
                scholarshipsLoansMovementStartScrollY.current = null; // Reset why-choose-our-mentoring-program movement start scroll
                scholarshipsLoansMovementStartY.current = null; // Reset why-choose-our-mentoring-program movement start Y
                scholarshipsLoansMovementStartX.current = null; // Reset why-choose-our-mentoring-program movement start X
                scholarshipsLoansDockScrollY.current = null; // Reset why-choose-our-mentoring-program dock scroll
                scholarshipsLoansDockY.current = null; // Reset why-choose-our-mentoring-program dock Y
                scholarshipsLoansDockX.current = null; // Reset why-choose-our-mentoring-program dock X
                scholarshipsLoansDockScale.current = null; // Reset why-choose-our-mentoring-program dock scale
                scholarshipsLoansToPartnersSectionReverseStartScrollY.current = null; // Reset reverse movement start scroll
                scholarshipsLoansToPartnersSectionReverseStartY.current = null; // Reset reverse movement start Y
                scholarshipsLoansToPartnersSectionReverseStartX.current = null; // Reset reverse movement start X
                setIsDockedAtGlobalEducation(false); // Reset global-education dock state
                setIsMovingToGlobalEducation(false); // Reset global-education movement state
                globalEducationMovementStartScrollY.current = null; // Reset global-education movement start scroll
                globalEducationMovementStartY.current = null; // Reset global-education movement start Y
                globalEducationMovementStartX.current = null; // Reset global-education movement start X
                globalEducationDockScrollY.current = null; // Reset global-education dock scroll
                globalEducationDockY.current = null; // Reset global-education dock Y
                globalEducationDockX.current = null; // Reset global-education dock X
                globalEducationDockScale.current = null; // Reset global-education dock scale
                globalEducationToScholarshipsLoansReverseStartScrollY.current = null; // Reset reverse movement start scroll
                globalEducationToScholarshipsLoansReverseStartY.current = null; // Reset reverse movement start Y
                globalEducationToScholarshipsLoansReverseStartX.current = null; // Reset reverse movement start X
                // Keep ikigaiCenterMovementStartScrollY and StartX/StartY so we can resume diagonal movement when scrolling down again
              }
            } else {
              // Fallback: follow ikigai element smoothly if movement data not available (e.g., came from exam-circle)
              // Don't update stored dock positions - just follow ikigai center smoothly to prevent flickering
              // The stored positions should remain stable from when we first docked

              // Use a debounced approach: only update position if ikigai has moved significantly
              const currentX = Math.round(currentIkigaiX);
              const currentY = Math.round(currentIkigaiY);

              // Check if ikigai position has changed significantly (more than 2px) to prevent micro-movements
              if (previousAvatarX.current !== null && previousAvatarY.current !== null) {
                const deltaX = Math.abs(currentX - previousAvatarX.current);
                const deltaY = Math.abs(currentY - previousAvatarY.current);

                // Only update if movement is significant (prevents flickering from tiny movements)
                if (deltaX < 2 && deltaY < 2) {
                  // Keep previous position to prevent flickering
                  avatarX.set(previousAvatarX.current);
                  avatarY.set(previousAvatarY.current);
                  avatarScale.set(baseDockScale);
                  return; // Exit early to prevent unnecessary updates
                }
              }

              avatarX.set(currentX);
              avatarY.set(currentY);
              avatarScale.set(baseDockScale);

              // Update previous positions for next frame
              previousAvatarX.current = currentX;
              previousAvatarY.current = currentY;

              // Reset flicker detection when smoothly following
              flickerDetectionCount.current = 0;
            }
            return; // Exit early to prevent other movement logic
          }

          // Check current gap to decide if we should move down
          const avatarTopAtCurrentIkigai = currentIkigaiY - (48 * baseDockScale) / 2;
          const currentGap = avatarTopAtCurrentIkigai - headerBottom;

          // If scrolling down (scrollDelta > 0), always scale down based on scroll distance
          // Gap check only determines when to start moving position, not scaling
          if (scrollDelta > 0) {
            // Track when downward movement/scaling starts
            if (ikigaiDownwardMovementStartScrollY.current === null) {
              // Only start when gap reaches 40px or less
              if (currentGap <= 40) {
                ikigaiDownwardMovementStartScrollY.current = scrollYValue;
                // Capture the actual current avatar position when diagonal movement starts (prevents vertical jump)
                ikigaiDownwardMovementStartY.current = avatarY.get();
                ikigaiDownwardMovementStartX.current = avatarX.get();
              } else {
                // Gap still > 40px, just follow ikigai but don't scale yet
                avatarX.set(Math.round(currentIkigaiX));
                avatarY.set(Math.round(currentIkigaiY));
                avatarScale.set(baseDockScale);
                return;
              }
            }

            // We've started scaling/moving, calculate based on scroll distance
            // Use the actual starting position when movement began (not stored dock position) to ensure smooth diagonal path
            const movementBaseY = ikigaiDownwardMovementStartY.current !== null ? ikigaiDownwardMovementStartY.current : baseDockY;
            const movementBaseX = ikigaiDownwardMovementStartX.current !== null ? ikigaiDownwardMovementStartX.current : baseDockX;

            // Check if already docked after 100px movement - keep avatar centered on exam-green-circle permanently
            if (isDockedAfter100px) {
              // Get exam-green-circle element to follow its position
              const examCircleEl = document.getElementById('exam-green-circle');
              if (examCircleEl) {
                // Calculate scrollDelta for exam-circle dock section
                const examCircleDockScrollY = after100pxDockScrollY.current ?? scrollYValue;
                const examCircleScrollDelta = scrollYValue - examCircleDockScrollY;
                // Ensure exam-green-circle is at full scale when permanently docked
                (examCircleEl as HTMLElement).style.transform = 'scale(1)';
                (examCircleEl as HTMLElement).style.opacity = '1';
                (examCircleEl as HTMLElement).style.display = 'block';

                const examCircleRect = examCircleEl.getBoundingClientRect();
                // Always center avatar on the exam-green-circle element, 20px down from center
                let circleCenterX = examCircleRect.left + examCircleRect.width / 2;
                let circleCenterY = examCircleRect.top + examCircleRect.height / 2 + 20; // 20px down from center

                // Calculate scale first (needed for gap calculation)
                const avatarBaseSize = 48;
                const currentTargetScale = examCircleRect.width / avatarBaseSize;

                // Check for news banner collision when scrolling up - maintain 30px gap
                const newsBannerEl = document.getElementById('news-banner');
                if (newsBannerEl) {
                  const newsBannerRect = newsBannerEl.getBoundingClientRect();
                  const newsBannerTop = newsBannerRect.top;

                  // Calculate avatar's bottom position (accounting for current scale)
                  const avatarHalfHeight = (avatarBaseSize * currentTargetScale) / 2;
                  const avatarBottom = circleCenterY + avatarHalfHeight;

                  // Calculate gap between avatar bottom and news banner top
                  const gap = newsBannerTop - avatarBottom;

                  // If gap is less than 30px, adjust avatar position upward to maintain 30px gap
                  if (gap < 30) {
                    const requiredGap = 30;
                    const targetAvatarBottom = newsBannerTop - requiredGap;
                    circleCenterY = targetAvatarBottom - avatarHalfHeight;
                  }
                }

                // Update stored positions to follow the circle
                if (after100pxDockX.current !== null && after100pxDockY.current !== null) {
                  after100pxDockX.current = circleCenterX;
                  after100pxDockY.current = circleCenterY;
                }

                // Ensure scale matches the circle size (in case it changes)
                if (after100pxDockScale.current !== null) {
                  after100pxDockScale.current = currentTargetScale;
                }

                // Handle reverse movement when scrolling up from tools-smart-solutions back to exam-circle
                if (isDockedAtToolsSmartSolutions && toolsSmartSolutionsDockScrollY.current !== null) {
                  const dockScrollY = toolsSmartSolutionsDockScrollY.current;
                  const scrollDelta = scrollYValue - dockScrollY;

                  // If scrolling up (negative delta), start reverse diagonal movement
                  if (scrollDelta < 0) {
                    // Initialize reverse movement start positions on first scroll up
                    if (toolsSmartSolutionsToExamCircleReverseStartScrollY.current === null) {
                      toolsSmartSolutionsToExamCircleReverseStartScrollY.current = scrollYValue;
                      toolsSmartSolutionsToExamCircleReverseStartY.current = avatarY.get();
                      toolsSmartSolutionsToExamCircleReverseStartX.current = avatarX.get();
                    }

                    // Get exam-circle element for target position
                    if (toolsSmartSolutionsToExamCircleReverseStartY.current !== null && toolsSmartSolutionsToExamCircleReverseStartX.current !== null) {
                      const examCircleRect = examCircleEl.getBoundingClientRect();
                      const targetCircleX = examCircleRect.left + examCircleRect.width / 2;
                      const targetCircleY = examCircleRect.top + examCircleRect.height / 2 + 20; // 20px down from center

                      // Calculate reverse progress based on scroll distance
                      const reverseStartScroll = toolsSmartSolutionsToExamCircleReverseStartScrollY.current;
                      const scrollUpDistance = Math.max(0, reverseStartScroll - scrollYValue);

                      // Reverse diagonal interpolation: from tools-smart-solutions (start) back to exam-circle (end)
                      const startX = toolsSmartSolutionsToExamCircleReverseStartX.current;
                      const startY = toolsSmartSolutionsToExamCircleReverseStartY.current;
                      const endX = targetCircleX;
                      const endY = targetCircleY;

                      // Use actual distance between start and end positions to determine scroll distance needed
                      const distanceX = Math.abs(endX - startX);
                      const distanceY = Math.abs(endY - startY);
                      const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                      // Require more scroll distance for slower, smoother reverse movement - use 3x the actual distance
                      const maxReverseDistance = Math.max(600, totalDistance * 3);
                      const rawProgress = Math.min(1, scrollUpDistance / maxReverseDistance);

                      // Apply easing function for smoother movement (use easeOut for more gradual start)
                      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                      const reverseProgress = easeOutCubic(rawProgress);

                      // Linear interpolation in reverse direction
                      const currentX = startX + (endX - startX) * reverseProgress;
                      const currentY = startY + (endY - startY) * reverseProgress;

                      // Calculate scale interpolation (reverse from tools-smart-solutions scale to exam-circle scale)
                      const avatarBaseSize = 48;
                      let startScale = 34 / 48; // Default tools-smart-solutions scale (34px)
                      if (toolsSmartSolutionsDockScale.current !== null) {
                        startScale = toolsSmartSolutionsDockScale.current;
                      }
                      const endScale = examCircleRect.width / avatarBaseSize;
                      const currentScale = startScale + (endScale - startScale) * reverseProgress;

                      // Maintain 50px gap from header during reverse movement
                      const headerHeight = getHeaderHeight();
                      const headerBottom = headerHeight;
                      const avatarHalfHeight = (avatarBaseSize * currentScale) / 2;
                      const minAvatarY = headerBottom + 50 + avatarHalfHeight; // 50px gap + half avatar height
                      const clampedY = Math.max(currentY, minAvatarY);

                      avatarX.set(Math.round(currentX));
                      avatarY.set(Math.round(clampedY));
                      avatarScale.set(currentScale);

                      // If we've reached exam-circle (progress >= 0.98), reset to exam-circle dock state
                      if (reverseProgress >= 0.98) {
                        setIsDockedAtToolsSmartSolutions(false);
                        setIsMovingToToolsSmartSolutions(false); // Reset movement state to allow re-triggering
                        toolsSmartSolutionsDockScrollY.current = null;
                        toolsSmartSolutionsDockY.current = null;
                        toolsSmartSolutionsDockX.current = null;
                        toolsSmartSolutionsDockScale.current = null;
                        toolsSmartSolutionsToExamCircleReverseStartScrollY.current = null;
                        toolsSmartSolutionsToExamCircleReverseStartY.current = null;
                        toolsSmartSolutionsToExamCircleReverseStartX.current = null;
                        toolsSmartSolutionsMovementStartScrollY.current = null; // Reset movement start to allow re-triggering
                        toolsSmartSolutionsMovementStartY.current = null; // Reset movement start Y
                        toolsSmartSolutionsMovementStartX.current = null; // Reset movement start X

                        // Avatar will continue to follow exam-circle (handled below)
                      }
                      return; // Exit early during reverse movement
                    }
                  } else {
                    // Scrolling down, reset reverse movement if it was active
                    if (toolsSmartSolutionsToExamCircleReverseStartScrollY.current !== null) {
                      toolsSmartSolutionsToExamCircleReverseStartScrollY.current = null;
                      toolsSmartSolutionsToExamCircleReverseStartY.current = null;
                      toolsSmartSolutionsToExamCircleReverseStartX.current = null;
                    }
                  }
                }

                // FINAL DOCKING POINT: Check if already docked at scholarship-programs FIRST - this must be checked before all other docking logic
                // This prevents any other movement logic from interfering when scholarship-programs is docked
                if (isDockedAtScholarshipPathGreenIcon && scholarshipPathGreenIconDockX.current !== null && scholarshipPathGreenIconDockY.current !== null && scholarshipPathGreenIconDockScale.current !== null) {
                  // FIRST: Handle reverse movement when scrolling up from scholarship-programs back to study-abroad-map
                  if (scholarshipPathGreenIconDockScrollY.current !== null) {
                    const scholarshipPathGreenIconDockScroll = scholarshipPathGreenIconDockScrollY.current;
                    const scrollDeltaFromScholarshipPathGreenIcon = scrollYValue - scholarshipPathGreenIconDockScroll;

                    // If scrolling up (negative delta), start reverse diagonal movement
                    if (scrollDeltaFromScholarshipPathGreenIcon < 0) {
                      // Initialize reverse movement start positions on first scroll up
                      if (scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current === null) {
                        scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current = scrollYValue;
                        scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current = avatarY.get();
                        scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current = avatarX.get();
                      }

                      // Use stored dock positions to ensure reverse path matches forward path exactly
                      if (scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current !== null && scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current !== null) {
                        // Use stored dock positions (same as forward movement) to ensure exact path match
                        let startX: number;
                        let startY: number;
                        let endX: number;
                        let endY: number;

                        // Start position: scholarship-programs dock position (use stored position for consistency)
                        if (scholarshipPathGreenIconDockX.current !== null && scholarshipPathGreenIconDockY.current !== null) {
                          startX = scholarshipPathGreenIconDockX.current;
                          startY = scholarshipPathGreenIconDockY.current;
                        } else {
                          // Fallback: use reverse start position
                          startX = scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current;
                          startY = scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current;
                        }

                        // End position: study-abroad-map dock position (use stored position for consistency)
                        if (studyAbroadMapDockX.current !== null && studyAbroadMapDockY.current !== null) {
                          endX = studyAbroadMapDockX.current;
                          endY = studyAbroadMapDockY.current;
                        } else {
                          // Fallback: calculate from element
                          const studyAbroadMapElForReverse = document.getElementById('study-abroad-map');
                          if (studyAbroadMapElForReverse) {
                            const studyAbroadMapRectForReverse = studyAbroadMapElForReverse.getBoundingClientRect();
                            endX = studyAbroadMapRectForReverse.left + studyAbroadMapRectForReverse.width / 2;
                            endY = studyAbroadMapRectForReverse.top + studyAbroadMapRectForReverse.height / 2;
                          } else {
                            // Can't determine end position, continue with normal docking
                            return; // Exit early if can't determine end position
                          }
                        }

                        // Calculate reverse progress based on scroll distance
                        const reverseStartScroll = scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current;
                        const scrollUpDistance = Math.max(0, reverseStartScroll - scrollYValue);

                        // Use actual distance between start and end positions (same calculation as forward movement)
                        const distanceX = Math.abs(endX - startX);
                        const distanceY = Math.abs(endY - startY);
                        const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                        // Require more scroll distance for slower, smoother reverse movement (same as forward)
                        const maxReverseDistance = Math.max(600, totalDistance * 3);
                        const rawProgress = Math.min(1, scrollUpDistance / maxReverseDistance);

                        // Apply easing function
                        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                        const reverseProgress = easeOutCubic(rawProgress);

                        // Linear interpolation in reverse direction
                        const currentX = startX + (endX - startX) * reverseProgress;
                        const currentY = startY + (endY - startY) * reverseProgress;

                        // Calculate scale interpolation (scale when moving back to study-abroad-map)
                        const avatarBaseSize = 48;
                        let startScale = 68 / 48; // Default scholarship-programs scale (68px, 2x base size)
                        if (scholarshipPathGreenIconDockScale.current !== null) {
                          startScale = scholarshipPathGreenIconDockScale.current;
                        }
                        let endScale = 68 / 48; // Default study-abroad-map scale (68px, 2x base size - reduced)
                        if (studyAbroadMapDockScale.current !== null) {
                          endScale = studyAbroadMapDockScale.current;
                        }

                        const currentScale = startScale + (endScale - startScale) * reverseProgress;

                        avatarX.set(Math.round(currentX));
                        avatarY.set(Math.round(currentY));
                        avatarScale.set(currentScale);

                        // If we've reached study-abroad-map (progress >= 0.98), reset to study-abroad-map dock state
                        if (reverseProgress >= 0.98) {
                          setIsDockedAtScholarshipPathGreenIcon(false);
                          setIsMovingToScholarshipPathGreenIcon(false);
                          scholarshipPathGreenIconDockScrollY.current = null;
                          scholarshipPathGreenIconDockY.current = null;
                          scholarshipPathGreenIconDockX.current = null;
                          scholarshipPathGreenIconDockScale.current = null;
                          scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current = null;
                          scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current = null;
                          scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current = null;
                          scholarshipPathGreenIconMovementStartScrollY.current = null;
                          scholarshipPathGreenIconMovementStartY.current = null;
                          scholarshipPathGreenIconMovementStartX.current = null;
                        }
                        return; // Exit early during reverse movement
                      }
                    } else {
                      // Scrolling down, reset reverse movement if it was active
                      if (scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current !== null) {
                        scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current = null;
                        scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current = null;
                        scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current = null;
                      }
                    }
                  }

                  // SECOND: Normal docking - keep avatar centered on scholarship-programs
                  // FINAL DOCKING POINT: No gap maintenance - avatar stays fixed, header moves over it
                  // Get scholarship-programs element to follow its position
                  const scholarshipPathGreenIconEl = document.getElementById('scholarship-programs');
                  if (scholarshipPathGreenIconEl) {
                    const scholarshipPathGreenIconRect = scholarshipPathGreenIconEl.getBoundingClientRect();
                    const scholarshipPathGreenIconCenterX = scholarshipPathGreenIconRect.left + scholarshipPathGreenIconRect.width / 2 + 160; // 160px right from center
                    const scholarshipPathGreenIconCenterY = scholarshipPathGreenIconRect.top + scholarshipPathGreenIconRect.height / 2 + 20; // 20px down from center

                    // NO gap maintenance - avatar stays at element position, header can move over it
                    // Update stored positions to follow the element (NO gap maintenance for final docking point)
                    scholarshipPathGreenIconDockX.current = scholarshipPathGreenIconCenterX;
                    scholarshipPathGreenIconDockY.current = scholarshipPathGreenIconCenterY;

                    // Set avatar to docked position at scholarship-programs (no gap maintenance - final docking point)
                    avatarX.set(Math.round(scholarshipPathGreenIconCenterX));
                    avatarY.set(Math.round(scholarshipPathGreenIconCenterY));
                    avatarScale.set(scholarshipPathGreenIconDockScale.current);
                  } else {
                    // Fallback: use stored position (NO gap maintenance)
                    avatarX.set(Math.round(scholarshipPathGreenIconDockX.current));
                    avatarY.set(Math.round(scholarshipPathGreenIconDockY.current));
                    avatarScale.set(scholarshipPathGreenIconDockScale.current);
                  }
                  return; // FINAL DOCKING POINT - Exit early, prevent ALL other docking and movement logic
                }

                // Check if already docked at tools-smart-solutions - keep avatar centered on tools-smart-solutions
                if (isDockedAtToolsSmartSolutions && toolsSmartSolutionsDockX.current !== null && toolsSmartSolutionsDockY.current !== null && toolsSmartSolutionsDockScale.current !== null) {
                  // Get tools-smart-solutions element to follow its position
                  const toolsSmartSolutionsEl = document.getElementById('tools-smart-solutions');
                  if (toolsSmartSolutionsEl) {
                    const toolsRect = toolsSmartSolutionsEl.getBoundingClientRect();
                    const toolsCenterX = toolsRect.left + toolsRect.width / 2 - 60; // 30px left from center
                    const toolsCenterY = toolsRect.top + toolsRect.height / 2 + 20; // 10px down from center

                    // Maintain 50px gap from header when docked
                    const headerHeight = getHeaderHeight();
                    const headerBottom = headerHeight;
                    const avatarHalfHeight = (48 * toolsSmartSolutionsDockScale.current) / 2;
                    const minAvatarY = headerBottom + 50 + avatarHalfHeight; // 50px gap + half avatar height
                    const clampedToolsCenterY = Math.max(toolsCenterY, minAvatarY);

                    // Update stored positions to follow the element (with gap maintenance)
                    toolsSmartSolutionsDockX.current = toolsCenterX;
                    toolsSmartSolutionsDockY.current = clampedToolsCenterY;

                    // Set avatar to docked position (30px left, 10px down from center, with 50px gap from header)
                    avatarX.set(Math.round(toolsCenterX));
                    avatarY.set(Math.round(clampedToolsCenterY));
                    avatarScale.set(toolsSmartSolutionsDockScale.current);
                  } else {
                    // Fallback: use stored position
                    avatarX.set(Math.round(toolsSmartSolutionsDockX.current));
                    avatarY.set(Math.round(toolsSmartSolutionsDockY.current));
                    avatarScale.set(toolsSmartSolutionsDockScale.current);
                  }

                  // Check if we should move to partners-section (when scrolling down from tools-smart-solutions)
                  const toolsSmartSolutionsDockScroll = toolsSmartSolutionsDockScrollY.current ?? scrollYValue;
                  const scrollDeltaFromTools = scrollYValue - toolsSmartSolutionsDockScroll;

                  // Calculate gap between avatar and header to determine when to start movement
                  // Use the natural (unclamped) position to detect when gap is 40px or less
                  const headerHeight = getHeaderHeight();
                  const headerBottom = headerHeight;
                  const avatarBaseSize = 48;
                  const currentAvatarScale = toolsSmartSolutionsDockScale.current ?? (34 / 48);
                  const avatarHalfHeight = (avatarBaseSize * currentAvatarScale) / 2;
                  // Get the natural position of tools-smart-solutions (before clamping for 50px gap)
                  const toolsSmartSolutionsElForGap = document.getElementById('tools-smart-solutions');
                  let gapToHeader = 1000; // Default large value if element not found
                  if (toolsSmartSolutionsElForGap) {
                    const toolsRectForGap = toolsSmartSolutionsElForGap.getBoundingClientRect();
                    const toolsCenterYNatural = toolsRectForGap.top + toolsRectForGap.height / 2 + 20; // 20px down from center
                    const avatarTopAtToolsNatural = toolsCenterYNatural - avatarHalfHeight;
                    gapToHeader = avatarTopAtToolsNatural - headerBottom;
                  }

                  // Handle reverse movement when scrolling up from partners-section back to tools-smart-solutions
                  if (isDockedAtPartnersSection && partnersSectionDockScrollY.current !== null) {
                    const partnersDockScrollY = partnersSectionDockScrollY.current;
                    const scrollDeltaFromPartners = scrollYValue - partnersDockScrollY;

                    // If scrolling up (negative delta), start reverse diagonal movement
                    if (scrollDeltaFromPartners < 0) {
                      // Initialize reverse movement start positions on first scroll up
                      if (partnersSectionToToolsSmartSolutionsReverseStartScrollY.current === null) {
                        partnersSectionToToolsSmartSolutionsReverseStartScrollY.current = scrollYValue;
                        partnersSectionToToolsSmartSolutionsReverseStartY.current = avatarY.get();
                        partnersSectionToToolsSmartSolutionsReverseStartX.current = avatarX.get();
                      }

                      // Use stored dock positions to ensure reverse path matches forward path exactly
                      if (partnersSectionToToolsSmartSolutionsReverseStartY.current !== null && partnersSectionToToolsSmartSolutionsReverseStartX.current !== null) {
                        // Use stored dock positions (same as forward movement) to ensure exact path match
                        let startX: number;
                        let startY: number;
                        let endX: number;
                        let endY: number;

                        // Start position: partners-section dock position (use stored position for consistency)
                        if (partnersSectionDockX.current !== null && partnersSectionDockY.current !== null) {
                          startX = partnersSectionDockX.current;
                          startY = partnersSectionDockY.current;
                        } else {
                          // Fallback: use reverse start position
                          startX = partnersSectionToToolsSmartSolutionsReverseStartX.current;
                          startY = partnersSectionToToolsSmartSolutionsReverseStartY.current;
                        }

                        // End position: tools-smart-solutions dock position (use stored position for consistency)
                        if (toolsSmartSolutionsDockX.current !== null && toolsSmartSolutionsDockY.current !== null) {
                          endX = toolsSmartSolutionsDockX.current;
                          endY = toolsSmartSolutionsDockY.current;
                        } else {
                          // Fallback: calculate from element
                          const toolsRect = toolsSmartSolutionsEl?.getBoundingClientRect();
                          if (toolsRect) {
                            endX = toolsRect.left + toolsRect.width / 2 - 60;
                            endY = toolsRect.top + toolsRect.height / 2 + 20;
                          } else {
                            return; // Can't determine end position, exit early
                          }
                        }

                        // Calculate reverse progress based on scroll distance
                        const reverseStartScroll = partnersSectionToToolsSmartSolutionsReverseStartScrollY.current;
                        const scrollUpDistance = Math.max(0, reverseStartScroll - scrollYValue);

                        // Use actual distance between start and end positions (same calculation as forward movement)
                        const distanceX = Math.abs(endX - startX);
                        const distanceY = Math.abs(endY - startY);
                        const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                        // Require more scroll distance for slower, smoother reverse movement (same as forward)
                        const maxReverseDistance = Math.max(600, totalDistance * 3);
                        const rawProgress = Math.min(1, scrollUpDistance / maxReverseDistance);

                        // Apply easing function
                        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                        const reverseProgress = easeOutCubic(rawProgress);

                        // Linear interpolation in reverse direction
                        const currentX = startX + (endX - startX) * reverseProgress;
                        const currentY = startY + (endY - startY) * reverseProgress;

                        // Calculate scale interpolation
                        const avatarBaseSize = 48;
                        let startScale = 34 / 48; // Default partners-section scale (34px)
                        if (partnersSectionDockScale.current !== null) {
                          startScale = partnersSectionDockScale.current;
                        }
                        const endScale = 34 / 48; // tools-smart-solutions scale
                        const currentScale = startScale + (endScale - startScale) * reverseProgress;

                        // Maintain 50px gap from header during reverse movement
                        const headerHeight = getHeaderHeight();
                        const headerBottom = headerHeight;
                        const avatarHalfHeight = (avatarBaseSize * currentScale) / 2;
                        const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                        let clampedY = Math.max(currentY, minAvatarY);

                        // Check for news banner collision during reverse movement - maintain 50px gap
                        const newsBannerEl = document.getElementById('news-banner');
                        if (newsBannerEl) {
                          const newsBannerRect = newsBannerEl.getBoundingClientRect();
                          const newsBannerTop = newsBannerRect.top;

                          // Calculate avatar bottom position (current Y + half of scaled avatar height)
                          const scaledAvatarHeight = avatarBaseSize * currentScale;
                          const scaledAvatarHalfHeight = scaledAvatarHeight / 2;
                          const avatarBottom = clampedY + scaledAvatarHalfHeight;

                          // Calculate gap between avatar bottom and news banner top
                          const gap = newsBannerTop - avatarBottom;
                          const requiredGap = 50; // Maintain 50px gap from news banner

                          // If gap is less than required, adjust Y position upward
                          if (gap < requiredGap) {
                            const targetAvatarBottom = newsBannerTop - requiredGap;
                            clampedY = targetAvatarBottom - scaledAvatarHalfHeight;
                          }
                        }

                        avatarX.set(Math.round(currentX));
                        avatarY.set(Math.round(clampedY));
                        avatarScale.set(currentScale);

                        // If we've reached tools-smart-solutions (progress >= 0.98), reset to tools-smart-solutions dock state
                        if (reverseProgress >= 0.98) {
                          setIsDockedAtPartnersSection(false);
                          setIsMovingToPartnersSection(false);
                          partnersSectionDockScrollY.current = null;
                          partnersSectionDockY.current = null;
                          partnersSectionDockX.current = null;
                          partnersSectionDockScale.current = null;
                          partnersSectionToToolsSmartSolutionsReverseStartScrollY.current = null;
                          partnersSectionToToolsSmartSolutionsReverseStartY.current = null;
                          partnersSectionToToolsSmartSolutionsReverseStartX.current = null;
                          partnersSectionMovementStartScrollY.current = null;
                          partnersSectionMovementStartY.current = null;
                          partnersSectionMovementStartX.current = null;
                        }
                        return; // Exit early during reverse movement
                      }
                    } else {
                      // Scrolling down, reset reverse movement if it was active
                      if (partnersSectionToToolsSmartSolutionsReverseStartScrollY.current !== null) {
                        partnersSectionToToolsSmartSolutionsReverseStartScrollY.current = null;
                        partnersSectionToToolsSmartSolutionsReverseStartY.current = null;
                        partnersSectionToToolsSmartSolutionsReverseStartX.current = null;
                      }
                    }
                  }

                  // Check if already docked at partners-section - keep avatar centered on partners-section
                  if (isDockedAtPartnersSection && partnersSectionDockX.current !== null && partnersSectionDockY.current !== null && partnersSectionDockScale.current !== null) {
                    // Get partners-section element to follow its position
                    const partnersSectionEl = document.getElementById('partners-section');
                    if (partnersSectionEl) {
                      const partnersRect = partnersSectionEl.getBoundingClientRect();
                      const partnersCenterX = partnersRect.left + partnersRect.width / 2 + 180; // 100px right from center
                      const partnersCenterY = partnersRect.top + partnersRect.height / 2 + 20; // 20px down from center

                      // Maintain 50px gap from header when docked
                      const headerHeight = getHeaderHeight();
                      const headerBottom = headerHeight;
                      const avatarHalfHeight = (48 * partnersSectionDockScale.current) / 2;
                      const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                      let clampedPartnersCenterY = Math.max(partnersCenterY, minAvatarY);

                      // Check for news banner collision when docked - maintain 50px gap
                      const newsBannerEl = document.getElementById('news-banner');
                      if (newsBannerEl) {
                        const newsBannerRect = newsBannerEl.getBoundingClientRect();
                        const newsBannerTop = newsBannerRect.top;

                        // Calculate avatar bottom position (current Y + half of scaled avatar height)
                        const avatarBaseHeight = 48; // Base avatar height
                        const scaledAvatarHeight = avatarBaseHeight * partnersSectionDockScale.current;
                        const scaledAvatarHalfHeight = scaledAvatarHeight / 2;
                        const avatarBottom = clampedPartnersCenterY + scaledAvatarHalfHeight;

                        // Calculate gap between avatar bottom and news banner top
                        const gap = newsBannerTop - avatarBottom;
                        const requiredGap = 50; // Maintain 50px gap from news banner

                        // If gap is less than required, adjust Y position upward
                        if (gap < requiredGap) {
                          const targetAvatarBottom = newsBannerTop - requiredGap;
                          clampedPartnersCenterY = targetAvatarBottom - scaledAvatarHalfHeight;
                        }
                      }

                      // Update stored positions to follow the element (with gap maintenance)
                      partnersSectionDockX.current = partnersCenterX;
                      partnersSectionDockY.current = clampedPartnersCenterY;

                      // Set avatar to docked position at partners-section (with 50px gap from header and news banner)
                      avatarX.set(Math.round(partnersCenterX));
                      avatarY.set(Math.round(clampedPartnersCenterY));
                      avatarScale.set(partnersSectionDockScale.current);
                    } else {
                      // Fallback: use stored position
                      avatarX.set(Math.round(partnersSectionDockX.current));
                      avatarY.set(Math.round(partnersSectionDockY.current));
                      avatarScale.set(partnersSectionDockScale.current);
                    }

                    // Check if we should move to why-choose-our-mentoring-program (when scrolling down from partners-section)
                    const partnersSectionDockScroll = partnersSectionDockScrollY.current ?? scrollYValue;
                    const scrollDeltaFromPartners = scrollYValue - partnersSectionDockScroll;

                    // Calculate gap between avatar and header to determine when to start movement
                    // Use the natural (unclamped) position to detect when gap is 40px or less
                    const headerHeightForGap = getHeaderHeight();
                    const headerBottomForGap = headerHeightForGap;
                    const avatarBaseSizeForGap = 48;
                    const currentAvatarScaleForGap = partnersSectionDockScale.current ?? (68 / 48);
                    const avatarHalfHeightForGap = (avatarBaseSizeForGap * currentAvatarScaleForGap) / 2;
                    // Get the natural position of partners-section (before clamping for 50px gap)
                    const partnersSectionElForGap = document.getElementById('partners-section');
                    let gapToHeaderFromPartners = 1000; // Default large value if element not found
                    if (partnersSectionElForGap) {
                      const partnersRectForGap = partnersSectionElForGap.getBoundingClientRect();
                      const partnersCenterYNatural = partnersRectForGap.top + partnersRectForGap.height / 2 + 20; // 20px down from center
                      const avatarTopAtPartnersNatural = partnersCenterYNatural - avatarHalfHeightForGap;
                      gapToHeaderFromPartners = avatarTopAtPartnersNatural - headerBottomForGap;
                    }

                    // Handle reverse movement when scrolling up from why-choose-our-mentoring-program back to partners-section
                    if (isDockedAtScholarshipsLoans && scholarshipsLoansDockScrollY.current !== null) {
                      const scholarshipsLoansDockScroll = scholarshipsLoansDockScrollY.current;
                      const scrollDeltaFromScholarshipsLoans = scrollYValue - scholarshipsLoansDockScroll;

                      // If scrolling up (negative delta), start reverse diagonal movement
                      if (scrollDeltaFromScholarshipsLoans < 0) {
                        // Initialize reverse movement start positions on first scroll up
                        if (scholarshipsLoansToPartnersSectionReverseStartScrollY.current === null) {
                          scholarshipsLoansToPartnersSectionReverseStartScrollY.current = scrollYValue;
                          scholarshipsLoansToPartnersSectionReverseStartY.current = avatarY.get();
                          scholarshipsLoansToPartnersSectionReverseStartX.current = avatarX.get();
                        }

                        // Use stored dock positions to ensure reverse path matches forward path exactly
                        if (scholarshipsLoansToPartnersSectionReverseStartY.current !== null && scholarshipsLoansToPartnersSectionReverseStartX.current !== null) {
                          // Use stored dock positions (same as forward movement) to ensure exact path match
                          let startX: number;
                          let startY: number;
                          let endX: number;
                          let endY: number;

                          // Start position: why-choose-our-mentoring-program dock position (use stored position for consistency)
                          if (scholarshipsLoansDockX.current !== null && scholarshipsLoansDockY.current !== null) {
                            startX = scholarshipsLoansDockX.current;
                            startY = scholarshipsLoansDockY.current;
                          } else {
                            // Fallback: use reverse start position
                            startX = scholarshipsLoansToPartnersSectionReverseStartX.current;
                            startY = scholarshipsLoansToPartnersSectionReverseStartY.current;
                          }

                          // End position: partners-section dock position (use stored position for consistency)
                          if (partnersSectionDockX.current !== null && partnersSectionDockY.current !== null) {
                            endX = partnersSectionDockX.current;
                            endY = partnersSectionDockY.current;
                          } else {
                            // Fallback: calculate from element
                            const partnersRect = partnersSectionEl?.getBoundingClientRect();
                            if (partnersRect) {
                              endX = partnersRect.left + partnersRect.width / 2 + 180;
                              endY = partnersRect.top + partnersRect.height / 2 + 20;
                            } else {
                              return; // Can't determine end position, exit early
                            }
                          }

                          // Calculate reverse progress based on scroll distance
                          const reverseStartScroll = scholarshipsLoansToPartnersSectionReverseStartScrollY.current;
                          const scrollUpDistance = Math.max(0, reverseStartScroll - scrollYValue);

                          // Use actual distance between start and end positions (same calculation as forward movement)
                          const distanceX = Math.abs(endX - startX);
                          const distanceY = Math.abs(endY - startY);
                          const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                          // Require more scroll distance for slower, smoother reverse movement (same as forward)
                          const maxReverseDistance = Math.max(600, totalDistance * 3);
                          const rawProgress = Math.min(1, scrollUpDistance / maxReverseDistance);

                          // Apply easing function
                          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                          const reverseProgress = easeOutCubic(rawProgress);

                          // Linear interpolation in reverse direction
                          const currentX = startX + (endX - startX) * reverseProgress;
                          const currentY = startY + (endY - startY) * reverseProgress;

                          // Calculate scale interpolation
                          const avatarBaseSize = 48;
                          let startScale = 68 / 48; // Default why-choose-our-mentoring-program scale (68px, double size)
                          if (scholarshipsLoansDockScale.current !== null) {
                            startScale = scholarshipsLoansDockScale.current;
                          }
                          const endScale = 68 / 48; // partners-section scale (double size)
                          const currentScale = startScale + (endScale - startScale) * reverseProgress;

                          // Maintain 50px gap from header during reverse movement
                          const headerHeight = getHeaderHeight();
                          const headerBottom = headerHeight;
                          const avatarHalfHeight = (avatarBaseSize * currentScale) / 2;
                          const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                          const clampedY = Math.max(currentY, minAvatarY);

                          avatarX.set(Math.round(currentX));
                          avatarY.set(Math.round(clampedY));
                          avatarScale.set(currentScale);

                          // If we've reached partners-section (progress >= 0.98), reset to partners-section dock state
                          if (reverseProgress >= 0.98) {
                            setIsDockedAtScholarshipsLoans(false);
                            setIsMovingToScholarshipsLoans(false);
                            scholarshipsLoansDockScrollY.current = null;
                            scholarshipsLoansDockY.current = null;
                            scholarshipsLoansDockX.current = null;
                            scholarshipsLoansDockScale.current = null;
                            scholarshipsLoansToPartnersSectionReverseStartScrollY.current = null;
                            scholarshipsLoansToPartnersSectionReverseStartY.current = null;
                            scholarshipsLoansToPartnersSectionReverseStartX.current = null;
                            scholarshipsLoansMovementStartScrollY.current = null;
                            scholarshipsLoansMovementStartY.current = null;
                            scholarshipsLoansMovementStartX.current = null;
                          }
                          return; // Exit early during reverse movement
                        }
                      } else {
                        // Scrolling down, reset reverse movement if it was active
                        if (scholarshipsLoansToPartnersSectionReverseStartScrollY.current !== null) {
                          scholarshipsLoansToPartnersSectionReverseStartScrollY.current = null;
                          scholarshipsLoansToPartnersSectionReverseStartY.current = null;
                          scholarshipsLoansToPartnersSectionReverseStartX.current = null;
                        }
                      }
                    }

                    // Check if already docked at why-choose-our-mentoring-program - keep avatar centered on why-choose-our-mentoring-program
                    if (isDockedAtScholarshipsLoans && scholarshipsLoansDockX.current !== null && scholarshipsLoansDockY.current !== null && scholarshipsLoansDockScale.current !== null) {
                      // Get why-choose-our-mentoring-program element to follow its position
                      const scholarshipsLoansEl = document.getElementById('why-choose-our-mentoring-program');
                      if (scholarshipsLoansEl) {
                        const scholarshipsLoansRect = scholarshipsLoansEl.getBoundingClientRect();
                        const scholarshipsLoansCenterX = scholarshipsLoansRect.left + scholarshipsLoansRect.width / 2 - 200; // 100px left from center
                        const scholarshipsLoansCenterY = scholarshipsLoansRect.top + scholarshipsLoansRect.height / 2 + 20; // 20px down from center

                        // Maintain 50px gap from header when docked
                        const headerHeight = getHeaderHeight();
                        const headerBottom = headerHeight;
                        const avatarHalfHeight = (48 * scholarshipsLoansDockScale.current) / 2;
                        const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                        const clampedScholarshipsLoansCenterY = Math.max(scholarshipsLoansCenterY, minAvatarY);

                        // Update stored positions to follow the element (with gap maintenance)
                        scholarshipsLoansDockX.current = scholarshipsLoansCenterX;
                        scholarshipsLoansDockY.current = clampedScholarshipsLoansCenterY;

                        // Set avatar to docked position at why-choose-our-mentoring-program (with 50px gap from header)
                        avatarX.set(Math.round(scholarshipsLoansCenterX));
                        avatarY.set(Math.round(clampedScholarshipsLoansCenterY));
                        avatarScale.set(scholarshipsLoansDockScale.current);
                      } else {
                        // Fallback: use stored position
                        avatarX.set(Math.round(scholarshipsLoansDockX.current));
                        avatarY.set(Math.round(scholarshipsLoansDockY.current));
                        avatarScale.set(scholarshipsLoansDockScale.current);
                      }

                      // Check if we should move to global-education (when scrolling down from why-choose-our-mentoring-program)
                      const scholarshipsLoansDockScroll = scholarshipsLoansDockScrollY.current ?? scrollYValue;
                      const scrollDeltaFromScholarshipsLoans = scrollYValue - scholarshipsLoansDockScroll;

                      // Calculate gap between avatar and header to determine when to start movement
                      // Use the natural (unclamped) position to detect when gap is 40px or less
                      const headerHeightForGap = getHeaderHeight();
                      const headerBottomForGap = headerHeightForGap;
                      const avatarBaseSizeForGap = 48;
                      const currentAvatarScaleForGap = scholarshipsLoansDockScale.current ?? (68 / 48);
                      const avatarHalfHeightForGap = (avatarBaseSizeForGap * currentAvatarScaleForGap) / 2;
                      // Get the natural position of why-choose-our-mentoring-program (before clamping for 50px gap)
                      const scholarshipsLoansElForGap = document.getElementById('why-choose-our-mentoring-program');
                      let gapToHeaderFromScholarshipsLoans = 1000; // Default large value if element not found
                      if (scholarshipsLoansElForGap) {
                        const scholarshipsLoansRectForGap = scholarshipsLoansElForGap.getBoundingClientRect();
                        const scholarshipsLoansCenterYNatural = scholarshipsLoansRectForGap.top + scholarshipsLoansRectForGap.height / 2 + 20; // 20px down from center
                        const avatarTopAtScholarshipsLoansNatural = scholarshipsLoansCenterYNatural - avatarHalfHeightForGap;
                        gapToHeaderFromScholarshipsLoans = avatarTopAtScholarshipsLoansNatural - headerBottomForGap;
                      }

                      // Handle reverse movement when scrolling up from global-education back to why-choose-our-mentoring-program
                      if (isDockedAtGlobalEducation && globalEducationDockScrollY.current !== null) {
                        const globalEducationDockScroll = globalEducationDockScrollY.current;
                        const scrollDeltaFromGlobalEducation = scrollYValue - globalEducationDockScroll;

                        // If scrolling up (negative delta), start reverse diagonal movement
                        if (scrollDeltaFromGlobalEducation < 0) {
                          // Initialize reverse movement start positions on first scroll up
                          if (globalEducationToScholarshipsLoansReverseStartScrollY.current === null) {
                            globalEducationToScholarshipsLoansReverseStartScrollY.current = scrollYValue;
                            globalEducationToScholarshipsLoansReverseStartY.current = avatarY.get();
                            globalEducationToScholarshipsLoansReverseStartX.current = avatarX.get();
                          }

                          // Use stored dock positions to ensure reverse path matches forward path exactly
                          if (globalEducationToScholarshipsLoansReverseStartY.current !== null && globalEducationToScholarshipsLoansReverseStartX.current !== null) {
                            // Use stored dock positions (same as forward movement) to ensure exact path match
                            let startX: number;
                            let startY: number;
                            let endX: number;
                            let endY: number;

                            // Start position: global-education dock position (use stored position for consistency)
                            if (globalEducationDockX.current !== null && globalEducationDockY.current !== null) {
                              startX = globalEducationDockX.current;
                              startY = globalEducationDockY.current;
                            } else {
                              // Fallback: use reverse start position
                              startX = globalEducationToScholarshipsLoansReverseStartX.current;
                              startY = globalEducationToScholarshipsLoansReverseStartY.current;
                            }

                            // End position: why-choose-our-mentoring-program dock position (use stored position for consistency)
                            if (scholarshipsLoansDockX.current !== null && scholarshipsLoansDockY.current !== null) {
                              endX = scholarshipsLoansDockX.current;
                              endY = scholarshipsLoansDockY.current;
                            } else {
                              // Fallback: calculate from element
                              const scholarshipsLoansRect = scholarshipsLoansEl?.getBoundingClientRect();
                              if (scholarshipsLoansRect) {
                                endX = scholarshipsLoansRect.left + scholarshipsLoansRect.width / 2 - 80;
                                endY = scholarshipsLoansRect.top + scholarshipsLoansRect.height / 2 + 20;
                              } else {
                                return; // Can't determine end position, exit early
                              }
                            }

                            // Calculate reverse progress based on scroll distance
                            const reverseStartScroll = globalEducationToScholarshipsLoansReverseStartScrollY.current;
                            const scrollUpDistance = Math.max(0, reverseStartScroll - scrollYValue);

                            // Use actual distance between start and end positions (same calculation as forward movement)
                            const distanceX = Math.abs(endX - startX);
                            const distanceY = Math.abs(endY - startY);
                            const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                            // Require more scroll distance for slower, smoother reverse movement (same as forward)
                            const maxReverseDistance = Math.max(600, totalDistance * 3);
                            const rawProgress = Math.min(1, scrollUpDistance / maxReverseDistance);

                            // Apply easing function
                            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                            const reverseProgress = easeOutCubic(rawProgress);

                            // Linear interpolation in reverse direction
                            const currentX = startX + (endX - startX) * reverseProgress;
                            const currentY = startY + (endY - startY) * reverseProgress;

                            // Calculate scale interpolation
                            const avatarBaseSize = 48;
                            let startScale = 68 / 48; // Default global-education scale (68px, double size)
                            if (globalEducationDockScale.current !== null) {
                              startScale = globalEducationDockScale.current;
                            }
                            const endScale = 68 / 48; // why-choose-our-mentoring-program scale (double size)
                            const currentScale = startScale + (endScale - startScale) * reverseProgress;

                            // Maintain 50px gap from header during reverse movement
                            const headerHeight = getHeaderHeight();
                            const headerBottom = headerHeight;
                            const avatarHalfHeight = (avatarBaseSize * currentScale) / 2;
                            const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                            let clampedY = Math.max(currentY, minAvatarY);

                            // Check for news banner collision during reverse movement - maintain 45px gap
                            const newsBannerEl = document.getElementById('news-banner');
                            if (newsBannerEl) {
                              const newsBannerRect = newsBannerEl.getBoundingClientRect();
                              const newsBannerTop = newsBannerRect.top;

                              // Calculate avatar bottom position (current Y + half of scaled avatar height)
                              const scaledAvatarHeight = avatarBaseSize * currentScale;
                              const scaledAvatarHalfHeight = scaledAvatarHeight / 2;
                              const avatarBottom = clampedY + scaledAvatarHalfHeight;

                              // Calculate gap between avatar bottom and news banner top
                              const gap = newsBannerTop - avatarBottom;
                              const requiredGap = 45; // Maintain 45px gap from news banner

                              // If gap is less than required, adjust Y position upward
                              if (gap < requiredGap) {
                                const targetAvatarBottom = newsBannerTop - requiredGap;
                                clampedY = targetAvatarBottom - scaledAvatarHalfHeight;
                              }
                            }

                            avatarX.set(Math.round(currentX));
                            avatarY.set(Math.round(clampedY));
                            avatarScale.set(currentScale);

                            // If we've reached why-choose-our-mentoring-program (progress >= 0.98), reset to why-choose-our-mentoring-program dock state
                            if (reverseProgress >= 0.98) {
                              setIsDockedAtGlobalEducation(false);
                              setIsMovingToGlobalEducation(false);
                              globalEducationDockScrollY.current = null;
                              globalEducationDockY.current = null;
                              globalEducationDockX.current = null;
                              globalEducationDockScale.current = null;
                              globalEducationToScholarshipsLoansReverseStartScrollY.current = null;
                              globalEducationToScholarshipsLoansReverseStartY.current = null;
                              globalEducationToScholarshipsLoansReverseStartX.current = null;
                              globalEducationMovementStartScrollY.current = null;
                              globalEducationMovementStartY.current = null;
                              globalEducationMovementStartX.current = null;
                            }
                            return; // Exit early during reverse movement
                          }
                        } else {
                          // Scrolling down, reset reverse movement if it was active
                          if (globalEducationToScholarshipsLoansReverseStartScrollY.current !== null) {
                            globalEducationToScholarshipsLoansReverseStartScrollY.current = null;
                            globalEducationToScholarshipsLoansReverseStartY.current = null;
                            globalEducationToScholarshipsLoansReverseStartX.current = null;
                          }
                        }
                      }

                      // Check if already docked at global-education - keep avatar centered on global-education
                      if (isDockedAtGlobalEducation && globalEducationDockX.current !== null && globalEducationDockY.current !== null && globalEducationDockScale.current !== null) {
                        // Get global-education element to follow its position
                        const globalEducationEl = document.getElementById('global-education');
                        if (globalEducationEl) {
                          const globalEducationRect = globalEducationEl.getBoundingClientRect();
                          const globalEducationCenterX = globalEducationRect.left + globalEducationRect.width / 2 + 140; // 80px right from center
                          const globalEducationCenterY = globalEducationRect.top + globalEducationRect.height / 2 + 20;

                          // Maintain 50px gap from header when docked
                          const headerHeight = getHeaderHeight();
                          const headerBottom = headerHeight;
                          const avatarHalfHeight = (48 * globalEducationDockScale.current) / 2;
                          const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                          let clampedGlobalEducationCenterY = Math.max(globalEducationCenterY, minAvatarY);

                          // Check for news banner collision when docked - maintain 45px gap
                          const newsBannerEl = document.getElementById('news-banner');
                          if (newsBannerEl) {
                            const newsBannerRect = newsBannerEl.getBoundingClientRect();
                            const newsBannerTop = newsBannerRect.top;

                            // Calculate avatar bottom position (current Y + half of scaled avatar height)
                            const avatarBaseHeight = 48; // Base avatar height
                            const scaledAvatarHeight = avatarBaseHeight * globalEducationDockScale.current;
                            const scaledAvatarHalfHeight = scaledAvatarHeight / 2;
                            const avatarBottom = clampedGlobalEducationCenterY + scaledAvatarHalfHeight;

                            // Calculate gap between avatar bottom and news banner top
                            const gap = newsBannerTop - avatarBottom;
                            const requiredGap = 45; // Maintain 45px gap from news banner

                            // If gap is less than required, adjust Y position upward
                            if (gap < requiredGap) {
                              const targetAvatarBottom = newsBannerTop - requiredGap;
                              clampedGlobalEducationCenterY = targetAvatarBottom - scaledAvatarHalfHeight;
                            }
                          }

                          // Update stored positions to follow the element (with gap maintenance)
                          globalEducationDockX.current = globalEducationCenterX;
                          globalEducationDockY.current = clampedGlobalEducationCenterY;

                          // Set avatar to docked position at global-education (with 50px gap from header and 45px gap from news banner)
                          avatarX.set(Math.round(globalEducationCenterX));
                          avatarY.set(Math.round(clampedGlobalEducationCenterY));
                          avatarScale.set(globalEducationDockScale.current);
                        } else {
                          // Fallback: use stored position
                          avatarX.set(Math.round(globalEducationDockX.current));
                          avatarY.set(Math.round(globalEducationDockY.current));
                          avatarScale.set(globalEducationDockScale.current);
                        }

                        // Check if we should move to study-abroad-map (when scrolling down from global-education)
                        const globalEducationDockScroll = globalEducationDockScrollY.current ?? scrollYValue;
                        const scrollDeltaFromGlobalEducation = scrollYValue - globalEducationDockScroll;

                        // Calculate gap between avatar and header to determine when to start movement
                        // Use the natural (unclamped) position to detect when gap is 40px or less
                        const headerHeightForGap = getHeaderHeight();
                        const headerBottomForGap = headerHeightForGap;
                        const avatarBaseSizeForGap = 48;
                        const currentAvatarScaleForGap = globalEducationDockScale.current ?? (68 / 48);
                        const avatarHalfHeightForGap = (avatarBaseSizeForGap * currentAvatarScaleForGap) / 2;
                        // Get the natural position of global-education (before clamping for 50px gap)
                        const globalEducationElForGap = document.getElementById('global-education');
                        let gapToHeaderFromGlobalEducation = 1000; // Default large value if element not found
                        if (globalEducationElForGap) {
                          const globalEducationRectForGap = globalEducationElForGap.getBoundingClientRect();
                          const globalEducationCenterYNatural = globalEducationRectForGap.top + globalEducationRectForGap.height / 2 + 20; // 20px down from center
                          const avatarTopAtGlobalEducationNatural = globalEducationCenterYNatural - avatarHalfHeightForGap;
                          gapToHeaderFromGlobalEducation = avatarTopAtGlobalEducationNatural - headerBottomForGap;
                        }

                        // Handle reverse movement when scrolling up from study-abroad-map back to global-education
                        if (isDockedAtStudyAbroadMap && studyAbroadMapDockScrollY.current !== null) {
                          const studyAbroadMapDockScroll = studyAbroadMapDockScrollY.current;
                          const scrollDeltaFromStudyAbroadMap = scrollYValue - studyAbroadMapDockScroll;

                          // If scrolling up (negative delta), start reverse diagonal movement
                          if (scrollDeltaFromStudyAbroadMap < 0) {
                            // Initialize reverse movement start positions on first scroll up
                            if (studyAbroadMapToGlobalEducationReverseStartScrollY.current === null) {
                              studyAbroadMapToGlobalEducationReverseStartScrollY.current = scrollYValue;
                              studyAbroadMapToGlobalEducationReverseStartY.current = avatarY.get();
                              studyAbroadMapToGlobalEducationReverseStartX.current = avatarX.get();
                            }

                            // Use stored dock positions to ensure reverse path matches forward path exactly
                            if (studyAbroadMapToGlobalEducationReverseStartY.current !== null && studyAbroadMapToGlobalEducationReverseStartX.current !== null) {
                              // Use stored dock positions (same as forward movement) to ensure exact path match
                              let startX: number;
                              let startY: number;
                              let endX: number;
                              let endY: number;

                              // Start position: study-abroad-map dock position (use stored position for consistency)
                              if (studyAbroadMapDockX.current !== null && studyAbroadMapDockY.current !== null) {
                                startX = studyAbroadMapDockX.current;
                                startY = studyAbroadMapDockY.current;
                              } else {
                                // Fallback: use reverse start position
                                startX = studyAbroadMapToGlobalEducationReverseStartX.current;
                                startY = studyAbroadMapToGlobalEducationReverseStartY.current;
                              }

                              // End position: global-education dock position (use stored position for consistency)
                              if (globalEducationDockX.current !== null && globalEducationDockY.current !== null) {
                                endX = globalEducationDockX.current;
                                endY = globalEducationDockY.current;
                              } else {
                                // Fallback: calculate from element
                                const globalEducationRect = globalEducationEl?.getBoundingClientRect();
                                if (globalEducationRect) {
                                  endX = globalEducationRect.left + globalEducationRect.width / 2 + 140;
                                  endY = globalEducationRect.top + globalEducationRect.height / 2 + 20;
                                } else {
                                  return; // Can't determine end position, exit early
                                }
                              }

                              // Calculate reverse progress based on scroll distance
                              const reverseStartScroll = studyAbroadMapToGlobalEducationReverseStartScrollY.current;
                              const scrollUpDistance = Math.max(0, reverseStartScroll - scrollYValue);

                              // Use actual distance between start and end positions (same calculation as forward movement)
                              const distanceX = Math.abs(endX - startX);
                              const distanceY = Math.abs(endY - startY);
                              const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                              // Require more scroll distance for slower, smoother reverse movement (same as forward)
                              const maxReverseDistance = Math.max(600, totalDistance * 3);
                              const rawProgress = Math.min(1, scrollUpDistance / maxReverseDistance);

                              // Apply easing function
                              const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                              const reverseProgress = easeOutCubic(rawProgress);

                              // Linear interpolation in reverse direction
                              const currentX = startX + (endX - startX) * reverseProgress;
                              const currentY = startY + (endY - startY) * reverseProgress;

                              // Calculate scale interpolation
                              const avatarBaseSize = 48;
                              let startScale = 68 / 48; // Default study-abroad-map scale (68px, 2x base size - reduced)
                              if (studyAbroadMapDockScale.current !== null) {
                                startScale = studyAbroadMapDockScale.current;
                              }
                              let endScale = 68 / 48; // Default global-education scale (68px, double size)
                              if (globalEducationDockScale.current !== null) {
                                endScale = globalEducationDockScale.current;
                              }
                              const currentScale = startScale + (endScale - startScale) * reverseProgress;

                              // Maintain 50px gap from header during reverse movement
                              const headerHeight = getHeaderHeight();
                              const headerBottom = headerHeight;
                              const avatarHalfHeight = (avatarBaseSize * currentScale) / 2;
                              const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                              const clampedY = Math.max(currentY, minAvatarY);

                              avatarX.set(Math.round(currentX));
                              avatarY.set(Math.round(clampedY));
                              avatarScale.set(currentScale);

                              // If we've reached global-education (progress >= 0.98), reset to global-education dock state
                              if (reverseProgress >= 0.98) {
                                setIsDockedAtStudyAbroadMap(false);
                                setIsMovingToStudyAbroadMap(false);
                                studyAbroadMapDockScrollY.current = null;
                                studyAbroadMapDockY.current = null;
                                studyAbroadMapDockX.current = null;
                                studyAbroadMapDockScale.current = null;
                                studyAbroadMapToGlobalEducationReverseStartScrollY.current = null;
                                studyAbroadMapToGlobalEducationReverseStartY.current = null;
                                studyAbroadMapToGlobalEducationReverseStartX.current = null;
                                studyAbroadMapMovementStartScrollY.current = null;
                                studyAbroadMapMovementStartY.current = null;
                                studyAbroadMapMovementStartX.current = null;
                              }
                              return; // Exit early during reverse movement
                            }
                          } else {
                            // Scrolling down, reset reverse movement if it was active
                            if (studyAbroadMapToGlobalEducationReverseStartScrollY.current !== null) {
                              studyAbroadMapToGlobalEducationReverseStartScrollY.current = null;
                              studyAbroadMapToGlobalEducationReverseStartY.current = null;
                              studyAbroadMapToGlobalEducationReverseStartX.current = null;
                            }
                          }
                        }

                        // Check if already docked at study-abroad-map - keep avatar centered on study-abroad-map
                        if (isDockedAtStudyAbroadMap && studyAbroadMapDockX.current !== null && studyAbroadMapDockY.current !== null && studyAbroadMapDockScale.current !== null) {
                          // Get study-abroad-map element to follow its position
                          const studyAbroadMapEl = document.getElementById('study-abroad-map');
                          if (studyAbroadMapEl) {
                            const studyAbroadMapRect = studyAbroadMapEl.getBoundingClientRect();
                            const studyAbroadMapCenterX = studyAbroadMapRect.left + studyAbroadMapRect.width / 2;
                            const studyAbroadMapCenterY = studyAbroadMapRect.top + studyAbroadMapRect.height / 2;

                            // Maintain 50px gap from header when docked
                            const headerHeight = getHeaderHeight();
                            const headerBottom = headerHeight;
                            const avatarHalfHeight = (48 * studyAbroadMapDockScale.current) / 2;
                            const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                            const clampedStudyAbroadMapCenterY = Math.max(studyAbroadMapCenterY, minAvatarY);

                            // Update stored positions to follow the element (with gap maintenance)
                            studyAbroadMapDockX.current = studyAbroadMapCenterX;
                            studyAbroadMapDockY.current = clampedStudyAbroadMapCenterY;

                            // Set avatar to docked position at study-abroad-map (with 50px gap from header)
                            avatarX.set(Math.round(studyAbroadMapCenterX));
                            avatarY.set(Math.round(clampedStudyAbroadMapCenterY));
                            avatarScale.set(studyAbroadMapDockScale.current);
                          } else {
                            // Fallback: use stored position
                            avatarX.set(Math.round(studyAbroadMapDockX.current));
                            avatarY.set(Math.round(studyAbroadMapDockY.current));
                            avatarScale.set(studyAbroadMapDockScale.current);
                          }

                          // Check if we should move to scholarship-programs (when scrolling down from study-abroad-map)
                          const studyAbroadMapDockScroll = studyAbroadMapDockScrollY.current ?? scrollYValue;
                          const scrollDeltaFromStudyAbroadMap = scrollYValue - studyAbroadMapDockScroll;

                          // Calculate gap between avatar and header to determine when to start movement
                          // Use the natural (unclamped) position to detect when gap is 40px or less
                          const headerHeightForGap = getHeaderHeight();
                          const headerBottomForGap = headerHeightForGap;
                          const avatarBaseSizeForGap = 48;
                          const currentAvatarScaleForGap = studyAbroadMapDockScale.current ?? (68 / 48);
                          const avatarHalfHeightForGap = (avatarBaseSizeForGap * currentAvatarScaleForGap) / 2;
                          // Get the natural position of study-abroad-map (before clamping for 50px gap)
                          const studyAbroadMapElForGap = document.getElementById('study-abroad-map');
                          let gapToHeaderFromStudyAbroadMap = 1000; // Default large value if element not found
                          if (studyAbroadMapElForGap) {
                            const studyAbroadMapRectForGap = studyAbroadMapElForGap.getBoundingClientRect();
                            const studyAbroadMapCenterYNatural = studyAbroadMapRectForGap.top + studyAbroadMapRectForGap.height / 2;
                            const avatarTopAtStudyAbroadMapNatural = studyAbroadMapCenterYNatural - avatarHalfHeightForGap;
                            gapToHeaderFromStudyAbroadMap = avatarTopAtStudyAbroadMapNatural - headerBottomForGap;
                          }

                          // Handle reverse movement when scrolling up from scholarship-programs back to study-abroad-map
                          if (isDockedAtScholarshipPathGreenIcon && scholarshipPathGreenIconDockScrollY.current !== null) {
                            const scholarshipPathGreenIconDockScroll = scholarshipPathGreenIconDockScrollY.current;
                            const scrollDeltaFromScholarshipPathGreenIcon = scrollYValue - scholarshipPathGreenIconDockScroll;

                            // If scrolling up (negative delta), start reverse diagonal movement
                            if (scrollDeltaFromScholarshipPathGreenIcon < 0) {
                              // Initialize reverse movement start positions on first scroll up
                              if (scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current === null) {
                                scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current = scrollYValue;
                                scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current = avatarY.get();
                                scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current = avatarX.get();
                              }

                              // Use stored dock positions to ensure reverse path matches forward path exactly
                              if (scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current !== null && scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current !== null) {
                                // Use stored dock positions (same as forward movement) to ensure exact path match
                                let startX: number;
                                let startY: number;
                                let endX: number;
                                let endY: number;

                                // Start position: scholarship-programs dock position (use stored position for consistency)
                                if (scholarshipPathGreenIconDockX.current !== null && scholarshipPathGreenIconDockY.current !== null) {
                                  startX = scholarshipPathGreenIconDockX.current;
                                  startY = scholarshipPathGreenIconDockY.current;
                                } else {
                                  // Fallback: use reverse start position
                                  startX = scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current;
                                  startY = scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current;
                                }

                                // End position: study-abroad-map dock position (use stored position for consistency)
                                if (studyAbroadMapDockX.current !== null && studyAbroadMapDockY.current !== null) {
                                  endX = studyAbroadMapDockX.current;
                                  endY = studyAbroadMapDockY.current;
                                } else {
                                  // Fallback: calculate from element
                                  const studyAbroadMapElForReverse = document.getElementById('study-abroad-map');
                                  if (studyAbroadMapElForReverse) {
                                    const studyAbroadMapRectForReverse = studyAbroadMapElForReverse.getBoundingClientRect();
                                    endX = studyAbroadMapRectForReverse.left + studyAbroadMapRectForReverse.width / 2;
                                    endY = studyAbroadMapRectForReverse.top + studyAbroadMapRectForReverse.height / 2;
                                  } else {
                                    return; // Can't determine end position, exit early
                                  }
                                }

                                // Calculate reverse progress based on scroll distance
                                const reverseStartScroll = scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current;
                                const scrollUpDistance = Math.max(0, reverseStartScroll - scrollYValue);

                                // Use actual distance between start and end positions (same calculation as forward movement)
                                const distanceX = Math.abs(endX - startX);
                                const distanceY = Math.abs(endY - startY);
                                const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                                // Require more scroll distance for slower, smoother reverse movement (same as forward)
                                const maxReverseDistance = Math.max(600, totalDistance * 3);
                                const rawProgress = Math.min(1, scrollUpDistance / maxReverseDistance);

                                // Apply easing function
                                const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                                const reverseProgress = easeOutCubic(rawProgress);

                                // Linear interpolation in reverse direction
                                const currentX = startX + (endX - startX) * reverseProgress;
                                const currentY = startY + (endY - startY) * reverseProgress;

                                // Calculate scale interpolation (scale when moving back to study-abroad-map)
                                const avatarBaseSize = 48;
                                let startScale = 68 / 48; // Default scholarship-programs scale (68px, 2x base size)
                                if (scholarshipPathGreenIconDockScale.current !== null) {
                                  startScale = scholarshipPathGreenIconDockScale.current;
                                }
                                let endScale = 68 / 48; // Default study-abroad-map scale (68px, 2x base size - reduced)
                                if (studyAbroadMapDockScale.current !== null) {
                                  endScale = studyAbroadMapDockScale.current;
                                }
                                const currentScale = startScale + (endScale - startScale) * reverseProgress;

                                avatarX.set(Math.round(currentX));
                                avatarY.set(Math.round(currentY));
                                avatarScale.set(currentScale);

                                // If we've reached study-abroad-map (progress >= 0.98), reset to study-abroad-map dock state
                                if (reverseProgress >= 0.98) {
                                  setIsDockedAtScholarshipPathGreenIcon(false);
                                  setIsMovingToScholarshipPathGreenIcon(false);
                                  scholarshipPathGreenIconDockScrollY.current = null;
                                  scholarshipPathGreenIconDockY.current = null;
                                  scholarshipPathGreenIconDockX.current = null;
                                  scholarshipPathGreenIconDockScale.current = null;
                                  scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current = null;
                                  scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current = null;
                                  scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current = null;
                                  scholarshipPathGreenIconMovementStartScrollY.current = null;
                                  scholarshipPathGreenIconMovementStartY.current = null;
                                  scholarshipPathGreenIconMovementStartX.current = null;
                                }
                                return; // Exit early during reverse movement
                              }
                            } else {
                              // Scrolling down, reset reverse movement if it was active
                              if (scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current !== null) {
                                scholarshipPathGreenIconToStudyAbroadMapReverseStartScrollY.current = null;
                                scholarshipPathGreenIconToStudyAbroadMapReverseStartY.current = null;
                                scholarshipPathGreenIconToStudyAbroadMapReverseStartX.current = null;
                              }
                            }
                          }

                          // If we're moving to scholarship-programs, calculate progress and animate
                          if (isMovingToScholarshipPathGreenIcon && scholarshipPathGreenIconMovementStartScrollY.current !== null && scholarshipPathGreenIconMovementStartY.current !== null && scholarshipPathGreenIconMovementStartX.current !== null) {
                            // If scrolling up during movement, reset movement state
                            const movementStartScroll = scholarshipPathGreenIconMovementStartScrollY.current;
                            if (scrollYValue < movementStartScroll) {
                              setIsMovingToScholarshipPathGreenIcon(false);
                              scholarshipPathGreenIconMovementStartScrollY.current = null;
                              scholarshipPathGreenIconMovementStartY.current = null;
                              scholarshipPathGreenIconMovementStartX.current = null;
                              return; // Exit early, avatar will continue following study-abroad-map
                            }

                            const scholarshipPathGreenIconEl = document.getElementById('scholarship-programs');
                            if (scholarshipPathGreenIconEl) {
                              const scholarshipPathGreenIconRect = scholarshipPathGreenIconEl.getBoundingClientRect();
                              const targetX = scholarshipPathGreenIconRect.left + scholarshipPathGreenIconRect.width / 2 + 160; // 160px right from center
                              const targetY = scholarshipPathGreenIconRect.top + scholarshipPathGreenIconRect.height / 2 + 20; // 20px down from center

                              // Calculate movement progress based on scroll distance
                              const startX = scholarshipPathGreenIconMovementStartX.current;
                              const startY = scholarshipPathGreenIconMovementStartY.current;
                              const distanceX = Math.abs(targetX - startX);
                              const distanceY = Math.abs(targetY - startY);
                              const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                              // Require more scroll distance for slower, smoother movement
                              const maxScrollDistance = Math.max(600, totalDistance * 3);
                              const scrollDownDistance = Math.max(0, scrollYValue - movementStartScroll);
                              const rawProgress = Math.min(1, scrollDownDistance / maxScrollDistance);

                              // Apply easing function
                              const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                              const progress = easeOutCubic(rawProgress);

                              // Diagonal movement: interpolate from study-abroad-map position to scholarship-programs
                              const currentX = startX + (targetX - startX) * progress;
                              const currentY = startY + (targetY - startY) * progress;

                              // Scale when moving from study-abroad-map to scholarship-programs (same size maintained)
                              let startScale = 68 / 48; // Default study-abroad-map scale (68px, 2x base size - reduced)
                              if (studyAbroadMapDockScale.current !== null) {
                                startScale = studyAbroadMapDockScale.current;
                              }
                              const endScale = 68 / 48; // Scale at scholarship-programs (68px, 2x base size)
                              const currentScale = startScale + (endScale - startScale) * progress;

                              // Maintain 50px gap from header during forward movement
                              const headerHeight = getHeaderHeight();
                              const headerBottom = headerHeight;
                              const avatarHalfHeight = (48 * currentScale) / 2;
                              const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                              const clampedY = Math.max(currentY, minAvatarY);

                              avatarX.set(Math.round(currentX));
                              avatarY.set(Math.round(clampedY));
                              avatarScale.set(currentScale);

                              // Check if we've reached the dock point
                              if (progress >= 0.98) {
                                setIsMovingToScholarshipPathGreenIcon(false);
                                setIsDockedAtScholarshipPathGreenIcon(true);
                                scholarshipPathGreenIconDockScrollY.current = scrollYValue;

                                // Calculate final dock position with gap maintenance
                                const finalAvatarHalfHeight = (48 * endScale) / 2;
                                const finalMinAvatarY = headerBottom + 50 + finalAvatarHalfHeight;
                                const clampedTargetY = Math.max(targetY, finalMinAvatarY);

                                scholarshipPathGreenIconDockX.current = targetX;
                                scholarshipPathGreenIconDockY.current = clampedTargetY;
                                scholarshipPathGreenIconDockScale.current = endScale;

                                // Set final position with gap maintenance
                                avatarX.set(Math.round(targetX));
                                avatarY.set(Math.round(clampedTargetY));
                                avatarScale.set(endScale);
                              }
                              return; // Exit early during movement
                            } else {
                              // If scholarship-programs element not found, reset movement
                              setIsMovingToScholarshipPathGreenIcon(false);
                              scholarshipPathGreenIconMovementStartScrollY.current = null;
                              scholarshipPathGreenIconMovementStartY.current = null;
                              scholarshipPathGreenIconMovementStartX.current = null;
                            }
                            return; // Exit early if moving
                          }

                          // If scrolling down from study-abroad-map, start movement to scholarship-programs only when gap <= 40px
                          if (scrollDeltaFromStudyAbroadMap > 0 && gapToHeaderFromStudyAbroadMap <= 40 && !isMovingToScholarshipPathGreenIcon && !isDockedAtScholarshipPathGreenIcon) {
                            // Initialize movement to scholarship-programs
                            if (scholarshipPathGreenIconMovementStartScrollY.current === null) {
                              scholarshipPathGreenIconMovementStartScrollY.current = scrollYValue;
                              scholarshipPathGreenIconMovementStartY.current = avatarY.get();
                              scholarshipPathGreenIconMovementStartX.current = avatarX.get();
                              setIsMovingToScholarshipPathGreenIcon(true);
                            }
                            return; // Exit early, movement will be handled on next frame
                          }

                          return; // Docked at study-abroad-map - no further movement
                        }

                        // FINAL DOCKING POINT: Check if already docked at scholarship-programs - keep avatar fixed at scholarship-programs
                        // This is the final docking point - avatar should stay here and not move to other sections
                        // NO gap maintenance - avatar stays fixed, header moves over it when scrolling down
                        if (isDockedAtScholarshipPathGreenIcon && scholarshipPathGreenIconDockX.current !== null && scholarshipPathGreenIconDockY.current !== null && scholarshipPathGreenIconDockScale.current !== null) {
                          // Get scholarship-programs element to follow its position
                          const scholarshipPathGreenIconEl = document.getElementById('scholarship-programs');
                          if (scholarshipPathGreenIconEl) {
                            const scholarshipPathGreenIconRect = scholarshipPathGreenIconEl.getBoundingClientRect();
                            const scholarshipPathGreenIconCenterX = scholarshipPathGreenIconRect.left + scholarshipPathGreenIconRect.width / 2 + 160; // 160px right from center
                            const scholarshipPathGreenIconCenterY = scholarshipPathGreenIconRect.top + scholarshipPathGreenIconRect.height / 2 + 20; // 20px down from center

                            // NO gap maintenance - avatar stays at element position, header can move over it
                            // Update stored positions to follow the element (NO gap maintenance for final docking point)
                            scholarshipPathGreenIconDockX.current = scholarshipPathGreenIconCenterX;
                            scholarshipPathGreenIconDockY.current = scholarshipPathGreenIconCenterY;

                            // Set avatar to docked position at scholarship-programs (no gap maintenance - final docking point)
                            // This is the final position - avatar should not move from here, header moves over it
                            avatarX.set(Math.round(scholarshipPathGreenIconCenterX));
                            avatarY.set(Math.round(scholarshipPathGreenIconCenterY));
                            avatarScale.set(scholarshipPathGreenIconDockScale.current);
                          } else {
                            // Fallback: use stored position (NO gap maintenance)
                            avatarX.set(Math.round(scholarshipPathGreenIconDockX.current));
                            avatarY.set(Math.round(scholarshipPathGreenIconDockY.current));
                            avatarScale.set(scholarshipPathGreenIconDockScale.current);
                          }
                          return; // FINAL DOCKING POINT - Docked at scholarship-programs - no further movement to other sections
                        }

                        // If scrolling down from global-education, start movement to study-abroad-map only when gap <= 40px
                        if (scrollDeltaFromGlobalEducation > 0 && gapToHeaderFromGlobalEducation <= 40 && !isMovingToStudyAbroadMap && !isDockedAtStudyAbroadMap) {
                          // Initialize movement to study-abroad-map
                          if (studyAbroadMapMovementStartScrollY.current === null) {
                            studyAbroadMapMovementStartScrollY.current = scrollYValue;
                            studyAbroadMapMovementStartY.current = avatarY.get();
                            studyAbroadMapMovementStartX.current = avatarX.get();
                            setIsMovingToStudyAbroadMap(true);
                          }
                        }

                        // If we're moving to study-abroad-map, calculate progress and animate
                        if (isMovingToStudyAbroadMap && studyAbroadMapMovementStartScrollY.current !== null && studyAbroadMapMovementStartY.current !== null && studyAbroadMapMovementStartX.current !== null) {
                          // If scrolling up during movement, reset movement state
                          const movementStartScroll = studyAbroadMapMovementStartScrollY.current;
                          if (scrollYValue < movementStartScroll) {
                            setIsMovingToStudyAbroadMap(false);
                            studyAbroadMapMovementStartScrollY.current = null;
                            studyAbroadMapMovementStartY.current = null;
                            studyAbroadMapMovementStartX.current = null;
                            return; // Exit early, avatar will continue following global-education
                          }

                          const studyAbroadMapEl = document.getElementById('study-abroad-map');
                          if (studyAbroadMapEl) {
                            const studyAbroadMapRect = studyAbroadMapEl.getBoundingClientRect();
                            const targetX = studyAbroadMapRect.left + studyAbroadMapRect.width / 2;
                            const targetY = studyAbroadMapRect.top + studyAbroadMapRect.height / 2;

                            // Calculate movement progress based on scroll distance
                            const startX = studyAbroadMapMovementStartX.current;
                            const startY = studyAbroadMapMovementStartY.current;
                            const distanceX = Math.abs(targetX - startX);
                            const distanceY = Math.abs(targetY - startY);
                            const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                            // Require more scroll distance for slower, smoother movement
                            const maxScrollDistance = Math.max(600, totalDistance * 3);
                            const scrollDownDistance = Math.max(0, scrollYValue - movementStartScroll);
                            const rawProgress = Math.min(1, scrollDownDistance / maxScrollDistance);

                            // Apply easing function
                            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                            const progress = easeOutCubic(rawProgress);

                            // Diagonal movement: interpolate from global-education position to study-abroad-map
                            const currentX = startX + (targetX - startX) * progress;
                            const currentY = startY + (targetY - startY) * progress;

                            // Scale from global-education size to study-abroad-map (reduced size)
                            let startScale = 68 / 48; // Default global-education scale (68px, double size)
                            if (globalEducationDockScale.current !== null) {
                              startScale = globalEducationDockScale.current;
                            }
                            const endScale = 68 / 48; // Scale at study-abroad-map (68px, 2x base size - reduced)
                            const currentScale = startScale + (endScale - startScale) * progress;

                            // Maintain 50px gap from header during forward movement
                            const headerHeight = getHeaderHeight();
                            const headerBottom = headerHeight;
                            const avatarHalfHeight = (48 * currentScale) / 2;
                            const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                            const clampedY = Math.max(currentY, minAvatarY);

                            avatarX.set(Math.round(currentX));
                            avatarY.set(Math.round(clampedY));
                            avatarScale.set(currentScale);

                            // Check if we've reached the dock point
                            if (progress >= 0.98) {
                              // Maintain 50px gap from header when docking completes
                              const avatarHalfHeightAtDock = (48 * endScale) / 2;
                              const minAvatarYAtDock = headerBottom + 50 + avatarHalfHeightAtDock;
                              const finalY = Math.max(targetY, minAvatarYAtDock);

                              setIsMovingToStudyAbroadMap(false);
                              setIsDockedAtStudyAbroadMap(true);
                              studyAbroadMapDockScrollY.current = scrollYValue;
                              studyAbroadMapDockX.current = targetX;
                              studyAbroadMapDockY.current = finalY;
                              studyAbroadMapDockScale.current = endScale;

                              // Set final position with gap maintenance
                              avatarX.set(Math.round(targetX));
                              avatarY.set(Math.round(finalY));
                              avatarScale.set(endScale);

                              // Trigger green pulsing effect for 1 second
                              setShouldPulseGreenAtStudyAbroadMap(true);
                              setTimeout(() => {
                                setShouldPulseGreenAtStudyAbroadMap(false);
                              }, 1000);
                            }
                            return; // Exit early during movement
                          } else {
                            // If study-abroad-map element not found, reset movement
                            setIsMovingToStudyAbroadMap(false);
                            studyAbroadMapMovementStartScrollY.current = null;
                            studyAbroadMapMovementStartY.current = null;
                            studyAbroadMapMovementStartX.current = null;
                          }
                        }

                        return; // Docked at global-education - no further movement
                      }

                      // If scrolling down from why-choose-our-mentoring-program, start movement to global-education only when gap <= 40px
                      if (scrollDeltaFromScholarshipsLoans > 0 && gapToHeaderFromScholarshipsLoans <= 40 && !isMovingToGlobalEducation && !isDockedAtGlobalEducation) {
                        // Initialize movement to global-education
                        if (globalEducationMovementStartScrollY.current === null) {
                          globalEducationMovementStartScrollY.current = scrollYValue;
                          globalEducationMovementStartY.current = avatarY.get();
                          globalEducationMovementStartX.current = avatarX.get();
                          setIsMovingToGlobalEducation(true);
                        }
                      }

                      // If we're moving to global-education, calculate progress and animate
                      if (isMovingToGlobalEducation && globalEducationMovementStartScrollY.current !== null && globalEducationMovementStartY.current !== null && globalEducationMovementStartX.current !== null) {
                        // If scrolling up during movement, reset movement state
                        const movementStartScroll = globalEducationMovementStartScrollY.current;
                        if (scrollYValue < movementStartScroll) {
                          setIsMovingToGlobalEducation(false);
                          globalEducationMovementStartScrollY.current = null;
                          globalEducationMovementStartY.current = null;
                          globalEducationMovementStartX.current = null;
                          return; // Exit early, avatar will continue following why-choose-our-mentoring-program
                        }

                        const globalEducationEl = document.getElementById('global-education');
                        if (globalEducationEl) {
                          const globalEducationRect = globalEducationEl.getBoundingClientRect();
                          const targetX = globalEducationRect.left + globalEducationRect.width / 2 + 140; // 80px right from center
                          const targetY = globalEducationRect.top + globalEducationRect.height / 2 + 20;

                          // Calculate movement progress based on scroll distance
                          const startX = globalEducationMovementStartX.current;
                          const startY = globalEducationMovementStartY.current;
                          const distanceX = Math.abs(targetX - startX);
                          const distanceY = Math.abs(targetY - startY);
                          const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                          // Require more scroll distance for slower, smoother movement
                          const maxScrollDistance = Math.max(600, totalDistance * 3);
                          const scrollDownDistance = Math.max(0, scrollYValue - movementStartScroll);
                          const rawProgress = Math.min(1, scrollDownDistance / maxScrollDistance);

                          // Apply easing function
                          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                          const progress = easeOutCubic(rawProgress);

                          // Diagonal movement: interpolate from why-choose-our-mentoring-program position to global-education
                          const currentX = startX + (targetX - startX) * progress;
                          const currentY = startY + (targetY - startY) * progress;

                          // Keep scale at double size (68px, same as why-choose-our-mentoring-program)
                          const startScale = 68 / 48; // Current size at why-choose-our-mentoring-program (68px, double size)
                          const endScale = 68 / 48; // Keep double size at global-education
                          const currentScale = startScale + (endScale - startScale) * progress;

                          // Maintain 50px gap from header during forward movement
                          const headerHeight = getHeaderHeight();
                          const headerBottom = headerHeight;
                          const avatarHalfHeight = (48 * currentScale) / 2;
                          const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                          let clampedY = Math.max(currentY, minAvatarY);

                          // Check for news banner collision during movement - maintain 45px gap
                          const newsBannerEl = document.getElementById('news-banner');
                          if (newsBannerEl) {
                            const newsBannerRect = newsBannerEl.getBoundingClientRect();
                            const newsBannerTop = newsBannerRect.top;

                            // Calculate avatar bottom position (current Y + half of scaled avatar height)
                            const avatarBaseHeight = 48; // Base avatar height
                            const scaledAvatarHeight = avatarBaseHeight * currentScale;
                            const scaledAvatarHalfHeight = scaledAvatarHeight / 2;
                            const avatarBottom = clampedY + scaledAvatarHalfHeight;

                            // Calculate gap between avatar bottom and news banner top
                            const gap = newsBannerTop - avatarBottom;
                            const requiredGap = 45; // Maintain 45px gap from news banner

                            // If gap is less than required, adjust Y position upward
                            if (gap < requiredGap) {
                              const targetAvatarBottom = newsBannerTop - requiredGap;
                              clampedY = targetAvatarBottom - scaledAvatarHalfHeight;
                            }
                          }

                          avatarX.set(Math.round(currentX));
                          avatarY.set(Math.round(clampedY));
                          avatarScale.set(currentScale);

                          // Check if we've reached the dock point
                          if (progress >= 0.98) {
                            // Maintain 50px gap from header when docking completes
                            const avatarHalfHeightAtDock = (48 * endScale) / 2;
                            const minAvatarYAtDock = headerBottom + 50 + avatarHalfHeightAtDock;
                            let finalY = Math.max(targetY, minAvatarYAtDock);

                            // Check for news banner collision when docking - maintain 45px gap
                            const newsBannerEl = document.getElementById('news-banner');
                            if (newsBannerEl) {
                              const newsBannerRect = newsBannerEl.getBoundingClientRect();
                              const newsBannerTop = newsBannerRect.top;

                              // Calculate avatar bottom position (current Y + half of scaled avatar height)
                              const avatarBaseHeight = 48; // Base avatar height
                              const scaledAvatarHeight = avatarBaseHeight * endScale;
                              const scaledAvatarHalfHeight = scaledAvatarHeight / 2;
                              const avatarBottom = finalY + scaledAvatarHalfHeight;

                              // Calculate gap between avatar bottom and news banner top
                              const gap = newsBannerTop - avatarBottom;
                              const requiredGap = 45; // Maintain 45px gap from news banner

                              // If gap is less than required, adjust Y position upward
                              if (gap < requiredGap) {
                                const targetAvatarBottom = newsBannerTop - requiredGap;
                                finalY = targetAvatarBottom - scaledAvatarHalfHeight;
                              }
                            }

                            setIsMovingToGlobalEducation(false);
                            setIsDockedAtGlobalEducation(true);
                            globalEducationDockScrollY.current = scrollYValue;
                            globalEducationDockX.current = targetX;
                            globalEducationDockY.current = finalY;
                            globalEducationDockScale.current = endScale;

                            // Set final position with gap maintenance
                            avatarX.set(Math.round(targetX));
                            avatarY.set(Math.round(finalY));
                            avatarScale.set(endScale);
                          }
                          return; // Exit early during movement
                        } else {
                          // If global-education element not found, reset movement
                          setIsMovingToGlobalEducation(false);
                          globalEducationMovementStartScrollY.current = null;
                          globalEducationMovementStartY.current = null;
                          globalEducationMovementStartX.current = null;
                        }
                      }

                      return; // Docked at why-choose-our-mentoring-program - no further movement
                    }

                    // If scrolling down from partners-section, start movement to why-choose-our-mentoring-program only when gap <= 40px
                    if (scrollDeltaFromPartners > 0 && gapToHeaderFromPartners <= 40 && !isMovingToScholarshipsLoans && !isDockedAtScholarshipsLoans) {
                      // Initialize movement to why-choose-our-mentoring-program
                      if (scholarshipsLoansMovementStartScrollY.current === null) {
                        scholarshipsLoansMovementStartScrollY.current = scrollYValue;
                        scholarshipsLoansMovementStartY.current = avatarY.get();
                        scholarshipsLoansMovementStartX.current = avatarX.get();
                        setIsMovingToScholarshipsLoans(true);
                      }
                    }

                    // If we're moving to why-choose-our-mentoring-program, calculate progress and animate
                    if (isMovingToScholarshipsLoans && scholarshipsLoansMovementStartScrollY.current !== null && scholarshipsLoansMovementStartY.current !== null && scholarshipsLoansMovementStartX.current !== null) {
                      // If scrolling up during movement, reset movement state
                      const movementStartScroll = scholarshipsLoansMovementStartScrollY.current;
                      if (scrollYValue < movementStartScroll) {
                        setIsMovingToScholarshipsLoans(false);
                        scholarshipsLoansMovementStartScrollY.current = null;
                        scholarshipsLoansMovementStartY.current = null;
                        scholarshipsLoansMovementStartX.current = null;
                        return; // Exit early, avatar will continue following partners-section
                      }

                      const scholarshipsLoansEl = document.getElementById('why-choose-our-mentoring-program');
                      if (scholarshipsLoansEl) {
                        const scholarshipsLoansRect = scholarshipsLoansEl.getBoundingClientRect();
                        const targetX = scholarshipsLoansRect.left + scholarshipsLoansRect.width / 2 - 200; // 100px left from center
                        const targetY = scholarshipsLoansRect.top + scholarshipsLoansRect.height / 2 + 20; // 20px down from center

                        // Calculate movement progress based on scroll distance
                        const startX = scholarshipsLoansMovementStartX.current;
                        const startY = scholarshipsLoansMovementStartY.current;
                        const distanceX = Math.abs(targetX - startX);
                        const distanceY = Math.abs(targetY - startY);
                        const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                        // Require more scroll distance for slower, smoother movement
                        const maxScrollDistance = Math.max(600, totalDistance * 3);
                        const scrollDownDistance = Math.max(0, scrollYValue - movementStartScroll);
                        const rawProgress = Math.min(1, scrollDownDistance / maxScrollDistance);

                        // Apply easing function
                        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                        const progress = easeOutCubic(rawProgress);

                        // Diagonal movement: interpolate from partners-section position to why-choose-our-mentoring-program
                        const currentX = startX + (targetX - startX) * progress;
                        const currentY = startY + (targetY - startY) * progress;

                        // Keep scale at double size (68px, same as partners-section)
                        const startScale = 68 / 48; // Current size at partners-section (68px, double size)
                        const endScale = 68 / 48; // Keep double size at why-choose-our-mentoring-program
                        const currentScale = startScale + (endScale - startScale) * progress;

                        // Maintain 50px gap from header during forward movement
                        const headerHeight = getHeaderHeight();
                        const headerBottom = headerHeight;
                        const avatarHalfHeight = (48 * currentScale) / 2;
                        const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                        const clampedY = Math.max(currentY, minAvatarY);

                        avatarX.set(Math.round(currentX));
                        avatarY.set(Math.round(clampedY));
                        avatarScale.set(currentScale);

                        // Check if we've reached the dock point
                        if (progress >= 0.98) {
                          // Maintain 50px gap from header when docking completes
                          const avatarHalfHeightAtDock = (48 * endScale) / 2;
                          const minAvatarYAtDock = headerBottom + 50 + avatarHalfHeightAtDock;
                          const finalY = Math.max(targetY, minAvatarYAtDock);

                          setIsMovingToScholarshipsLoans(false);
                          setIsDockedAtScholarshipsLoans(true);
                          scholarshipsLoansDockScrollY.current = scrollYValue;
                          scholarshipsLoansDockX.current = targetX;
                          scholarshipsLoansDockY.current = finalY;
                          scholarshipsLoansDockScale.current = endScale;

                          // Set final position with gap maintenance
                          avatarX.set(Math.round(targetX));
                          avatarY.set(Math.round(finalY));
                          avatarScale.set(endScale);
                        }
                        return; // Exit early during movement
                      } else {
                        // If why-choose-our-mentoring-program element not found, reset movement
                        setIsMovingToScholarshipsLoans(false);
                        scholarshipsLoansMovementStartScrollY.current = null;
                        scholarshipsLoansMovementStartY.current = null;
                        scholarshipsLoansMovementStartX.current = null;
                      }
                    }

                    return; // Docked at partners-section - no further movement
                  }

                  // If scrolling down from tools-smart-solutions, start movement to partners-section only when gap <= 40px
                  if (scrollDeltaFromTools > 0 && gapToHeader <= 40 && !isMovingToPartnersSection && !isDockedAtPartnersSection) {
                    // Initialize movement to partners-section
                    if (partnersSectionMovementStartScrollY.current === null) {
                      partnersSectionMovementStartScrollY.current = scrollYValue;
                      partnersSectionMovementStartY.current = avatarY.get();
                      partnersSectionMovementStartX.current = avatarX.get();
                      setIsMovingToPartnersSection(true);
                    }
                  }

                  // If we're moving to partners-section, calculate progress and animate
                  if (isMovingToPartnersSection && partnersSectionMovementStartScrollY.current !== null && partnersSectionMovementStartY.current !== null && partnersSectionMovementStartX.current !== null) {
                    // If scrolling up during movement, reset movement state
                    const movementStartScroll = partnersSectionMovementStartScrollY.current;
                    if (scrollYValue < movementStartScroll) {
                      setIsMovingToPartnersSection(false);
                      partnersSectionMovementStartScrollY.current = null;
                      partnersSectionMovementStartY.current = null;
                      partnersSectionMovementStartX.current = null;
                      return; // Exit early, avatar will continue following tools-smart-solutions
                    }

                    const partnersSectionEl = document.getElementById('partners-section');
                    if (partnersSectionEl) {
                      const partnersRect = partnersSectionEl.getBoundingClientRect();
                      const targetX = partnersRect.left + partnersRect.width / 2 + 180; // 100px right from center
                      const targetY = partnersRect.top + partnersRect.height / 2 + 20; // 20px down from center

                      // Calculate movement progress based on scroll distance
                      const startX = partnersSectionMovementStartX.current;
                      const startY = partnersSectionMovementStartY.current;
                      const distanceX = Math.abs(targetX - startX);
                      const distanceY = Math.abs(targetY - startY);
                      const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                      // Require more scroll distance for slower, smoother movement
                      const maxScrollDistance = Math.max(600, totalDistance * 3);
                      const scrollDownDistance = Math.max(0, scrollYValue - movementStartScroll);
                      const rawProgress = Math.min(1, scrollDownDistance / maxScrollDistance);

                      // Apply easing function
                      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                      const progress = easeOutCubic(rawProgress);

                      // Diagonal movement: interpolate from tools-smart-solutions position to partners-section
                      const currentX = startX + (targetX - startX) * progress;
                      const currentY = startY + (targetY - startY) * progress;

                      // Scale up from 34px (tools-smart-solutions) to double size (68px) during movement
                      const startScale = 34 / 48; // Current size at tools-smart-solutions (34px)
                      const endScale = (34 / 48) * 2; // Double the size (68px)
                      const currentScale = startScale + (endScale - startScale) * progress;

                      // Maintain 50px gap from header during forward movement
                      const headerHeight = getHeaderHeight();
                      const headerBottom = headerHeight;
                      const avatarHalfHeight = (48 * currentScale) / 2;
                      const minAvatarY = headerBottom + 50 + avatarHalfHeight;
                      let clampedY = Math.max(currentY, minAvatarY);

                      // Check for news banner collision during movement - maintain 50px gap
                      const newsBannerEl = document.getElementById('news-banner');
                      if (newsBannerEl) {
                        const newsBannerRect = newsBannerEl.getBoundingClientRect();
                        const newsBannerTop = newsBannerRect.top;

                        // Calculate avatar bottom position (current Y + half of scaled avatar height)
                        const avatarBaseHeight = 48; // Base avatar height
                        const scaledAvatarHeight = avatarBaseHeight * currentScale;
                        const scaledAvatarHalfHeight = scaledAvatarHeight / 2;
                        const avatarBottom = clampedY + scaledAvatarHalfHeight;

                        // Calculate gap between avatar bottom and news banner top
                        const gap = newsBannerTop - avatarBottom;
                        const requiredGap = 50; // Maintain 50px gap from news banner

                        // If gap is less than required, adjust Y position upward
                        if (gap < requiredGap) {
                          const targetAvatarBottom = newsBannerTop - requiredGap;
                          clampedY = targetAvatarBottom - scaledAvatarHalfHeight;
                        }
                      }

                      avatarX.set(Math.round(currentX));
                      avatarY.set(Math.round(clampedY));
                      avatarScale.set(currentScale);

                      // Check if we've reached the dock point
                      if (progress >= 0.98) {
                        // Maintain 50px gap from header when docking completes
                        const avatarHalfHeightAtDock = (48 * endScale) / 2;
                        const minAvatarYAtDock = headerBottom + 50 + avatarHalfHeightAtDock;
                        let finalY = Math.max(targetY, minAvatarYAtDock);

                        // Check for news banner collision when docking - maintain 50px gap
                        const newsBannerEl = document.getElementById('news-banner');
                        if (newsBannerEl) {
                          const newsBannerRect = newsBannerEl.getBoundingClientRect();
                          const newsBannerTop = newsBannerRect.top;

                          // Calculate avatar bottom position (current Y + half of scaled avatar height)
                          const avatarBaseHeight = 48; // Base avatar height
                          const scaledAvatarHeight = avatarBaseHeight * endScale;
                          const scaledAvatarHalfHeight = scaledAvatarHeight / 2;
                          const avatarBottom = finalY + scaledAvatarHalfHeight;

                          // Calculate gap between avatar bottom and news banner top
                          const gap = newsBannerTop - avatarBottom;
                          const requiredGap = 50; // Maintain 50px gap from news banner

                          // If gap is less than required, adjust Y position upward
                          if (gap < requiredGap) {
                            const targetAvatarBottom = newsBannerTop - requiredGap;
                            finalY = targetAvatarBottom - scaledAvatarHalfHeight;
                          }
                        }

                        setIsMovingToPartnersSection(false);
                        setIsDockedAtPartnersSection(true);
                        partnersSectionDockScrollY.current = scrollYValue;
                        partnersSectionDockX.current = targetX;
                        partnersSectionDockY.current = finalY;
                        partnersSectionDockScale.current = endScale;

                        // Set final position with gap maintenance
                        avatarX.set(Math.round(targetX));
                        avatarY.set(Math.round(finalY));
                        avatarScale.set(endScale);
                      }
                      return; // Exit early during movement
                    } else {
                      // If partners-section element not found, reset movement
                      setIsMovingToPartnersSection(false);
                      partnersSectionMovementStartScrollY.current = null;
                      partnersSectionMovementStartY.current = null;
                      partnersSectionMovementStartX.current = null;
                    }
                  }

                  return; // Docked at tools-smart-solutions - no further movement
                }

                // Check for 40px gap between avatar and header - if gap is 40px or less, start movement to tools-smart-solutions
                const avatarHalfHeightAtCircle = (avatarBaseSize * currentTargetScale) / 2;
                const avatarTopAtCircle = circleCenterY - avatarHalfHeightAtCircle;
                const gapToHeader = avatarTopAtCircle - headerBottom;

                // Reset movement state if in inconsistent state (start scroll set but not moving)
                if (toolsSmartSolutionsMovementStartScrollY.current !== null && !isMovingToToolsSmartSolutions && !isDockedAtToolsSmartSolutions) {
                  toolsSmartSolutionsMovementStartScrollY.current = null;
                  toolsSmartSolutionsMovementStartY.current = null;
                  toolsSmartSolutionsMovementStartX.current = null;
                }

                // If scrolling down and gap is 40px or less, start movement to tools-smart-solutions
                if (examCircleScrollDelta > 0 && gapToHeader <= 40 && !isMovingToToolsSmartSolutions && !isDockedAtToolsSmartSolutions) {
                  // Initialize movement to tools-smart-solutions
                  if (toolsSmartSolutionsMovementStartScrollY.current === null) {
                    toolsSmartSolutionsMovementStartScrollY.current = scrollYValue;
                    toolsSmartSolutionsMovementStartY.current = circleCenterY;
                    toolsSmartSolutionsMovementStartX.current = circleCenterX;
                    setIsMovingToToolsSmartSolutions(true);
                  }
                }

                // If we're moving to tools-smart-solutions, calculate progress and animate
                if (isMovingToToolsSmartSolutions && toolsSmartSolutionsMovementStartScrollY.current !== null && toolsSmartSolutionsMovementStartY.current !== null && toolsSmartSolutionsMovementStartX.current !== null) {
                  // If scrolling up during movement, reset movement state
                  const movementStartScroll = toolsSmartSolutionsMovementStartScrollY.current;
                  if (scrollYValue < movementStartScroll) {
                    setIsMovingToToolsSmartSolutions(false);
                    toolsSmartSolutionsMovementStartScrollY.current = null;
                    toolsSmartSolutionsMovementStartY.current = null;
                    toolsSmartSolutionsMovementStartX.current = null;
                    return; // Exit early, avatar will continue following exam-circle
                  }

                  const toolsSmartSolutionsEl = document.getElementById('tools-smart-solutions');
                  if (toolsSmartSolutionsEl) {
                    const toolsRect = toolsSmartSolutionsEl.getBoundingClientRect();
                    const targetX = toolsRect.left + toolsRect.width / 2 - 60; // 30px left from center
                    const targetY = toolsRect.top + toolsRect.height / 2 + 20; // 10px down from center

                    // Calculate movement progress based on scroll distance
                    // Use actual distance between start and end positions to determine scroll distance needed
                    const startX = toolsSmartSolutionsMovementStartX.current;
                    const startY = toolsSmartSolutionsMovementStartY.current;
                    const distanceX = Math.abs(targetX - startX);
                    const distanceY = Math.abs(targetY - startY);
                    const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                    // Require more scroll distance for slower, smoother movement - use 3x the actual distance
                    // This ensures the avatar moves slowly and smoothly, requiring more scroll to complete
                    const maxScrollDistance = Math.max(600, totalDistance * 3);
                    const scrollDownDistance = Math.max(0, scrollYValue - movementStartScroll);
                    const rawProgress = Math.min(1, scrollDownDistance / maxScrollDistance);

                    // Apply easing function for smoother movement (use easeOut for more gradual start)
                    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                    const progress = easeOutCubic(rawProgress);

                    // Diagonal movement: interpolate from exam-circle position to tools-smart-solutions
                    const currentX = startX + (targetX - startX) * progress;
                    const currentY = startY + (targetY - startY) * progress;

                    // Scale down while moving: from currentTargetScale to 34px (34/48 = 0.708)
                    const startScale = currentTargetScale;
                    const endScale = 34 / 48; // Final scale at tools-smart-solutions (34px)
                    const currentScale = startScale + (endScale - startScale) * progress;

                    // Maintain 50px gap from header during forward movement
                    const headerHeight = getHeaderHeight();
                    const headerBottom = headerHeight;
                    const avatarHalfHeight = (48 * currentScale) / 2;
                    const minAvatarY = headerBottom + 50 + avatarHalfHeight; // 50px gap + half avatar height
                    let clampedY = Math.max(currentY, minAvatarY);

                    // Check for news banner collision during movement - maintain 40px gap
                    const newsBannerEl = document.getElementById('news-banner');
                    if (newsBannerEl) {
                      const newsBannerRect = newsBannerEl.getBoundingClientRect();
                      const newsBannerTop = newsBannerRect.top;

                      // Calculate avatar bottom position (current Y + half of scaled avatar height)
                      const avatarBaseHeight = 48; // Base avatar height
                      const scaledAvatarHeight = avatarBaseHeight * currentScale;
                      const scaledAvatarHalfHeight = scaledAvatarHeight / 2;
                      const avatarBottom = clampedY + scaledAvatarHalfHeight;

                      // Calculate gap between avatar bottom and news banner top
                      const gap = newsBannerTop - avatarBottom;
                      const requiredGap = 40; // Maintain 40px gap from news banner

                      // If gap is less than required, adjust Y position upward
                      if (gap < requiredGap) {
                        const targetAvatarBottom = newsBannerTop - requiredGap;
                        clampedY = targetAvatarBottom - scaledAvatarHalfHeight;
                      }
                    }

                    avatarX.set(Math.round(currentX));
                    avatarY.set(Math.round(clampedY));
                    avatarScale.set(currentScale);

                    // Animate exam-green-circle scale: shrink from big (1) to small/invisible (0) as avatar leaves
                    // Forward progress: 0 = at circle (full size), 1 = at tools-smart-solutions (invisible)
                    // Note: Removed transition from here to improve performance - set once via CSS or at initialization
                    const examCircleEl = document.getElementById('exam-green-circle');
                    if (examCircleEl) {
                      const circleMaxScale = 1.0; // Full size when avatar is at circle
                      const circleMinScale = 0.0; // Invisible when avatar leaves
                      const circleCurrentScale = circleMaxScale * (1 - progress); // Shrink as avatar moves away

                      (examCircleEl as HTMLElement).style.transform = `scale(${Math.max(0, circleCurrentScale)})`;
                      (examCircleEl as HTMLElement).style.opacity = `${Math.max(0, Math.min(1, circleCurrentScale))}`;
                      (examCircleEl as HTMLElement).style.display = circleCurrentScale > 0.05 ? 'block' : 'none';
                    }

                    // Check if we've reached the dock point
                    if (progress >= 0.98) {
                      // Maintain 50px gap from header when docking completes
                      const headerHeight = getHeaderHeight();
                      const headerBottom = headerHeight;
                      const avatarHalfHeight = (48 * endScale) / 2;
                      const minAvatarY = headerBottom + 50 + avatarHalfHeight; // 50px gap + half avatar height
                      const finalY = Math.max(targetY, minAvatarY);

                      setIsMovingToToolsSmartSolutions(false);
                      setIsDockedAtToolsSmartSolutions(true);
                      toolsSmartSolutionsDockScrollY.current = scrollYValue;
                      toolsSmartSolutionsDockX.current = targetX;
                      toolsSmartSolutionsDockY.current = finalY;
                      toolsSmartSolutionsDockScale.current = endScale;

                      // Set final position with gap maintenance
                      avatarX.set(Math.round(targetX));
                      avatarY.set(Math.round(finalY));
                      avatarScale.set(endScale);

                      // Ensure exam-green-circle is fully hidden when avatar reaches tools-smart-solutions
                      const examCircleEl = document.getElementById('exam-green-circle');
                      if (examCircleEl) {
                        (examCircleEl as HTMLElement).style.transform = 'scale(0)';
                        (examCircleEl as HTMLElement).style.opacity = '0';
                        (examCircleEl as HTMLElement).style.display = 'none';
                      }
                    }
                    return; // Exit early during movement
                  } else {
                    // If tools-smart-solutions element not found, reset movement
                    setIsMovingToToolsSmartSolutions(false);
                    toolsSmartSolutionsMovementStartScrollY.current = null;
                    toolsSmartSolutionsMovementStartY.current = null;
                    toolsSmartSolutionsMovementStartX.current = null;
                  }
                }

                // Set avatar to center of circle, 20px down (or adjusted position if near news banner) - this makes it sit inside the green circle
                avatarX.set(Math.round(circleCenterX));
                avatarY.set(Math.round(circleCenterY));
                avatarScale.set(currentTargetScale);
              } else if (after100pxDockY.current !== null && after100pxDockX.current !== null && after100pxDockScale.current !== null) {
                // Fallback: if circle element not found, use stored position
                avatarX.set(Math.round(after100pxDockX.current));
                avatarY.set(Math.round(after100pxDockY.current));
                avatarScale.set(after100pxDockScale.current);
              }

              // Only return if not moving to or docked at tools-smart-solutions
              if (!isMovingToToolsSmartSolutions && !isDockedAtToolsSmartSolutions) {
                return; // Permanently docked at exam-circle - no further movement
              }
            }

            // Get exam-green-circle element to calculate target position
            const examCircleEl = document.getElementById('exam-green-circle');
            if (!examCircleEl) {
              // If exam-green-circle not found, fallback to following ikigai
              avatarX.set(Math.round(currentIkigaiX));
              avatarY.set(Math.round(currentIkigaiY));
              avatarScale.set(baseDockScale);
              return;
            }

            const examCircleRect = examCircleEl.getBoundingClientRect();
            const avatarBaseSize = 48; // Avatar base size in pixels

            // Calculate target position: center of exam-green-circle, 20px down from center
            const targetCircleX = examCircleRect.left + examCircleRect.width / 2;
            const targetCircleY = examCircleRect.top + examCircleRect.height / 2 + 20; // 20px down from center

            // Calculate target scale to match the exam-green-circle size
            const targetScale = examCircleRect.width / avatarBaseSize;

            // Calculate movement based on scroll distance since movement started
            const movementStartScroll = ikigaiDownwardMovementStartScrollY.current;
            const scrollDownDistance = Math.max(0, scrollYValue - movementStartScroll);

            // Calculate progress based on scroll distance (need to scroll more to reach dock point - slower movement)
            const maxScrollDistance = 600; // Increased to slow down movement from ikigai center to exam-green-circle (higher = slower)
            const rawProgress = Math.min(1, scrollDownDistance / maxScrollDistance);
            // Apply easing function for smoother movement (easeInOutCubic)
            const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
            const scrollProgress = easeInOutCubic(rawProgress);

            // Move both axes simultaneously based on progress (diagonal movement from ikigai center to exam-green-circle)
            // Clamp progress to 1 to prevent movement beyond dock point
            const clampedProgress = Math.min(1, scrollProgress);

            // DIAGONAL MOVEMENT: Interpolate from ikigai center (baseDockX, baseDockY) to exam-green-circle center
            const startX = movementBaseX;
            const startY = movementBaseY;
            const endX = targetCircleX;
            const endY = targetCircleY;

            // Linear interpolation from start to end position
            const newX = startX + (endX - startX) * clampedProgress;
            const newY = startY + (endY - startY) * clampedProgress;

            // Scale: start from dock scale and scale smoothly to target scale as we move (linear interpolation)
            // newScale = startScale + (endScale - startScale) * progress
            const newScale = baseDockScale + (targetScale - baseDockScale) * clampedProgress;

            // Animate exam-green-circle scale: grow from small (0.1) to big (1) as avatar approaches
            // Use eased progress for smoother animation
            const circleScaleProgress = easeInOutCubic(rawProgress);
            const circleMinScale = 0.1; // Start very small
            const circleMaxScale = 1.0; // Full size when avatar arrives
            const circleCurrentScale = circleMinScale + (circleMaxScale - circleMinScale) * circleScaleProgress;

            // Apply scale and opacity to exam-green-circle element
            // Note: Removed transition from here to improve performance - set once via CSS or at initialization
            if (examCircleEl) {
              (examCircleEl as HTMLElement).style.transform = `scale(${circleCurrentScale})`;
              (examCircleEl as HTMLElement).style.opacity = `${Math.min(1, circleCurrentScale)}`;
              (examCircleEl as HTMLElement).style.display = circleCurrentScale > 0.05 ? 'block' : 'none';
            }

            // Check if we've reached the dock point - dock at exam-green-circle center and stay there permanently
            // Using 0.98 threshold to trigger docking slightly earlier for smoother transition
            if (clampedProgress >= 0.98 && !isDockedAfter100px) {
              setIsDockedAfter100px(true);
              after100pxDockScrollY.current = scrollYValue;
              // Store the target circle center position (will be updated to follow the circle)
              after100pxDockY.current = targetCircleY;
              after100pxDockX.current = targetCircleX;
              after100pxDockScale.current = targetScale;
              // Store forward movement's start position for reverse path (exact same path in reverse)
              forwardMovementStartX.current = movementBaseX;
              forwardMovementStartY.current = movementBaseY;
              forwardMovementStartScale.current = baseDockScale;
              // Set positions immediately
              avatarX.set(Math.round(targetCircleX));
              avatarY.set(Math.round(targetCircleY));
              avatarScale.set(targetScale);

              // Ensure exam-green-circle is at full scale when docked
              if (examCircleEl) {
                (examCircleEl as HTMLElement).style.transform = 'scale(1)';
                (examCircleEl as HTMLElement).style.opacity = '1';
                (examCircleEl as HTMLElement).style.display = 'block';
              }

              return; // Stop here - no further movement
            }

            // IMPORTANT: Ensure avatar maintains minimum gap from header (40px minimum) during movement
            // Calculate avatar's actual top position with current scale
            const avatarHalfHeightAtCurrentScale = (48 * newScale) / 2;
            const minAvatarY = headerBottom + 40 + avatarHalfHeightAtCurrentScale; // Header + 40px gap + half avatar height

            // Clamp Y position to ensure minimum gap is maintained during movement
            const clampedY = Math.max(newY, minAvatarY);

            // Set the new position and scale
            avatarX.set(Math.round(newX));
            avatarY.set(Math.round(clampedY));
            avatarScale.set(newScale);
          } else {
            // Gap is more than 40px, avatar can follow ikigai center position
            // Reset downward movement start when gap is restored
            if (ikigaiDownwardMovementStartScrollY.current !== null) {
              ikigaiDownwardMovementStartScrollY.current = null;
              ikigaiDownwardMovementStartY.current = null;
              ikigaiDownwardMovementStartX.current = null;
            }
            // Follow ikigai center but maintain original stored dock position for reference
            // Check if following ikigai would maintain sufficient gap
            const avatarTopAtIkigai = currentIkigaiY - (48 * baseDockScale) / 2;
            const gapAtIkigai = avatarTopAtIkigai - headerBottom;

            if (gapAtIkigai >= 40) {
              // Safe to follow ikigai center
              avatarX.set(Math.round(currentIkigaiX));
              avatarY.set(Math.round(currentIkigaiY));
            } else {
              // Ikigai too close to header, stay at position that maintains 40px gap
              const minY = headerBottom + 40 + (48 * baseDockScale) / 2;
              avatarX.set(Math.round(currentIkigaiX));
              avatarY.set(Math.round(minY));
            }
            avatarScale.set(baseDockScale);
          }

          return; // Exit early to prevent other movement logic
        }


        // Track scroll position when movement to quick-access-title starts (first time entering this block)
        // This captures the scroll position when pause completes, so avatar starts at progress 0
        if (zigZagStartScrollY.current === null) {
          zigZagStartScrollY.current = scrollYValue;
        }

        // Get quick-access-title element for target position
        const quickAccessTitleEl = document.getElementById('quick-access-title');
        if (!quickAccessTitleEl) {
          // If element not found, keep avatar at current position and wait
          avatarX.set(Math.round(heroCenterX));
          avatarY.set(Math.round(heroCenterY + totalTravelFromStart));
          avatarScale.set(1);
          return;
        }

        const quickAccessTitleRect = quickAccessTitleEl.getBoundingClientRect();
        let quickAccessTitleX = quickAccessTitleRect.left + quickAccessTitleRect.width / 2 - 100; // 100px to the left
        let quickAccessTitleY = quickAccessTitleRect.top + quickAccessTitleRect.height / 2 + 20; // 30px down

        // Check gap between target position and header - ensure 50px gap
        const headerHeight = getHeaderHeight();
        const headerBottom = headerHeight;
        const avatarHalfHeight = 24; // Avatar is 48px tall, so half is 24px
        const avatarTopAtTarget = quickAccessTitleY - avatarHalfHeight;
        const gapToHeaderAtTarget = avatarTopAtTarget - headerBottom;

        // If target position doesn't have 50px gap, adjust Y position upward to maintain gap
        if (gapToHeaderAtTarget < 50) {
          const requiredGap = 50;
          quickAccessTitleY = headerBottom + requiredGap + avatarHalfHeight;
        }

        // Calculate section height for scroll distance calculation
        const sectionHeight = heroBottom - heroTop;

        // Use a fixed scroll distance based on section height for smooth, predictable movement
        const availableScrollDistance = sectionHeight * 0.7; // Use 70% of section height as scroll range

        // Calculate progress (0 to 1) based on scroll distance after pulse
        const movementStartScroll = zigZagStartScrollY.current;
        const postPulseScroll = Math.max(0, scrollYValue - movementStartScroll);
        const progress = Math.min(1, Math.max(0, postPulseScroll / availableScrollDistance));

        // Check if avatar has reached quick-access-title - dock it there
        const hasReachedQuickAccessTitle = progress >= 1;

        // Mark as docked at quick-access-title when reached
        if (hasReachedQuickAccessTitle && !isDockedAtQuickAccessTitle) {
          setIsDockedAtQuickAccessTitle(true);
          quickAccessTitleDockScrollY.current = scrollYValue;
          quickAccessTitleDockX.current = quickAccessTitleX;
          quickAccessTitleDockY.current = quickAccessTitleY;
          quickAccessTitleDockScale.current = 0.8; // Default scale at quick-access-title
        }

        // DIAGONAL MOVEMENT: Both X and Y move simultaneously from first dock to quick-access-title
        // Start position: first docking position (centered at hero center)
        const startX = heroCenterX; // First docking position (centered)
        const startY = heroCenterY + totalTravelFromStart; // First docking Y position
        const endX = quickAccessTitleX; // Target: quick-access-title X position
        const endY = quickAccessTitleY; // Target: quick-access-title Y position

        // Calculate current position based on progress
        const currentX = startX + (endX - startX) * progress;
        let currentY = startY + (endY - startY) * progress;

        // Ensure 50px gap is maintained during movement - clamp Y position if needed
        const currentAvatarHalfHeight = 24; // Avatar is 48px tall, so half is 24px
        const minAvatarY = headerBottom + 50 + currentAvatarHalfHeight; // Header + 50px gap + half avatar height
        // Only clamp if the calculated position would violate the gap
        if (currentY < minAvatarY) {
          currentY = minAvatarY;
        }

        // Check for news banner collision during movement - maintain 40px gap
        const newsBannerEl = document.getElementById('news-banner');
        if (newsBannerEl) {
          const newsBannerRect = newsBannerEl.getBoundingClientRect();
          const newsBannerTop = newsBannerRect.top;

          // Calculate current scale during movement (scale down from 1.5 to 0.8)
          const maxScale = 1.5; // Maximum scale reached during downward movement
          const minScale = 0.8; // Minimum scale during movement
          const movementScale = hasReachedQuickAccessTitle ? minScale : (maxScale - (maxScale - minScale) * progress);

          // Calculate avatar bottom position (current Y + half of scaled avatar height)
          const avatarBaseHeight = 48; // Base avatar height
          const scaledAvatarHeight = avatarBaseHeight * movementScale;
          const scaledAvatarHalfHeight = scaledAvatarHeight / 2;
          const avatarBottom = currentY + scaledAvatarHalfHeight;

          // Calculate gap between avatar bottom and news banner top
          const gap = newsBannerTop - avatarBottom;
          const requiredGap = 40; // Maintain 40px gap from news banner

          // If gap is less than required, adjust Y position upward
          if (gap < requiredGap) {
            const targetAvatarBottom = newsBannerTop - requiredGap;
            currentY = targetAvatarBottom - scaledAvatarHalfHeight;
          }
        }

        // After docking at quick-access-title, check for 40px gap between header and avatar
        // This follows the exact same pattern as the original 115% logic
        if (isDockedAtQuickAccessTitle && hasReachedQuickAccessTitle) {
          // Get quick-access-title element to calculate current dock position
          const quickAccessTitleElCurrent = document.getElementById('quick-access-title');
          if (quickAccessTitleElCurrent) {
            const quickAccessTitleRectCurrent = quickAccessTitleElCurrent.getBoundingClientRect();
            // Calculate dock position (same as initial docking)
            let dockQuickAccessX = quickAccessTitleRectCurrent.left + quickAccessTitleRectCurrent.width / 2 - 100; // 100px to the left
            let dockQuickAccessY = quickAccessTitleRectCurrent.top + quickAccessTitleRectCurrent.height / 2 + 20; // 30px down

            // Adjust for 50px gap if needed
            const avatarHalfHeight = 24;
            const avatarTopAtDock = dockQuickAccessY - avatarHalfHeight;
            const gapToHeaderAtDock = avatarTopAtDock - headerBottom;

            if (gapToHeaderAtDock < 50) {
              const requiredGap = 50;
              dockQuickAccessY = headerBottom + requiredGap + avatarHalfHeight;
            }

            // Calculate gap at the base quick-access-title dock position
            const avatarTopAtDockFinal = dockQuickAccessY - avatarHalfHeight;
            const gapAtDock = avatarTopAtDockFinal - headerBottom;

            // When gap reaches 50px or less, start moving avatar down further (reduced from 80px for better responsiveness)
            if (gapAtDock <= 50 && postDock115StartScrollY.current === null) {
              postDock115StartScrollY.current = scrollYValue;
            }

            // Continue moving avatar down after gap threshold is reached
            if (postDock115StartScrollY.current !== null) {
              const postDock115Scroll = Math.max(0, scrollYValue - postDock115StartScrollY.current);
              const additionalDownwardMovement = postDock115Scroll;
              // Update dock Y position to move down
              dockQuickAccessY = dockQuickAccessY + additionalDownwardMovement;
            }

            // Check if we should move to ikigai center - adaptive to screen height and distance
            // Get ikigai center element position
            const ikigaiCenterEl = document.getElementById('ikigai-center-image');

            // Check for ikigai center movement when gap movement has started
            if (ikigaiCenterEl && postDock115StartScrollY.current !== null) {
              const ikigaiRect = ikigaiCenterEl.getBoundingClientRect();
              const ikigaiCenterX = ikigaiRect.left + ikigaiRect.width / 2;
              const ikigaiCenterY = ikigaiRect.top + ikigaiRect.height / 2;

              // Calculate quick-access-title dock position (base position, before gap movement)
              const baseDockQuickAccessY = quickAccessTitleDockY.current ?? dockQuickAccessY;
              const baseDockQuickAccessX = quickAccessTitleDockX.current ?? dockQuickAccessX;

              // Target position: ikigai center position, 24px to the right and 24px down
              const targetX = ikigaiCenterX + 24;
              const targetY = ikigaiCenterY + 24;

              // Calculate distance from quick-access-title dock to target
              const distanceToTarget = targetY - baseDockQuickAccessY;

              // Calculate adaptive scroll distance based on viewport height and actual distance
              // Use a percentage of viewport height (e.g., 10-15%) or minimum 30px, whichever is smaller
              const viewportHeight = window.innerHeight;
              const adaptiveScrollDistance = Math.min(Math.max(viewportHeight * 0.02, 5), 60); // 2% of viewport, min 5px, max 15px (reduced for faster start)

              // Only start ikigai center movement after minimal scroll (adaptive to screen size)
              // OR resume movement if we have existing movement data (scrolled back from ikigai center)
              const scrollSinceGapMovement = scrollYValue - postDock115StartScrollY.current;

              // Start movement immediately when gap is reached, or after minimal adaptive scroll
              // Also check if ikigai is actually below quick-access-title (distanceToTarget > 0)
              if (distanceToTarget > 0 && ikigaiCenterMovementStartScrollY.current === null) {
                // Start immediately if distance is small (elements are close), otherwise wait for minimal scroll
                const shouldStartImmediately = distanceToTarget < 300; // If less than 500px apart, start immediately (increased threshold for faster start)
                const hasMinimalScroll = scrollSinceGapMovement >= adaptiveScrollDistance;

                if (shouldStartImmediately || hasMinimalScroll) {
                  ikigaiCenterMovementStartScrollY.current = scrollYValue;
                  // Capture the actual current Y and X positions when movement starts to prevent jumps
                  ikigaiCenterMovementStartY.current = avatarY.get();
                  ikigaiCenterMovementStartX.current = avatarX.get();
                  setIsMovingToIkigaiCenter(true);
                }
              }

              // Resume diagonal movement if we have existing movement data (scrolled back from ikigai center)
              if (ikigaiCenterMovementStartScrollY.current !== null && !isMovingToIkigaiCenter && scrollSinceGapMovement > 0) {
                setIsMovingToIkigaiCenter(true);
                // Keep original start scroll position - movement will resume using stored start positions
              }

              // If we've started moving to ikigai center, calculate progress
              if (ikigaiCenterMovementStartScrollY.current !== null && isMovingToIkigaiCenter) {
                const ikigaiRect = ikigaiCenterEl.getBoundingClientRect();
                const ikigaiCenterX = ikigaiRect.left + ikigaiRect.width / 2;
                const ikigaiCenterY = ikigaiRect.top + ikigaiRect.height / 2;

                // Get the actual size of the ikigai center image
                const ikigaiImageWidth = ikigaiRect.width;

                // Avatar base size is 48px, calculate scale to match ikigai center image size
                const avatarBaseSize = 48;
                const targetScale = ikigaiImageWidth / avatarBaseSize; // Scale to match image width

                // DIAGONAL MOVEMENT: Both X and Y move simultaneously from quick-access-title dock to ikigai center
                // Follow the same pattern as first dock to quick-access-title movement

                // Start position: quick-access-title dock position (use stored start positions when movement began)
                const ikigaiStartX = ikigaiCenterMovementStartX.current !== null
                  ? ikigaiCenterMovementStartX.current
                  : (quickAccessTitleDockX.current ?? dockQuickAccessX);
                const ikigaiStartY = ikigaiCenterMovementStartY.current !== null
                  ? ikigaiCenterMovementStartY.current
                  : (quickAccessTitleDockY.current ?? dockQuickAccessY);

                // Target position: ikigai center position, 24px to the right and 24px down
                const ikigaiEndX = ikigaiCenterX + 24;
                const ikigaiEndY = ikigaiCenterY + 24;

                // Calculate progress based on scroll distance - adaptive to actual distance and viewport
                // Use actual distance between start and end positions, or viewport-based calculation
                const actualDistance = Math.sqrt(
                  Math.pow(ikigaiEndX - ikigaiStartX, 2) + Math.pow(ikigaiEndY - ikigaiStartY, 2)
                );
                // Use viewport height as base, but scale based on actual distance
                // For small screens, use smaller scroll distance; for larger distances, use more scroll
                const viewportHeight = window.innerHeight;
                const baseScrollDistance = Math.min(viewportHeight * 1.3, actualDistance * 0.8); // 15% of viewport or 40% of actual distance, whichever is smaller (reduced for faster movement)
                const movementScrollDistance = Math.max(baseScrollDistance, 50); // Minimum 50px for smooth movement (reduced for faster completion)

                const movementStartScroll = ikigaiCenterMovementStartScrollY.current;
                const movementScroll = Math.max(0, scrollYValue - movementStartScroll);
                const movementProgress = Math.min(1, Math.max(0, movementScroll / movementScrollDistance));

                // Check if we've reached the target - if so, dock and stay there
                if (movementProgress >= 1) {
                  // Dock perfectly at ikigai center
                  const dockedX = Math.round(ikigaiEndX);
                  const dockedY = Math.round(ikigaiEndY);

                  avatarX.set(dockedX);
                  avatarY.set(dockedY);
                  avatarScale.set(targetScale);

                  // Mark as docked and store dock position/scale for downward movement
                  setIsDockedAtIkigaiCenter(true);
                  setIsMovingToIkigaiCenter(false); // Stop the movement to ikigai center
                  ikigaiCenterDockScrollY.current = scrollYValue;
                  ikigaiCenterDockY.current = dockedY;
                  ikigaiCenterDockX.current = dockedX;
                  ikigaiCenterDockScale.current = targetScale;

                  return; // Exit early to prevent other movement logic
                }

                // DIAGONAL MOVEMENT: Both X and Y move simultaneously using the same progress
                // Simple linear interpolation: start + (end - start) * progress
                // This creates a true diagonal path (same pattern as first dock to quick-access-title)
                const currentX = ikigaiStartX + (ikigaiEndX - ikigaiStartX) * movementProgress;
                const currentY = ikigaiStartY + (ikigaiEndY - ikigaiStartY) * movementProgress;

                // Scale up while moving (from 0.8 at quick-access-title to targetScale at ikigai center)
                const startScale = 0.8; // Scale at quick-access-title dock
                const endScale = targetScale; // Scale to match ikigai center image size
                const currentScale = startScale + (endScale - startScale) * movementProgress;

                // Check for news banner collision during movement - maintain 45px gap
                let finalY = currentY;
                const newsBannerEl = document.getElementById('news-banner');
                if (newsBannerEl) {
                  const newsBannerRect = newsBannerEl.getBoundingClientRect();
                  const newsBannerTop = newsBannerRect.top;

                  // Calculate avatar bottom position (current Y + half of scaled avatar height)
                  const avatarBaseHeight = 48; // Base avatar height
                  const scaledAvatarHeight = avatarBaseHeight * currentScale;
                  const avatarHalfHeight = scaledAvatarHeight / 2;
                  const avatarBottom = currentY + avatarHalfHeight;

                  // Calculate gap between avatar bottom and news banner top
                  const gap = newsBannerTop - avatarBottom;
                  const requiredGap = 55; // Maintain 45px gap from news banner

                  // If gap is less than required, adjust Y position upward
                  if (gap < requiredGap) {
                    const targetAvatarBottom = newsBannerTop - requiredGap;
                    finalY = targetAvatarBottom - avatarHalfHeight;
                  }
                }

                // Set positions (rounded for smooth rendering)
                avatarX.set(Math.round(currentX));
                avatarY.set(Math.round(finalY));
                avatarScale.set(currentScale);

                return; // Exit early to prevent other movement logic
              }
            }
          }
        }

        // Set positions for diagonal movement (viewport-relative, rounded)
        // Y is base pulse position + vertical offset (moves downward)
        // Add header height ONLY during vertical movement after docking to prevent hiding behind header
        // Only set these if we're not moving to ikigai center
        if (!isMovingToIkigaiCenter) {
          // If docked at quick-access-title, calculate position with gap movement
          if (isDockedAtQuickAccessTitle && hasReachedQuickAccessTitle) {
            // Get quick-access-title element for current position
            const quickAccessTitleElForPos = document.getElementById('quick-access-title');
            if (quickAccessTitleElForPos) {
              const quickAccessTitleRectForPos = quickAccessTitleElForPos.getBoundingClientRect();
              let dockX = quickAccessTitleRectForPos.left + quickAccessTitleRectForPos.width / 2 - 100; // 100px to the left
              let dockY = quickAccessTitleRectForPos.top + quickAccessTitleRectForPos.height / 2 + 20; // 30px down

              // Adjust for 50px gap
              const avatarHalfHeight = 24;
              const avatarTopAtDock = dockY - avatarHalfHeight;
              const gapToHeader = avatarTopAtDock - headerBottom;

              if (gapToHeader < 50) {
                const requiredGap = 50;
                dockY = headerBottom + requiredGap + avatarHalfHeight;
              }

              // Apply additional downward movement if gap movement has started (same as 115% logic)
              if (postDock115StartScrollY.current !== null) {
                const postDock115Scroll = Math.max(0, scrollYValue - postDock115StartScrollY.current);
                const additionalDownwardMovement = postDock115Scroll;
                dockY = dockY + additionalDownwardMovement;
              }

              avatarX.set(Math.round(dockX));
              avatarY.set(Math.round(dockY));
              avatarScale.set(quickAccessTitleDockScale.current ?? 0.8);
            } else {
              // Fallback to stored positions
              avatarX.set(Math.round(quickAccessTitleDockX.current ?? currentX));
              avatarY.set(Math.round(quickAccessTitleDockY.current ?? currentY));
              avatarScale.set(quickAccessTitleDockScale.current ?? 0.8);
            }
          } else {
            // Not docked yet, use calculated positions during movement
            avatarX.set(Math.round(currentX));
            avatarY.set(Math.round(currentY));

            // Scale down during movement phase
            // Start from 1.5 (after scaling up during downward movement) and scale down to 0.8
            // When docked at quick-access-title, keep at final scale
            const maxScale = 1.5; // Maximum scale reached during downward movement
            const minScale = 0.8; // Minimum scale during movement
            const movementScale = hasReachedQuickAccessTitle ? minScale : (maxScale - (maxScale - minScale) * progress); // Dock at final scale when at quick-access-title
            avatarScale.set(movementScale);
          }
        }

        // Ensure avatar remains visible while moving vertically downward
        if (hideCentralAvatar) setHideCentralAvatar(false);
        setHideZigZagCycles(false); // No cycles to hide in straight vertical line
        setShouldPulse(false);
        return; // Exit early after setting vertical straight line position
      } else if (!pauseComplete || !reachedPulsePoint) {
        // Normal downward phase - only run if we haven't completed the pulse yet
        setHideZigZagCycles(false); // Reset when not in movement phase
        // Ensure avatar is visible during downward movement
        setHideCentralAvatar(false);
        let additionalTravel = 0;
        if (isPaused || !reachedPulsePoint || !pauseComplete) {
          additionalTravel = additionalTravelY.current;
        } else {
          additionalTravel = Math.min(maxTravel - pulseDist, ((Math.max(0, rawProgress - 0.98)) / (1 - 0.98)) * (maxTravel - pulseDist));
        }
        const totalTravel = isPaused ? totalTravelFromStart : (totalTravelFromStart + additionalTravel);
        currentTravelY.current = totalTravel;
        // Smoothly transition X from top-left to docking position (30px to the right of center) as avatar moves down
        const progressToCenter = Math.min(1, baseTravel / adjustedPulseDist);
        const targetX = 30; // Docking position: 30px to the right of center
        const startX = initialTopLeftX.current ?? -(heroRect.width * 0.4);
        const smoothX = startX + (targetX - startX) * progressToCenter;
        avatarX.set(Math.round(heroCenterX + smoothX));
        avatarY.set(Math.round(heroCenterY + totalTravel));
        // Don't disable pulse when close to pulse point (allow docking logic to handle it)
        if (!isPaused && !reachedPulsePoint) setShouldPulse(false);
      } else {
        // If pauseComplete is true but we somehow got here, still keep Y fixed
        setHideZigZagCycles(false); // Reset when not in movement phase
        avatarY.set(Math.round(heroCenterY + totalTravelFromStart));
      }

      // Scale up while coming down (before pulse point) or keep at max scale when paused
      // Only apply this scaling if we haven't reached the movement phase yet
      if (!pauseComplete || !reachedPulsePoint) {
        // Find how far through the 'hero' section we are (as a normalized progress between 0 and 1)
        const sectionHeight = heroBottom - heroTop; // already in scope or easy to calculate
        // Calculate progress to pulse point (where scaling should reach maximum)
        const progressToPulse = Math.min(1, Math.max(0, baseTravel / adjustedPulseDist));
        // Scale from 1 up to 1.5 while moving down to pulse point
        const maxScale = 1.5; // Maximum scale at pulse point
        const scaleValue = 1 + (maxScale - 1) * progressToPulse;
        avatarScale.set(scaleValue);
      } else if (isPaused && reachedPulsePoint) {
        // Keep at max scale (1.5) when paused at pulse point
        avatarScale.set(1.5);
      }

      // Pulse when at pulse point and paused
      setShouldPulse(reachedPulsePoint && isPaused);

      // Only hide avatar when we've fully exited the hero section and it's not moving
      if (scrollYValue >= endThreshold && !(pauseComplete && reachedPulsePoint)) {
        // As we exit the hero, hide the central avatar
        setHideZigZagCycles(false); // Reset when exiting hero section
        if (!hideCentralAvatar) setHideCentralAvatar(true);
        avatarX.set(Math.round(heroCenterX));
        avatarY.set(Math.round(heroCenterY + totalTravelFromStart));
        setShouldPulse(false);
      }
    });

    return unsubscribe;
  }, [heroSectionRef, scrollY, maxAvatarTravelY, pulseTravelDistance, hideCentralAvatar, isPaused, pauseComplete, pauseStartTime, isDocked, isDockedAtQuickAccessTitle, isMovingToIkigaiCenter, isDockedAtIkigaiCenter, isDockedAfter100px, isMovingToToolsSmartSolutions, isDockedAtToolsSmartSolutions, isMovingToPartnersSection, isDockedAtPartnersSection, isMovingToScholarshipsLoans, isDockedAtScholarshipsLoans, isMovingToGlobalEducation, isDockedAtGlobalEducation, isMovingToStudyAbroadMap, isDockedAtStudyAbroadMap, isMovingToScholarshipPathGreenIcon, isDockedAtScholarshipPathGreenIcon]);

  return (
    <FloatingLayer>
      <motion.div
        className="pointer-events-none"
        style={{
          position: 'fixed',
          left: avatarX,
          top: avatarY,
          width: '48px',
          height: '48px',
          x: '-50%',
          y: '-50%',
          scale: avatarScale,
          marginLeft: '-24px',
          marginTop: '-24px',
        }}
      >
        {/* Pulsing blue ripple effect when at max travel */}
        {shouldPulse && (
          <>
            <motion.div
              className="absolute rounded-full bg-blue-500"
              style={{
                width: '48px',
                height: '48px',
                left: '50%',
                top: '50%',
                marginLeft: '-24px',
                marginTop: '-24px'
              }}
              animate={{
                scale: [1, 2.5, 2.5],
                opacity: [0.3, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute rounded-full bg-blue-500"
              style={{
                width: '48px',
                height: '48px',
                left: '50%',
                top: '50%',
                marginLeft: '-24px',
                marginTop: '-24px'
              }}
              animate={{
                scale: [1, 2.5, 2.5],
                opacity: [0.3, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.7
              }}
            />
            <motion.div
              className="absolute rounded-full bg-blue-500"
              style={{
                width: '48px',
                height: '48px',
                left: '50%',
                top: '50%',
                marginLeft: '-24px',
                marginTop: '-24px'
              }}
              animate={{
                scale: [1, 2.5, 2.5],
                opacity: [0.3, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.4
              }}
            />
          </>
        )}
        {/* Green pulsing effect when docking at study-abroad-map */}
        {shouldPulseGreenAtStudyAbroadMap && (
          <>
            <motion.div
              className="absolute rounded-full bg-green-500"
              style={{
                width: '48px',
                height: '48px',
                left: '50%',
                top: '50%',
                marginLeft: '-24px',
                marginTop: '-24px'
              }}
              animate={{
                scale: [1, 2.5, 2.5],
                opacity: [0.4, 0, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute rounded-full bg-green-500"
              style={{
                width: '48px',
                height: '48px',
                left: '50%',
                top: '50%',
                marginLeft: '-24px',
                marginTop: '-24px'
              }}
              animate={{
                scale: [1, 2.5, 2.5],
                opacity: [0.4, 0, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.3
              }}
            />
            <motion.div
              className="absolute rounded-full bg-green-500"
              style={{
                width: '48px',
                height: '48px',
                left: '50%',
                top: '50%',
                marginLeft: '-24px',
                marginTop: '-24px'
              }}
              animate={{
                scale: [1, 2.5, 2.5],
                opacity: [0.4, 0, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.6
              }}
            />
          </>
        )}
        <Image
          ref={centralAvatarRef}
          src={centralStudentMain}
          alt="Central Student Main"
          className="home__avatar js-home-avatar w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg relative z-10"
          style={{
            width: '48px',
            height: '48px',
            opacity: (hideCentralAvatar || hideZigZagCycles) ? 0 : 1
          }}
        />
      </motion.div>
    </FloatingLayer>
  );
};

