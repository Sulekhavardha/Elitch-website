import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Laptop, 
  Smartphone, 
  MessageCircle 
} from 'lucide-react';
import { PROJECT_BOOKING_CONFIG } from '../../data/projectBookingConfig';
import { LaptopPreviewFrame, PhonePreviewFrame } from './DevicePreviewMockups';

// Clean SVG icon for WhatsApp
function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      aria-hidden="true"
    >
      <path d="M12.031 2C6.495 2 2 6.492 2 12.025c0 1.996.586 3.864 1.603 5.441L2 22l4.71-1.543a9.98 9.98 0 0 0 5.321 1.568h.004c5.536 0 10.031-4.492 10.031-10.025C22.066 6.492 17.567 2 12.031 2zm0 18.257h-.003a8.28 8.28 0 0 1-4.225-1.157l-.303-.18-3.13.824.836-3.053-.197-.315a8.27 8.27 0 0 1-1.267-4.351c0-4.57 3.718-8.285 8.289-8.285 2.215 0 4.298.863 5.864 2.43 1.565 1.567 2.427 3.65 2.427 5.865 0 4.571-3.718 8.287-8.288 8.287zm4.542-6.195c-.249-.125-1.472-.727-1.7-.81-.228-.083-.394-.125-.56.125-.166.25-.644.81-.789.976-.145.166-.29.187-.539.062-.249-.125-1.05-.387-2-1.234-.738-.658-1.237-1.472-1.382-1.721-.145-.249-.015-.384.109-.508.112-.111.249-.29.373-.436.125-.145.166-.25.249-.415.083-.166.042-.311-.021-.436-.062-.125-.56-1.349-.768-1.847-.202-.486-.407-.42-.56-.428-.145-.008-.311-.01-.477-.01s-.436.062-.664.311c-.228.25-.871.851-.871 2.075 0 1.225.892 2.408 1.016 2.574.125.166 1.756 2.682 4.254 3.76.594.256 1.059.409 1.421.524.597.19 1.141.163 1.57.099.479-.072 1.472-.602 1.68-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
    </svg>
  );
}

