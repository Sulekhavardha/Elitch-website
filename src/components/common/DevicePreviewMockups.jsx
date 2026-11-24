import React, { memo } from 'react';

/**
 * Laptop frame rendering the actual website preview inside.
 * Scaled dynamically via CSS variable or props.
 * Strictly constrained with aspect ratio and internal dimensions so it never overflows.
 */
export const LaptopPreviewFrame = memo(function LaptopPreviewFrame({
  previewUrl,
  brandName = 'Elicit Research',
  compact = false,
}) {
  return (
    <div className="relative w-full select-none group">
      {/* Laptop Top Case / Display Screen */}
      <div className={`relative rounded-t-lg sm:rounded-t-xl bg-slate-900 shadow-xl border border-slate-700/80 ring-1 ring-white/10 ${compact ? 'p-1 sm:p-1.5' : 'p-1.5 sm:p-2'}`}>
        {/* Camera notch / dot */}
        <div className="absolute top-0.5 sm:top-1 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20">
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/80" />
          </div>
        </div>

        {/* Browser URL Bar header inside laptop */}
        <div className={`flex items-center gap-1 sm:gap-1.5 bg-slate-800/90 rounded-t-xs sm:rounded-t-sm border-b border-slate-700/60 ${compact ? 'px-1.5 py-0.5 mb-0.5' : 'px-2 py-0.5 sm:py-1 mb-0.5 sm:mb-1'}`}>
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex-1 bg-slate-900/90 text-[8px] sm:text-[10px] font-mono text-slate-300 px-1.5 py-0.2 sm:py-0.5 rounded border border-slate-700/50 flex items-center justify-between truncate min-w-0">
            <span className="truncate">https://preview.{brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com</span>
            <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-emerald-400 font-semibold ml-1 shrink-0">Live</span>
          </div>
        </div>

        {/* Display Viewport with scaled responsive iframe */}
        <div className="relative w-full bg-slate-950 rounded-b-xs sm:rounded-b-sm overflow-hidden aspect-[16/10] border border-slate-800">
          <div
            className="w-[1280px] h-[800px] origin-top-left pointer-events-none select-none"
            style={{
              transform: 'scale(var(--laptop-scale, 0.28))',
              width: '1280px',
              height: '800px',
            }}
          >
            <iframe
              src={previewUrl}
              title="Laptop Live Website Preview"
              name="project-preview-frame"
              tabIndex={-1}
              aria-hidden="true"
              className="w-[1280px] h-[800px] border-0 bg-slate-50 dark:bg-slate-950"
              loading="eager"
            />
          </div>
          {/* Transparent overlay */}
          <div className="absolute inset-0 bg-transparent pointer-events-auto" />
        </div>
      </div>

      {/* Laptop Bottom Case & Hinge */}
      <div className={`relative -mt-0.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-b-md sm:rounded-b-lg shadow-md border-t border-slate-600/50 flex items-center justify-center ${compact ? 'h-1.5 sm:h-2' : 'h-2 sm:h-2.5'}`}>
        {/* Notch cutout */}
        <div className="w-8 sm:w-12 h-0.5 rounded-b-xs bg-slate-950/80" />
      </div>
      {/* Laptop shadow */}
      <div className="mx-auto w-[90%] h-1 sm:h-1.5 bg-black/40 blur-xs rounded-full mt-0.5" />
    </div>
  );
});

/**
 * Clean Generic Smartphone frame rendering the website's mobile preview.
 * - No notch, no Dynamic Island, no camera cutout, and no decorative shape at the top.
 * - Screen is completely clear from edge to edge so header and first content are fully visible.
 */
export const PhonePreviewFrame = memo(function PhonePreviewFrame({
  previewUrl,
  brandName = 'Elicit',
  compact = false,
}) {
  return (
    <div className="relative w-full select-none group">
      {/* Clean phone chassis with subtle uniform bezel */}
      <div className={`relative bg-slate-900 shadow-xl border border-slate-700/80 ring-1 ring-white/10 ${compact ? 'rounded-[12px] sm:rounded-[18px] p-1' : 'rounded-[16px] sm:rounded-[20px] p-1 sm:p-1.5'}`}>
        
        {/* Clean edge-to-edge screen display - no notch, no cutout, no island */}
        <div className={`relative w-full overflow-hidden aspect-[9/19] bg-slate-950 border border-slate-800 ${compact ? 'rounded-[8px] sm:rounded-[14px]' : 'rounded-[12px] sm:rounded-[16px]'}`}>
          <div
            className="w-[375px] h-[800px] origin-top-left pointer-events-none select-none"
            style={{
              transform: 'scale(var(--phone-scale, 0.28))',
              width: '375px',
              height: '800px',
            }}
          >
            <iframe
              src={previewUrl}
              title="Mobile Live Website Preview"
              name="project-preview-frame"
              tabIndex={-1}
              aria-hidden="true"
              className="w-[375px] h-[800px] border-0 bg-slate-50 dark:bg-slate-950"
              loading="eager"
            />
          </div>
          {/* Transparent interaction block */}
          <div className="absolute inset-0 bg-transparent pointer-events-auto" />
        </div>
      </div>
      {/* Phone subtle drop shadow */}
      <div className="mx-auto w-[85%] h-1 sm:h-1.5 bg-black/45 blur-xs rounded-full mt-0.5" />
    </div>
  );
});
