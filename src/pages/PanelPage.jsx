
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  Download,
  Globe2,
  Users,
  ClipboardCheck,
  Gift,
  MessageCircle,
  X,
  Home,
  CheckCircle2,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { generatePanelBookPDF } from "../utils/pdfGenerator";
import AnimatedCounter from "../components/common/AnimatedCounter";
import PdfDownloadModal from "../components/common/PdfDownloadModal";

const regions = [
  { label: "North America", x: 115, y: 92, color: "#ec4899" },
  { label: "Europe", x: 300, y: 88, color: "#a855f7" },
  { label: "Asia Pacific", x: 438, y: 108, color: "#06b6d4" },
  { label: "South America", x: 190, y: 210, color: "#d946ef" },
  { label: "Australia", x: 478, y: 220, color: "#c084fc" },
];

const stats = [
  {
    value: "10K+",
    label: "Surveys Done",
    Icon: ClipboardCheck,
    style: "from-purple-500 to-violet-500",
  },
  {
    value: "30M+",
    label: "Rewarded So Far",
    Icon: Gift,
    style: "from-pink-500 via-rose-500 to-pink-600",
  },
];

const panelFeatures = [
  "Global audiences",
  "B2B & B2C samples",
];

const trustPoints = [
  "ESOMAR 28 Compliant",
  "Triple-Layer Fraud Scrubbing",
  "< 2-Hour Bidding Response",
];

export default function PanelPage() {
  const location = useLocation();
  const [panelBookModalOpen, setPanelBookModalOpen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.hash, location.pathname]);


  return (
    <main className="relative w-full min-w-0 overflow-x-clip bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">

      {/* HERO SECTION — FULL VIEWPORT HEIGHT */}
      <section id="panel-hero" className="relative isolate flex min-h-[100vh] min-h-[100svh] w-full flex-col justify-center overflow-hidden border-b border-white/10"
        style={{
          paddingTop: "clamp(8rem, 14vh, 10rem)",
          paddingBottom: "clamp(2rem, 4vh, 3rem)",
        }}
      >
        {/* Background glows and grid */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[420px] w-[min(1200px,120vw)] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-500/20 via-indigo-500/15 to-transparent blur-3xl sm:h-[600px]" />

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:right-1/4" />

          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl sm:left-1/4" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Hero content grid */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-3 sm:px-8 sm:py-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-4">

          {/* LEFT COLUMN */}
          <div className="flex min-w-0 flex-col items-center text-center order-1 md:order-2 lg:order-1 lg:items-start lg:text-left">

            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex items-center gap-3 text-sm sm:mb-6"
            >
              <Link
                to="/"
                className="text-slate-600 transition-colors hover:text-pink-600 dark:text-slate-300 dark:hover:text-pink-300"
              >
                Home
              </Link>

              <span className="text-pink-500">/</span>

              <span className="rounded-full border border-pink-200 bg-white/80 px-4 py-2 font-semibold text-pink-700 shadow-sm backdrop-blur-md dark:border-pink-800/50 dark:bg-pink-950/60 dark:text-pink-300">
                Panel
              </span>
            </nav>

            {/* Eyebrow */}
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-pink-200 bg-white/60 px-3 py-2.5 shadow-sm backdrop-blur-md sm:mb-6 sm:px-4 sm:py-3 dark:border-pink-400/20 dark:bg-white/5">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500" />

              <span className="text-[9px] font-bold uppercase leading-relaxed tracking-[0.12em] text-slate-700 sm:text-xs sm:tracking-[0.18em] dark:text-slate-200">
                Global Market Research &amp; Intelligence Solutions · <AnimatedCounter value="45+" duration={1800} /> Countries
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-display font-extrabold leading-[1.22] tracking-tight text-slate-900 dark:text-white overflow-visible">
              <span className="block py-1 pb-2">
                A Global Community.
              </span>
              <span className="mt-0.5 block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent leading-tight py-1 pb-2">
                Real Human Insights.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Discover our global panel community connecting diverse audiences
              with research that helps businesses understand people and make
              informed decisions.
            </p>

            {/* Buttons */}
            <div className="hidden md:flex mt-6 w-full flex-col items-stretch justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <Link
                to="/contact"
                className="group/button inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/25 sm:px-6 sm:py-4"
              >
                Connect With Our Team
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
              </Link>

              <a
                href="#panel-overview"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white/75 px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:bg-white sm:px-6 sm:py-4 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Explore Our Panel
                <ArrowUpRight className="h-5 w-5 text-purple-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

            {/* Trust points */}
            <div className="mt-6 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-2.5 text-[11px] font-medium text-slate-600 sm:mt-7 sm:gap-x-6 sm:gap-y-3 sm:text-sm lg:justify-start dark:text-slate-300">
              {trustPoints.filter(item => item !== "Quality-focused research").map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </span>
              ))}
             <span className="hidden items-center gap-2 md:inline-flex">
  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
  Quality-focused research