export default function ProjectBookingPopup({
  isOpen,
  onClose,
  config = PROJECT_BOOKING_CONFIG,
}) {
  const location = useLocation();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const laptopContainerRef = useRef(null);
  const phoneContainerRef = useRef(null);
  const [deviceScale, setDeviceScale] = useState({ laptop: 0.25, phone: 0.25 });

  // Compute preview URL safely ensuring preview_mode query param is added
  const previewUrl = useMemo(() => {
    if (typeof window === 'undefined') return '/?preview_mode=true';
    const currentPath = location.pathname;
    const hasQuery = currentPath.includes('?');
    const separator = hasQuery ? '&' : '?';
    return `${currentPath}${separator}preview_mode=true`;
  }, [location.pathname]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when dialog is open and restore when closed
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      // Focus close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Measure and adjust iframe scaling responsively based on container screen widths
  useEffect(() => {
    if (!isOpen) return;

    const updateScale = () => {
      if (laptopContainerRef.current) {
        // Laptop screen width inside frame
        const laptopScreenWidth = Math.max(100, laptopContainerRef.current.clientWidth - 12);
        const calculatedLaptopScale = Math.min(0.35, Math.max(0.10, laptopScreenWidth / 1200));
        
        // Phone screen width inside frame
        const phoneContainerWidth = phoneContainerRef.current ? phoneContainerRef.current.clientWidth : 75;
        const phoneScreenWidth = Math.max(50, phoneContainerWidth - 8);
        const calculatedPhoneScale = Math.min(0.40, Math.max(0.14, phoneScreenWidth / 390));

        setDeviceScale({
          laptop: calculatedLaptopScale,
          phone: calculatedPhoneScale,
        });
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isOpen]);

  // Construct WhatsApp URLs using the shared configured number (international format)
  const whatsappNumber = config.contact?.whatsappNumber || config.actions?.primary?.number || '9670111167';

  const primaryWhatsAppUrl = useMemo(() => {
    const rawMessage = typeof config.actions?.primary?.getMessage === 'function' 
      ? config.actions.primary.getMessage(config.client?.brandName) 
      : `Hi, I’ve reviewed the ${config.client?.brandName || 'website'} preview and would like to discuss proceeding with the project. Please share the next steps for the 50% kickoff payment based on our agreed project fee and the remaining development work. Thank you.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;
  }, [config, whatsappNumber]);

  const secondaryWhatsAppUrl = useMemo(() => {
    const rawMessage = typeof config.actions?.secondary?.getMessage === 'function'
      ? config.actions.secondary.getMessage(config.client?.brandName)
      : `Hi, I’ve reviewed the ${config.client?.brandName || 'website'} preview. I’d like to request a few changes before proceeding. The changes I’d like are: `;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;
  }, [config, whatsappNumber]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-popup-title"
      aria-describedby="preview-popup-desc"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-5 md:p-6 overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Backdrop with subtle blur */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Card:
          Desktop: max-w-4xl with balanced two-column grid.
          Mobile: fits cleanly within 403x704 viewport with zero internal scrolling.
      */}
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm sm:max-w-lg lg:max-w-4xl max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-950/20 dark:shadow-black/70 overflow-hidden z-10 transition-all duration-300 animate-scaleUp"
      >
        {/* Decorative brand accent line */}
        <div className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 shrink-0" />

        {/* Modal Header Bar with Close Button */}
        <div className="flex items-center justify-between px-3.5 sm:px-7 py-2 sm:py-3.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-purple-700 dark:text-purple-400">
              {config.copy.eyebrow}
            </span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline truncate max-w-[200px]">
              {config.client.brandName}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close website preview popup"
            className="p-1 sm:p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body: 
            On Mobile: strict vertical flex order: Previews -> Headline -> Payment -> WhatsApp Actions.
            On Desktop: balanced two-column grid (lg:grid lg:grid-cols-12).
        */}
        <div className="px-3 sm:px-7 py-2 sm:py-6 flex-1 flex flex-col justify-between overflow-y-auto sm:overflow-y-auto">
          
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 sm:gap-6 lg:gap-8 items-center flex-1">
            
            {/* ── DEVICE PREVIEWS (Positioned near the top immediately below header on mobile) ── */}
            <div className="w-full lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-1 min-w-0 shrink-0">
              <div 
                className="w-full flex items-end justify-center gap-2 sm:gap-3 pt-0.5 sm:pt-1 pb-1 sm:pb-2"
                style={{
                  '--laptop-scale': deviceScale.laptop,
                  '--phone-scale': deviceScale.phone,
                }}
              >
                {/* Laptop Preview: landscape, proportional */}
                <div 
                  ref={laptopContainerRef} 
                  className="w-[62%] sm:w-[65%] lg:w-[70%] max-w-[195px] sm:max-w-[270px] lg:max-w-[310px] min-w-0"
                >
                  <LaptopPreviewFrame
                    previewUrl={previewUrl}
                    brandName={config.client.brandName}
                    compact={true}
                  />
                </div>

                {/* Generic Notch-Free Phone Preview: portrait, side-by-side */}
                <div 
                  ref={phoneContainerRef} 
                  className="w-[27%] sm:w-[26%] lg:w-[25%] max-w-[80px] sm:max-w-[105px] lg:max-w-[115px] drop-shadow-lg shrink-0 min-w-0"
                >
                  <PhonePreviewFrame
                    previewUrl={previewUrl}
                    brandName={config.client.brandName}
                    compact={true}
                  />
                </div>
              </div>

              {/* Desktop view captions */}
              <div className="hidden lg:flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  Desktop View
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                  Mobile Responsive View
                </span>
              </div>
            </div>

            {/* ── CONTENT & ACTIONS SECTION (Positioned below device previews on mobile) ── */}
            <div className="w-full lg:col-span-6 flex flex-col justify-center order-2 lg:order-2 space-y-1.5 sm:space-y-4 min-w-0">
              
              {/* Headline & Concise Supporting text */}
              <div>
                <h2 
                  id="preview-popup-title"
                  className="text-xs sm:text-xl lg:text-2xl font-display font-bold text-slate-900 dark:text-white leading-tight tracking-tight text-center lg:text-left"
                >
                  {config.copy.headline}
                </h2>
                
                {/* Mobile: exactly one short sentence */}
                <p 
                  id="preview-popup-desc"
                  className="mt-0.5 text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 leading-tight text-center lg:text-left sm:hidden"
                >
                  You’ve reviewed the frontend preview. Proceed to discuss the 50% kickoff payment and next phase.
                </p>

                {/* Desktop: detailed supporting text */}
                <p 
                  className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed hidden sm:block"
                >
                  {config.copy.supportingText}
                </p>
              </div>

              {/* Compact Payment Panel */}
              <div className="rounded-xl bg-gradient-to-br from-slate-50 to-purple-50/40 dark:from-slate-800/80 dark:to-purple-950/20 border border-purple-100 dark:border-purple-900/40 p-1.5 sm:p-3.5">
                <div className="flex items-center pb-1 sm:pb-2 border-b border-purple-100/80 dark:border-purple-900/40">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-purple-600 dark:text-purple-400" />
                    <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      {config.copy.bookingHeading}
                    </span>
                  </div>
                </div>

                <div className="mt-0.5 sm:mt-1.5">
                  <div className="text-[8px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Kickoff Booking Deposit
                  </div>
                  <div className="text-xs sm:text-lg lg:text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                    {config.copy.bookingAmount}
                  </div>
                  
                  {/* Mobile concise note */}
                  <p className="mt-0.5 text-[9px] text-slate-500 dark:text-slate-400 leading-tight sm:hidden">
                    Applied toward the total project cost; balance follows the agreed proposal.
                  </p>
                  
                  {/* Desktop detailed note */}
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed hidden sm:block">
                    {config.copy.bookingNote}
                  </p>
                </div>
              </div>

              {/* Action Links: Both WhatsApp actions using anchor tags */}
              <div className="space-y-1 sm:space-y-2 pt-0.5">
                <a
                  href={primaryWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-sm sm:shadow-md shadow-emerald-600/25 active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-center"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-current shrink-0" />
                  <span>{config.copy.primaryButtonText}</span>
                </a>

                <a
                  href={secondaryWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 text-center"
                >
                  <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>{config.copy.secondaryButtonText}</span>
                </a>
              </div>

              {/* Desktop reassurance note */}
              <div className="hidden sm:flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Kickoff agreement followed by direct developer milestone delivery.</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
