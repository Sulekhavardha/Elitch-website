import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { PROJECT_BOOKING_CONFIG } from '../../data/projectBookingConfig';

/**
 * usePageBottomTrigger
 * 
 * Accurately detects when the visitor is scrolling DOWNWARD and the page footer
 * first begins to enter the visible viewport.
 * 
 * Key capabilities:
 * - Mounts once through the shared layout and triggers on EVERY route.
 * - Senses footer entry as soon as its top approaches or enters the viewport (`rect.top <= windowHeight + 10`).
 * - Detects true downward scroll direction, avoiding accidental auto-triggers on initial page load.
 * - Re-arms when user scrolls back UP away from the footer (`rect.top > windowHeight + 60`).
 * - Resets on route changes so navigating to any route always has an active, armed trigger.
 * - Strictly isolated from child iframes (`preview_mode=true`).
 * - No session dismissal lock: closing allows continuous normal browsing and re-triggers upon re-entry.
 */
export function usePageBottomTrigger({
  enabled = PROJECT_BOOKING_CONFIG.enabled,
  delay = 180, // responsive trigger delay
} = {}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // References for tracking scroll dynamics and state
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef('none');
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

      if (Math.abs(delta) > 1) {
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

    // Direct check function combining bounding rect, scroll direction, and viewport geometry
    const evaluateFooterEntry = () => {
      // Find footer element: ref if attached or query semantic footer
      const footerElement = targetFooterRef.current || document.querySelector('footer');
      if (!footerElement) return;

      const rect = footerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const currentScrollY = window.scrollY || window.pageYOffset || 0;

      // Check if footer top is within or starting to enter the visible screen
      // rect.top is the distance from the top of the viewport to the top of the footer.
      // When rect.top <= windowHeight, the top of the footer has entered the viewport.
      const isEnteringViewport = rect.top <= (windowHeight + 20);

      // Check if footer has completely left the trigger area (scrolled upward far enough)
      const hasLeftTriggerArea = rect.top > (windowHeight + 70);

      if (hasLeftTriggerArea) {
        // Re-arm trigger when visitor scrolls upward out of the footer zone
        isFooterInViewRef.current = false;
        hasTriggeredForCurrentEntryRef.current = false;
        clearPendingTimer();
        return;
      }

      if (isEnteringViewport) {
        isFooterInViewRef.current = true;

        // Downward scroll condition:
        // User is scrolling downward, or has engaged scrolling on this page and is near/in footer
        const isScrollingDown = scrollDirectionRef.current === 'down' || (hasUserScrolledOnThisPageRef.current && currentScrollY > 15);
        const timeSincePageMount = Date.now() - initialMountTimeRef.current;
        const pageEngagementReady = timeSincePageMount > 400 && hasUserScrolledOnThisPageRef.current;

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
        clearPendingTimer();
      }
    };

    // 1. Intersection Observer with lead margin
    let observer = null;
    const footerElement = targetFooterRef.current || document.querySelector('footer');
    if (footerElement && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              evaluateFooterEntry();
            } else {
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
          root: null,
          rootMargin: '0px 0px 40px 0px', // detects when footer first starts entering
          threshold: [0, 0.05, 0.1],
        }
      );
      observer.observe(footerElement);
    }

    // 2. Window scroll & resize listeners for high-frequency evaluation
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
    // Once they scroll upward out of the footer, it automatically re-arms
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
