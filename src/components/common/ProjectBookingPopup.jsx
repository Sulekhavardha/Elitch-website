import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Laptop, 
  Smartphone,
  Mail,
  Send,
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
  const navigate = useNavigate();
  const location = useLocation();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const laptopContainerRef = useRef(null);
  const phoneContainerRef = useRef(null);
  const [deviceScale, setDeviceScale] = useState({ laptop: 0.35, phone: 0.35 });

  // Compute preview URL safely ensuring preview_mode query param is added
  // so child iframes know they are in preview and never open popups
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

  // Measure and adjust iframe scaling responsively based on container widths
  useEffect(() => {
    if (!isOpen) return;

    const updateScale = () => {
      if (laptopContainerRef.current) {
        const laptopWidth = laptopContainerRef.current.clientWidth;
        // The laptop screen viewport is 1280px wide
        const calculatedLaptopScale = Math.min(0.42, Math.max(0.22, laptopWidth / 1280));
        
        // The phone viewport is 375px wide, phone container is around 140px-170px
        const phoneWidth = phoneContainerRef.current ? phoneContainerRef.current.clientWidth - 16 : 140;
        const calculatedPhoneScale = Math.min(0.45, Math.max(0.25, phoneWidth / 375));

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

  if (!isOpen) return null;

  // Primary Action: Open WhatsApp chat in new window/tab with prefilled message
  const handlePrimaryWhatsApp = () => {
    const primary = config.actions.primary;
    const whatsappNum = primary?.number || config.contact?.whatsappNumber || '9670111167';
    const rawMessage = typeof primary?.getMessage === 'function' 
      ? primary.getMessage(config.client?.brandName) 
      : `Hi, I’ve reviewed the ${config.client?.brandName || 'website'} preview and would like to discuss proceeding with the project. Please share the next steps for the 50% kickoff payment based on our agreed project fee and the remaining development work. Thank you.`;
    
    const waUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(rawMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Secondary Action: Open email draft to project's configured contact
  const handleSecondaryEmail = () => {
    const secondary = config.actions.secondary;
    if (secondary?.type === 'mailto') {
      const mailtoUrl = `mailto:${secondary.email}?subject=${encodeURIComponent(secondary.subject)}&body=${encodeURIComponent(secondary.body)}`;
      window.location.href = mailtoUrl;
    } else {
      navigate(secondary?.routeFallback || '/contact');
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-popup-title"
      aria-describedby="preview-popup-desc"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
    >
      {/* Backdrop with subtle blur */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Card */}
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()} // Prevent inside clicks from closing backdrop
        className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-950/20 dark:shadow-black/70 overflow-hidden z-10 transition-all duration-300 animate-scaleUp"
      >
        {/* Subtle decorative brand accent line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 shrink-0" />

        {/* Modal Header Bar with Close Button */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-purple-700 dark:text-purple-400">
              {config.copy.eyebrow}
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
              {config.client.brandName}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close website preview popup"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-5 sm:px-8 py-6 sm:py-7 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Device Frames Displaying the Current Website */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center order-2 lg:order-1">
              <div 
                className="relative w-full flex items-end justify-center pt-2 pb-4"
                style={{
                  '--laptop-scale': deviceScale.laptop,
                  '--phone-scale': deviceScale.phone,
                }}
              >
                {/* Laptop Preview Container */}
                <div ref={laptopContainerRef} className="w-full max-w-[460px] sm:max-w-[490px]">
                  <LaptopPreviewFrame
                    previewUrl={previewUrl}
                    brandName={config.client.brandName}
                  />
                </div>

                {/* Overlapping Phone Preview Container - Generic Phone with edge-to-edge clear screen */}
                <div 
                  ref={phoneContainerRef} 
                  className="absolute -right-1 sm:right-2 bottom-0 z-20 drop-shadow-2xl"
                >
                  <PhonePreviewFrame
                    previewUrl={previewUrl}
                    brandName={config.client.brandName}
                  />
                </div>
              </div>

              {/* Device Preview caption */}
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
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

            {/* Right Side: Copy & Booking Reserve Panel */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2 space-y-5">
              
              <div>
                <h2 
                  id="preview-popup-title"
                  className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white leading-tight tracking-tight"
                >
                  {config.copy.headline}
                </h2>
                <p 
                  id="preview-popup-desc"
                  className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
                >
                  {config.copy.supportingText}
                </p>
              </div>

              {/* Booking Reserve Box - Milestone 1 label removed cleanly */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50/40 dark:from-slate-800/80 dark:to-purple-950/20 border border-purple-100 dark:border-purple-900/40 p-4 sm:p-5">
                <div className="flex items-center pb-3 border-b border-purple-100/80 dark:border-purple-900/40">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      {config.copy.bookingHeading}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kickoff Booking Deposit</div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                    {config.copy.bookingAmount}
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {config.copy.bookingNote}
                  </p>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Primary, Email Secondary */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handlePrimaryWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-lg shadow-emerald-600/25 active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white fill-current" />
                  <span>{config.copy.primaryButtonText}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSecondaryEmail}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{config.copy.secondaryButtonText}</span>
                </button>
              </div>

              {/* Transparency note */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
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