</span>
            </div>
          </div>

          {/* RIGHT COLUMN — HERO IMAGE */}
          <div className="relative order-2 md:order-1 lg:order-2 mx-auto w-full max-w-xl lg:max-w-none">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-pink-500/25 via-purple-500/20 to-cyan-400/20 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative h-[260px] overflow-hidden rounded-3xl border border-white/60 bg-slate-200 shadow-2xl shadow-purple-900/15 sm:h-[360px] lg:h-[430px] dark:border-white/10">
              <img
                src="/images/Home/media-generation-elicit-panel-more-different-0-d8a9513d-7713-40fa-bd1a-136e3097f756.webp"
                alt="A diverse research team collaborating around a table"
                className="h-full w-full object-cover object-center"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="order-3 mt-6 flex w-full flex-col items-stretch justify-center gap-3 md:hidden sm:mt-7">
            <Link
              to="/contact"
              className="group/button inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/25 sm:px-6 sm:py-4"
            >
              Connect With Our Team
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
            </Link>

            <a
              href="#panel-overview"
              className="group inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white/75 px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:bg-white sm:px-6 sm:py-4 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Explore Our Panel
              <ArrowUpRight className="h-5 w-5 text-purple-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </section>

      {/* PANEL OVERVIEW */}
      <div id="sampling" className="scroll-mt-24" />
      <section
        id="panel-overview" data-alias="sampling"
        className="relative scroll-mt-24 border-y border-slate-200/80 bg-white py-12 sm:py-16 lg:py-12 dark:border-white/5 dark:bg-slate-900"
      >
        <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full border-[24px] border-pink-100/70 dark:border-pink-400/10" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400">
              A Trusted Global Community
            </span>

            <h2 className="mt-4 max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
              Know Our Superior
              <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                Elicit Panel
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Our globally acknowledged panel helps deliver solution-based
              research, contributed by business professionals as well as
              consumers. With a commitment to unbiased research, we incorporate
              questions every year that include demographic data, diverse
              market characteristics, media outreach, and personal preferences.
              This helps businesses gain a better understanding of diverse
              customer segments.
            </p>

            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-600/20 transition hover:-translate-y-0.5 hover:from-pink-700 hover:to-rose-700 hover:shadow-xl active:scale-95"
            >
              Connect With Our Team
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 p-4 text-white shadow-xl shadow-pink-500/15 transition duration-300 hover:-translate-y-1 sm:min-h-[320px] sm:p-7">
              <Users className="h-7 w-7 text-white/90 sm:h-8 sm:w-8" />

              <div>
                <p className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                  <AnimatedCounter value="5M+" duration={1800} />
                </p>
                <p className="mt-2 text-xs font-medium text-white/90 sm:text-sm">
                  Panel Members
                </p>
              </div>

              <div className="h-1 w-12 rounded-full bg-white/70" />
            </div>

            <div className="grid gap-3 sm:gap-5">
              {stats.map(({ value, label, Icon, style }) => (
                <div
                  key={label}
                  className={`flex min-h-[120px] flex-col justify-between rounded-3xl bg-gradient-to-br ${style} p-4 text-white shadow-xl transition duration-300 hover:-translate-y-1 sm:min-h-[150px] sm:p-6`}
                >
                  <Icon className="h-6 w-6 text-white/90 sm:h-7 sm:w-7" />

                  <div>
                    <p className="text-xl font-extrabold sm:text-3xl">
                      <AnimatedCounter value={value} duration={1800} />
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-white/90 sm:text-xs">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section id="reach" className="scroll-mt-24 border-b border-slate-200/80 bg-slate-50 py-12 sm:py-16 lg:py-12 dark:border-white/5 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400">
              Worldwide Research Network
            </span>

            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
              Global Reach.
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                Trustworthy Data.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Our dynamic sampling platform connects directly with audiences
              representing the populations we study, supporting online and
              offline B2B and B2C samples. Our global reach helps businesses
              access diverse opinions and perspectives. We focus on trustworthy
              data, accurate analysis, and insights that support informed
              business decisions and a better customer experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {panelFeatures.map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-pink-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Global Map */}
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur-md sm:min-h-[390px] sm:p-8 dark:border-white/10 dark:bg-slate-900/70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.12),transparent_65%)]" />

            <Globe2
              className="absolute h-56 w-56 text-slate-200/80 sm:h-80 sm:w-80 dark:text-white/5"
              strokeWidth={0.7}
            />

            <svg
              viewBox="0 0 600 320"
              role="img"
              aria-label="Illustration of our global research reach"
              className="relative z-10 mb-10 w-full max-w-xl sm:mb-12"
            >
              <defs>
                <linearGradient
                  id="panelMapFill"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f9a8d4" stopOpacity=".7" />
                  <stop offset="50%" stopColor="#c4b5fd" stopOpacity=".65" />
                  <stop offset="100%" stopColor="#67e8f9" stopOpacity=".6" />
                </linearGradient>
              </defs>

              <g
                fill="url(#panelMapFill)"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeOpacity=".75"
              >
                <path d="M55 80 L85 55 L130 48 L160 65 L190 62 L210 85 L190 110 L165 115 L150 145 L125 151 L112 180 L92 163 L83 130 L61 119 Z" />
                <path d="M170 174 L198 182 L218 214 L207 247 L194 286 L177 260 L170 224 L154 198 Z" />
                <path d="M260 70 L287 58 L318 68 L335 86 L365 83 L382 98 L370 116 L342 120 L326 143 L306 137 L292 111 L268 105 Z" />
                <path d="M305 145 L340 136 L370 153 L385 185 L367 218 L348 243 L326 225 L319 193 L300 171 Z" />
                <path d="M380 82 L424 62 L477 70 L518 96 L504 120 L465 130 L444 151 L414 138 L398 114 Z" />
                <path d="M453 205 L485 198 L512 215 L505 238 L480 250 L457 232 Z" />
              </g>

              {regions.map(({ label, x, y, color }) => (
                <g key={label}>
                  <path
                    d={`M ${x} ${y} L ${x} ${y + 35}`}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <circle cx={x} cy={y} r="12" fill={color} />
                  <circle cx={x} cy={y} r="5" fill="white" />
                </g>
              ))}
            </svg>

            <div className="absolute bottom-3 left-2 right-2 z-20 flex flex-wrap justify-center gap-1.5 sm:bottom-5 sm:left-3 sm:right-3 sm:gap-2">
              {regions.map(({ label, color }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2 py-2 text-[9px] font-semibold text-slate-600 shadow-sm sm:px-3 sm:text-[10px] dark:border-white/10 dark:bg-slate-950/90 dark:text-slate-300"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PANEL BOOK DUAL SPLIT BANNER (MATCHING IMAGE 1)
         ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 w-full border-t border-slate-200/80 dark:border-white/10">

        {/* Left Side: Vibrant Pink "DOWNLOAD OUR PANEL BOOK" */}
        <div className="lg:col-span-6 bg-[#d91b5c] p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden min-h-[320px] sm:min-h-[360px]">
          <div>
            {/* Document download icon matching Image 1 */}
            <div className="mb-6">
              <svg className="w-14 h-18 sm:w-16 sm:h-20 text-white" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 2h10l6 6v18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 12v7" />
                <path d="m8.5 15.5 3.5 3.5 3.5-3.5" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold uppercase tracking-tight !text-white leading-tight max-w-md">
              DOWNLOAD OUR PANEL BOOK
            </h2>
          </div>

          <div className="pt-6 sm:pt-8 mt-6">
            <button
              type="button"
              onClick={() => setPanelBookModalOpen(true)}
              className="text-base sm:text-lg font-semibold !text-white hover:underline inline-flex items-center gap-1.5 focus:outline-none transition-all group"
            >
              <span>Download</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Right Side: Clean White Background "Your opinions shape the world around us." */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/10 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-slate-900 dark:text-white relative overflow-hidden min-h-[320px] sm:min-h-[360px]">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3.5xl font-display font-bold text-slate-900 dark:text-white leading-snug sm:leading-snug max-w-xl">
              Your opinions shape the world around us. Your voice has a value that influences products, services and businesses
            </h2>
          </div>

          <div className="pt-6 sm:pt-8 mt-6">
            <Link
              to="/panel"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#d91b5c] hover:bg-[#c21850] text-white font-semibold text-sm sm:text-base shadow-md transition-all active:scale-95"
            >
              Visit our panel platform
            </Link>
          </div>
        </div>

      </section>

      {/* =========================================================================
          PREMIUM AUTOMATIC LEAD CAPTURE & PDF DOWNLOAD MODAL
         ========================================================================= */}
      <PdfDownloadModal
        isOpen={panelBookModalOpen}
        onClose={() => setPanelBookModalOpen(false)}
      />
    </main>
  );
}

