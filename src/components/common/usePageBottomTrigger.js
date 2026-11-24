import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { PROJECT_BOOKING_CONFIG } from '../../data/projectBookingConfig';

/**
 * usePageBottomTrigger
 * 
 * Accurately detects when the visitor is scrolling DOWNWARD and the shared footer
 * first begins to enter the visible viewport.
 * 
 * Re-arming behavior:
 * - When closed, visitor can continue browsing normally.
 * - If visitor scrolls upward far enough that the footer leaves the trigger zone, the trigger re-arms.
 * - When visitor later scrolls downward and the footer enters the viewport again, the popup opens again.
 * - Works identically on EVERY route/page through the shared site layout without session lockout.
 * - Strictly isolated so device preview iframes cannot trigger popups.
 */
export function usePageBottomTrigger({
  enabled = PROJECT_BOOKING_CONFIG.enabled,
  delay = 250, // brief natural reaction delay once downward footer entry is confirmed
} = {}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // References for tracking scroll dynamics and state
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef('none'); // 'up' | 'down' | 'none'
  const isFooterInViewRef = useRef(false);
  const hasTriggeredForCurrentEntryRef = useRef(false);
  const triggerTimerRef = useRef(null);
  const initialMountTimeRef = useRef(Date.now());
  const hasUserScrolledOnThisPageRef = useRef(false);
  const targetFooterRef = useRef(null);

  // Check if preview mode is forced or inside an iframe
  const isInsidePreview = typeof window !== 'undefined' && (
    window.self !== window.top ||
    window.location.search.includes('preview_mode=true') ||
    window.name === 'project-preview-frame'
  );

  // Clear timers helper
  const clearPendingTimer = useCallback(() => {
    if (triggerTimerRef.current) {
      clearTimeout(triggerTimerRef.current);
      triggerTimerRef.current = null;
    }
  }, []);

  // When route changes, reset trigger state so every new page is fresh and ready
  useEffect(() => {
    lastScrollYRef.current = typeof window !== 'undefined' ? window.scrollY || 0 : 0;
    scrollDirectionRef.current = 'none';
    isFooterInViewRef.current = false;
    hasTriggeredForCurrentEntryRef.current = false;
    hasUserScrolledOnThisPageRef.current = false;
    initialMountTimeRef.current = Date.now();
    clearPendingTimer();
    setIsOpen(false);
  }, [location.pathname, clearPendingTimer]);

  // Track scroll direction and user scroll engagement
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;
    const handleScrollActivity = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const delta = currentScrollY - lastScrollYRef.current;

      if (Math.abs(delta) > 2) {
        hasUserScrolledOnThisPageRef.current = true;
        scrollDirectionRef.current = delta > 0 ? 'down' : 'up';
      }

      lastScrollYRef.current = currentScrollY;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollActivity();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('touchmove', onScroll);
    };
  }, []);

  // Main Footer Intersection & Downward Entry Observer
  useEffect(() => {
    if (!enabled || isInsidePreview || typeof window === 'undefined') {
      return;
    }

    // Find footer element: use ref if attached or query semantic footer
    const footerElement = targetFooterRef.current || document.querySelector('footer');
    if (!footerElement) {
      return;
    }

    // Direct check function combining bounding rect, scroll direction, and viewport geometry
    const evaluateFooterEntry = () => {
      if (!footerElement) return;

      const rect = footerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const currentScrollY = window.scrollY || window.pageYOffset || 0;

      // Footer is considered "entering/in view" when its top is within or above the bottom viewport edge
      // We give a responsive lead buffer so as soon as the footer top starts entering the bottom of the screen:
      const footerTopFromViewportBottom = windowHeight - rect.top;
      const isEnteringViewport = footerTopFromViewportBottom >= 15; // first starts entering

      // Check if footer has completely left the trigger area (scrolled upward far enough)
      // e.g. footer top is well below the bottom of the viewport
      const hasLeftTriggerArea = rect.top > windowHeight + 80;

      if (hasLeftTriggerArea) {
        // Re-arm trigger when visitor scrolls upward out of the footer zone
        isFooterInViewRef.current = false;
        hasTriggeredForCurrentEntryRef.current = false;
        clearPendingTimer();
        return;
      }

      if (isEnteringViewport) {
        isFooterInViewRef.current = true;

        // Trigger condition:
        // 1. Not already open
        // 2. Has not already triggered for this current entry
        // 3. Visitor is scrolling downward (or on short pages after engagement, user moved down)
        // 4. User has actually scrolled on this page (avoid immediate 0ms flash on initial page load if footer was visible)
        const isScrollingDown = scrollDirectionRef.current === 'down' || (hasUserScrolledOnThisPageRef.current && currentScrollY > 10);
        const timeSincePageMount = Date.now() - initialMountTimeRef.current;
        const pageEngagementReady = timeSincePageMount > 600 && hasUserScrolledOnThisPageRef.current;

        if (!isOpen && !hasTriggeredForCurrentEntryRef.current && isScrollingDown && pageEngagementReady) {
          if (!triggerTimerRef.current) {
            triggerTimerRef.current = setTimeout(() => {
              hasTriggeredForCurrentEntryRef.current = true;
              setIsOpen(true);
              triggerTimerRef.current = null;
            }, delay);
          }
        }
      } else {
        // Footer is not in viewport yet
        clearPendingTimer();
      }
    };

    // 1. Intersection Observer with responsive root margins
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              evaluateFooterEntry();
            } else {
              // When footer exits the bottom of the viewport, re-arm
              const windowHeight = window.innerHeight || document.documentElement.clientHeight;
              if (entry.boundingClientRect.top > windowHeight) {
                isFooterInViewRef.current = false;
                hasTriggeredForCurrentEntryRef.current = false;
                clearPendingTimer();
              }
            }
          });
        },
        {
          root: null, // viewport
          rootMargin: '0px 0px 40px 0px', // detects when footer first starts entering visible screen
          threshold: [0, 0.05, 0.15],
        }
      );
      observer.observe(footerElement);
    }

    // 2. Scroll listener to evaluate direction on every frame
    let ticking = false;
    const onScrollCheck = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          evaluateFooterEntry();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScrollCheck, { passive: true });
    window.addEventListener('resize', onScrollCheck, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollCheck);
      window.removeEventListener('resize', onScrollCheck);
      clearPendingTimer();
      if (observer && footerElement) {
        observer.unobserve(footerElement);
        observer.disconnect();
      }
    };
  }, [enabled, isInsidePreview, isOpen, delay, location.pathname, clearPendingTimer]);

  // Close handler: closes dialog and allows user to continue browsing
  const handleClose = useCallback(() => {
    setIsOpen(false);
    clearPendingTimer();
    // Keep hasTriggeredForCurrentEntryRef = true while the user remains in the footer area
    // Once they scroll upward out of the footer, it will automatically re-arm
    hasTriggeredForCurrentEntryRef.current = true;
  }, [clearPendingTimer]);

  // Manual open helper
  const handleManualOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    isInsidePreview,
    close: handleClose,
    open: handleManualOpen,
    footerRef: targetFooterRef,
  };
}
