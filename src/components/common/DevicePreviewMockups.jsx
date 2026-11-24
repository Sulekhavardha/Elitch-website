import React, { memo } from 'react';

/**
 * Laptop frame rendering the actual website preview inside.
 * Uses an iframe of current origin or responsive clone with sandboxed pointer/scroll.
 */
export const LaptopPreviewFrame = memo(function LaptopPreviewFrame({
  previewUrl,
  brandName = 'Elicit Research',
}) {
  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none group">
      {/* Laptop Top Case / Display Screen */}
      <div className="relative rounded-t-xl bg-slate-900 p-2 sm:p-2.5 shadow-2xl border border-slate-700/80 ring-1 ring-white/10">
        {/* Camera notch / dot */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/80" />
          </div>
        </div>

        {/* Browser URL Bar header inside laptop */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/90 rounded-t-md mb-1 border-b border-slate-700/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex-1 bg-slate-900/90 text-[10px] sm:text-[11px] font-mono text-slate-300 px-2.5 py-0.5 rounded border border-slate-700/50 flex items-center justify-between truncate">
            <span className="truncate">https://preview.{brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com</span>
            <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-semibold ml-1.5 shrink-0">Live</span>
          </div>
        </div>

        {/* Display Viewport with scaled responsive iframe */}
        <div className="relative w-full bg-slate-950 rounded-b-md overflow-hidden aspect-[16/10] border border-slate-800">
          <div
            className="w-[1280px] h-[800px] origin-top-left pointer-events-none select-none"
            style={{
              transform: 'scale(var(--laptop-scale, 0.38))',
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
          {/* Subtle overlay to prevent click trapping while keeping full clarity */}
          <div className="absolute inset-0 bg-transparent pointer-events-auto" />
        </div>
      </div>

      {/* Laptop Bottom Case & Hinge */}
      <div className="relative -mt-0.5 h-3 sm:h-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-b-xl shadow-lg border-t border-slate-600/50 flex items-center justify-center">
        {/* Notch cutout for finger opening */}
        <div className="w-16 h-1 rounded-b-sm bg-slate-950/80" />
      </div>
      {/* Laptop base rubber feet shadow */}
      <div className="mx-auto w-[92%] h-2 bg-black/40 blur-md rounded-full mt-0.5" />
    </div>
  );
});

/**
 * Clean Generic Smartphone frame rendering the website's mobile preview.
 * - No notch, no Dynamic Island, no camera cutout, and no decorative shape at the top.
 * - Screen is completely clear from edge to edge so header and first content are fully visible.
 * - Subtle, clean bezel with balanced proportions.
 */
export const PhonePreviewFrame = memo(function PhonePreviewFrame({
  previewUrl,
  brandName = 'Elicit',
}) {
  return (
    <div className="relative w-[140px] sm:w-[155px] md:w-[170px] select-none shrink-0 group">
      {/* Clean phone chassis with subtle uniform bezel */}
      <div className="relative rounded-[22px] sm:rounded-[24px] bg-slate-900 p-1.5 sm:p-2 shadow-2xl border-2 border-slate-700/80 ring-1 ring-white/10">
        
        {/* Clean edge-to-edge screen display - no notch, no cutout, no island */}
        <div className="relative w-full rounded-[16px] sm:rounded-[18px] overflow-hidden aspect-[9/19] bg-slate-950 border border-slate-800">
          <div
            className="w-[375px] h-[800px] origin-top-left pointer-events-none select-none"
            style={{
              transform: 'scale(var(--phone-scale, 0.38))',
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
      <div className="mx-auto w-[85%] h-2.5 bg-black/45 blur-md rounded-full mt-1" />
    </div>
  );
});
