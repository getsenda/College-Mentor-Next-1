/**
 * Robust Avatar Docking Utility
 * 
 * Handles all coordinate space issues for perfect avatar docking:
 * - Different coordinate spaces (absolute vs fixed)
 * - Transformed/scaled parents
 * - Scroll offsets
 * - Overflow/clip issues
 * - Layout changes during animation
 */

export interface DockingTarget {
  element: HTMLElement | null;
  offsetX?: number; // Offset from center (default: 0 = center)
  offsetY?: number; // Offset from center (default: 0 = center)
  anchor?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right';
}

export interface AvatarPosition {
  x: number; // Viewport X coordinate (for transform: translateX)
  y: number; // Viewport Y coordinate (for transform: translateY)
  scale: number;
  opacity: number;
}

/**
 * Calculate target position in viewport coordinates
 * This ensures consistent coordinate space regardless of parent transforms
 */
export function calculateTargetPosition(
  target: DockingTarget,
  avatarSize: { width: number; height: number } = { width: 44, height: 44 }
): AvatarPosition | null {
  if (!target.element) return null;

  // Use getBoundingClientRect() to get viewport coordinates
  // This automatically accounts for:
  // - Scroll position
  // - Parent transforms/scales
  // - Any CSS transforms on the element
  const rect = target.element.getBoundingClientRect();

  // Calculate anchor point based on anchor type
  let anchorX = rect.left + rect.width / 2; // Default: center
  let anchorY = rect.top + rect.height / 2; // Default: center

  const anchor = target.anchor || 'center';
  const offsetX = target.offsetX || 0;
  const offsetY = target.offsetY || 0;

  switch (anchor) {
    case 'top-left':
      anchorX = rect.left;
      anchorY = rect.top;
      break;
    case 'top-right':
      anchorX = rect.right;
      anchorY = rect.top;
      break;
    case 'bottom-left':
      anchorX = rect.left;
      anchorY = rect.bottom;
      break;
    case 'bottom-right':
      anchorX = rect.right;
      anchorY = rect.bottom;
      break;
    case 'top':
      anchorX = rect.left + rect.width / 2;
      anchorY = rect.top;
      break;
    case 'bottom':
      anchorX = rect.left + rect.width / 2;
      anchorY = rect.bottom;
      break;
    case 'left':
      anchorX = rect.left;
      anchorY = rect.top + rect.height / 2;
      break;
    case 'right':
      anchorX = rect.right;
      anchorY = rect.top + rect.height / 2;
      break;
    case 'center':
    default:
      anchorX = rect.left + rect.width / 2;
      anchorY = rect.top + rect.height / 2;
      break;
  }

  // Apply offsets
  const targetX = anchorX + offsetX;
  const targetY = anchorY + offsetY;

  // Center the avatar on the target (since we use transform: translate(-50%, -50%))
  // The x and y values are the center point where the avatar should be positioned
  return {
    x: targetX,
    y: targetY,
    scale: 1,
    opacity: 1,
  };
}

/**
 * Calculate scale to match target element size
 */
export function calculateScaleToMatch(
  target: DockingTarget,
  avatarBaseSize: number = 44
): number {
  if (!target.element) return 1;

  const rect = target.element.getBoundingClientRect();
  // Use the smaller dimension to ensure avatar fits
  const targetSize = Math.min(rect.width, rect.height);
  return targetSize / avatarBaseSize;
}

/**
 * Constrain position to viewport bounds
 * Ensures avatar stays visible
 */
export function constrainToViewport(
  position: AvatarPosition,
  avatarSize: { width: number; height: number },
  padding: number = 20
): AvatarPosition {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Account for avatar size (scaled)
  const scaledWidth = avatarSize.width * position.scale;
  const scaledHeight = avatarSize.height * position.scale;
  
  // Calculate bounds (avatar is centered, so we need half size on each side)
  const minX = padding + scaledWidth / 2;
  const maxX = viewportWidth - padding - scaledWidth / 2;
  const minY = padding + scaledHeight / 2;
  const maxY = viewportHeight - padding - scaledHeight / 2;
  
  return {
    x: Math.max(minX, Math.min(maxX, position.x)),
    y: Math.max(minY, Math.min(maxY, position.y)),
    scale: position.scale,
    opacity: position.opacity,
  };
}

/**
 * Smooth interpolation (lerp) for avatar movement
 */
export function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

/**
 * Wait for layout to stabilize before calculating positions
 * Useful when fonts/images are loading
 */
export function waitForLayoutStable(
  callback: () => void,
  timeout: number = 100
): void {
  let rafId: number;
  let timeoutId: NodeJS.Timeout;
  let lastHeight = document.body.scrollHeight;
  let stableCount = 0;
  const requiredStableFrames = 2;

  const check = () => {
    const currentHeight = document.body.scrollHeight;
    
    if (currentHeight === lastHeight) {
      stableCount++;
      if (stableCount >= requiredStableFrames) {
        callback();
        return;
      }
    } else {
      stableCount = 0;
      lastHeight = currentHeight;
    }
    
    rafId = requestAnimationFrame(check);
  };

  rafId = requestAnimationFrame(check);
  
  // Fallback timeout
  timeoutId = setTimeout(() => {
    if (rafId) cancelAnimationFrame(rafId);
    callback();
  }, timeout);
}

/**
 * Get element by ID with retry (handles dynamic loading)
 */
export function getElementWithRetry(
  id: string,
  maxRetries: number = 10,
  delay: number = 100
): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    let attempts = 0;
    
    const tryGet = () => {
      const element = document.getElementById(id);
      if (element) {
        resolve(element);
        return;
      }
      
      attempts++;
      if (attempts >= maxRetries) {
        resolve(null);
        return;
      }
      
      setTimeout(tryGet, delay);
    };
    
    tryGet();
  });
}

/**
 * Check if element is in viewport
 */
export function isInViewport(
  element: HTMLElement,
  threshold: number = 0.1
): boolean {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  return (
    rect.top >= -rect.height * threshold &&
    rect.left >= -rect.width * threshold &&
    rect.bottom <= viewportHeight + rect.height * threshold &&
    rect.right <= viewportWidth + rect.width * threshold
  );
}

/**
 * Calculate scroll progress through a section
 */
export function getScrollProgress(
  element: HTMLElement,
  startOffset: number = 0,
  endOffset: number = 0
): number {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const elementTop = rect.top + window.scrollY;
  const elementHeight = rect.height;
  
  const startPoint = elementTop - viewportHeight + startOffset;
  const endPoint = elementTop + elementHeight + endOffset;
  const currentScroll = window.scrollY + viewportHeight / 2;
  
  const progress = (currentScroll - startPoint) / (endPoint - startPoint);
  return Math.max(0, Math.min(1, progress));
}

