import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Search,
  BarChart3,
  Target,
  Globe2,
  Lightbulb,
  Database,
  Users,
  Compass,
  Workflow,
  ClipboardCheck,
  Zap,
  Activity,
  Check,
  Layers,
  FileCheck,
  Award,
  ChevronRight,
  Building2,
  MapPin,
  Play,
  X,
  Rocket,
  Cpu,
  Globe,
  HelpCircle,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';


import GlobalReachVisual from '../components/home/GlobalReachVisual';
import ServicesMatrix from '../components/home/ServicesMatrix';
import MethodologyFlow from '../components/home/MethodologyFlow';
import Hero3DScene from '../components/home/Hero3DScene';
import GrowthAnalyticsChart from '../components/home/GrowthAnalyticsChart';
import RfqForm from '../components/contact/RfqForm';
import ScrollReveal from '../components/common/ScrollReveal';
import CountUp from '../components/common/CountUp';
import { COMPANY, FAQ_DATA } from '../data/companyData';
import { HUB_CITY_IMAGES } from '../data/imageAssets';

// Curated high-resolution Unsplash assets for full-length showcase
const growthImage = "/pages/home/image1.webp";

export default function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative w-full min-w-0 overflow-x-hidden bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
      
      {/* =========================================================================
          HERO SECTION — "WE Provide Authentic Data, Credible Insights, & Successful Strategies"
          + Full-Length Expansive Growth Showcase
         ========================================================================= */}
      <section
        className="hero-section relative isolate flex flex-col justify-center items-center overflow-hidden border-b border-white/10 w-full min-h-[100dvh] h-[100dvh] lg:h-auto lg:min-h-screen pt-14 pb-3 sm:pt-16 sm:pb-4 lg:pt-[96px] lg:pb-0"
      >
        
        {/* Subtle background ambient glowing gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-pink-500/20 via-indigo-500/15 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Ambient 3D Interactive Canvas Scene */}
        <Hero3DScene className="opacity-60" />

        <div className="relative z-10 mx-auto flex flex-col lg:grid lg:grid-cols-2 items-center justify-center gap-2 sm:gap-4 lg:gap-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-auto lg:py-6">
          
          {/* Top Hero Editorial Content — matching PanelPage layout */}

            {/* ── LEFT: Heading / Description / CTAs / Trust Bar ── */}
            <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left space-y-2 sm:space-y-4">

              {null}

              {/* Exact Headline: "WE Provide Authentic Data, Credible Insights, & Successful Strategies" */}
              <ScrollReveal animation="fade-up" delay={100} duration={650}>
                <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl xl:text-[2.65rem] font-display font-extrabold text-slate-900 dark:text-white leading-[1.2] tracking-tight">
                  <span className="inline-block bg-gradient-to-r from-pink-600 to-rose-600 text-white px-2 py-0.5 rounded-md sm:rounded-lg shadow-xs mr-1.5 text-xs xs:text-sm sm:text-2xl lg:text-3xl align-middle font-bold">
                    WE
                  </span>
                  <span>Provide Authentic Data,</span>{' '}
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 dark:from-pink-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent block sm:inline">
                    Credible Insights, &amp; Successful Strategies
                  </span>
                </h1>
              </ScrollReveal>

              {/* Subheadline — full, comfortable, beautifully proportioned */}
              <ScrollReveal animation="fade-up" delay={200} duration={650}>
                <p className="mt-1 sm:mt-3 max-w-xl lg:max-w-none mx-auto lg:mx-0 text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  Elicit Research &amp; Insights Inc. empowers enterprise brands with precision B2B and B2C sampling, advanced survey programming, and empirical intelligence that drives compounding growth.
                </p>
              </ScrollReveal>

              {/* Desktop-only: Primary CTAs in left column */}
              <div className="hidden lg:block">
                <ScrollReveal animation="fade-up" delay={300} duration={650}>
                  <div className="pt-2 flex flex-row items-center justify-start gap-3 sm:gap-4">
                    <a
                      href="#rfq-section"
                      className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-md sm:shadow-lg shadow-pink-600/20 hover:shadow-xl transition-all duration-300 transform active:scale-95 text-center"
                    >
                      <span>Let's Discuss Your Project</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>

                    <a
                      href="#services-section"
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-300 shadow-xs text-center"
                    >
                      <span>Explore Our Services</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </a>
                  </div>
                </ScrollReveal>
              </div>

            </div>
            {/* ── END LEFT ── */}

            {/* ── RIGHT: Hero Image + Mobile CTAs directly underneath ── */}
            <ScrollReveal animation="fade-up" delay={200} duration={900}>
              <div className="relative flex flex-col items-center justify-center lg:justify-end mt-1.5 sm:mt-2 lg:mt-0">
                <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[480px] lg:max-w-none mx-auto">
                  <GrowthAnalyticsChart />
                </div>

                {/* Mobile-only CTAs directly below the chart: Matching PanelPage gaps */}
                <div className="mt-2.5 sm:mt-4 flex flex-col items-center justify-center gap-2 sm:gap-2.5 w-full lg:hidden">
                  <a
                    href="#rfq-section"
                    className="w-full max-w-[280px] inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-pink-700 hover:to-rose-700 hover:shadow-xl active:scale-95 text-center"
                  >
                    <span>Let's Discuss Project</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </a>

                  <a
                    href="#services-section"
                    className="w-full max-w-[280px] inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:hover:bg-white/10 text-center"
                  >
                    <span>Explore Our Services</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
            {/* ── END RIGHT ── */}

          </div>
      </section>

      {/* =========================================================================
          SECTION 2: "Insights. Innovation. Impact" & The 3 Stat Blocks (Page 1)
         ========================================================================= */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-white/5">
        {/* Ambient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Authentic Copy from Page 1 of Reference */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              <ScrollReveal animation="fade-up" duration={650}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  Insights.{' '}
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 dark:from-pink-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent">
                    Innovation.
                  </span>{' '}
                  Impact
                </h2>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={120} duration={650}>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                  Elicit Research &amp; Insights Inc. helps you to make the right decisions and stay ahead of competition with technological, statistical and comprehensive market research. We connect you with the right audience; our solution helps you discover opportunities and accelerate your growth.
                </p>
              </ScrollReveal>

             </div>
 
             {/* Right Column: 3 Offset Colorful Stat Blocks */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <ScrollReveal animation="fade-up" delay={200} duration={700}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 relative">
                  
                  {/* Card 1: 60+ Clients (Teal Card) */}
                  <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg sm:shadow-xl shadow-teal-500/20 transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[130px] sm:min-h-[150px]">
                    <div className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                      <CountUp value="60+" duration={2800} />
                    </div>
                    <div>
                      <span className="text-sm sm:text-base font-bold block">Clients</span>
                      <span className="text-xs text-teal-100 opacity-90">Global Enterprise Leaders</span>
                    </div>
                  </div>

                  {/* Card 2: 30+ Countries (Blue Card) */}
                  <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg sm:shadow-xl shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[130px] sm:min-h-[150px]">
                    <div className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                      <CountUp value="30+" duration={2800} />
                    </div>
                    <div>
                      <span className="text-sm sm:text-base font-bold block">Countries</span>
                      <span className="text-xs text-blue-100 opacity-90">Audited Cross-Border Markets</span>
                    </div>
                  </div>

                  {/* Card 3: 130+ Experts (Pink/Magenta Card) */}
                  <div className="sm:col-span-2 lg:col-span-2 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-600 to-rose-600 text-white shadow-lg sm:shadow-xl shadow-pink-500/20 transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[130px] sm:min-h-[150px]">
                    <div className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                      <CountUp value="130+" duration={2800} />
                    </div>
                    <div>
                      <span className="text-sm sm:text-base font-bold block">Experts</span>
                      <span className="text-xs text-pink-100 opacity-90">PhD Methodologists &amp; Analysts</span>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "Explore Our Services" (10 Core Capabilities Grid)
         ========================================================================= */}
      <section id="services-section" className="py-12 sm:py-16 lg:py-12 bg-slate-50 dark:bg-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-5 sm:mb-8">
            <ScrollReveal animation="fade-up" duration={600}>
              <div className="max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-pink-600 dark:text-pink-400 font-semibold px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800/50 inline-block mb-3">
                  Comprehensive Portfolio
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                  Explore Our Services
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-semibold mt-2">
                  Our feature-rich services are meant for your success.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                  With a reliable and efficient team, we garner technology and innovation for extending the best solutions to you.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150} duration={600}>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xs hover:bg-slate-100 dark:hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                <span>View Full Service Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>

          <ServicesMatrix />
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DUAL SPLIT BANNER
         ========================================================================= */}
      <section className="py-12 sm:py-16 lg:py-12 bg-slate-50 dark:bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal animation="fade-up" duration={700}>
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl grid grid-cols-1 lg:grid-cols-12 border border-slate-200 dark:border-white/10">
              
              {/* Left Side: Vibrant Magenta Quote Banner */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white/40 block mb-2 leading-none">“</span>
                  <blockquote className="text-base sm:text-xl lg:text-2xl font-display font-bold leading-snug tracking-tight text-white">
                    Our market research experts develop ground-breaking analyses and assist you in fueling your business across international boundaries
                  </blockquote>
                </div>

                <div className="pt-6 sm:pt-8 mt-6 border-t border-white/20 flex items-center justify-between">
                  <div className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-pink-100 font-semibold truncate mr-2">
                    Elicit Research &amp; Insights Inc.
                  </div>
                  <Award className="w-5 h-5 text-white/80 shrink-0" />
                </div>
              </div>

              {/* Right Side: Midnight Charcoal / Slate Skyrocket CTA */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col justify-between relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/10">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 flex items-center justify-center text-pink-600 dark:text-pink-400 shadow-sm sm:shadow-md">
                    <Rocket className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                    Skyrocket Your Business To The Next Level!
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm sm:leading-relaxed">
                    Partner with Elicit Research for guaranteed data authenticity, rapid bidding turnaround, and empirical clarity.
                  </p>
                </div>

                <div className="pt-6 sm:pt-8 mt-6">
                  <a
                    href="#rfq-section"
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-md sm:shadow-lg shadow-pink-600/30 transition-all duration-300 transform active:scale-95 w-full sm:w-auto text-center"
                  >
                    <span>Select our Clientship</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>





      {/* =========================================================================
          INTERACTIVE RFQ & BIDDING DESK SECTION
         ========================================================================= */}
      <section 
        id="rfq-section" 
        className="relative py-12 sm:py-16 lg:py-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden border-t border-white/5"
      >
        {/* Legacy #contact anchor support */}
        <div id="contact" className="absolute -top-20 opacity-0 pointer-events-none" />

        {/* Ambient lighting */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Bidding Desk SLA & Direct Contacts */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <ScrollReveal animation="fade-up" duration={600}>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Commission Your Research Study.
                </h2>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100} duration={650}>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  Submit your sample specs, target incidence rate, and questionnaire length. Our bidding architects evaluate feasibility and provide comprehensive rate cards within two business hours.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200} duration={650}>
                <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 space-y-1 shadow-xs">
                  <div className="font-semibold text-slate-900 dark:text-white">Global Operating Hubs:</div>
                  <div className="text-slate-500 dark:text-slate-400">
                    New York · London · Singapore · Bengaluru
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Embedded RfqForm */}
            <div className="lg:col-span-7 w-full">
              <ScrollReveal animation="fade-up" delay={200} duration={700}>
                <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 sm:p-8 backdrop-blur-xl shadow-xl">
                  <div className="mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
                    <h3 className="text-lg sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                      Request for Quotation (RFQ)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Fill out your study parameters below for an immediate feasibility check.
                    </p>
                  </div>
                  <RfqForm initialType="rfq" />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE VIDEO MODAL (TRIGGERED BY "WATCH VIDEO")
         ========================================================================= */}
      {videoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-100 dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/20 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Elicit Research Platform Overview
                </span>
              </div>
              <button 
                onClick={() => setVideoOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Embedded Presentation / Demo Screen */}
            <div className="relative aspect-video w-full bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center text-white mb-6 shadow-xl shadow-pink-600/30">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <h4 className="text-2xl font-display font-bold text-white max-w-md">
                Empirical Market Intelligence in Action
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mt-2">
                Discover how Elicit Research connects enterprise decision-makers with over 5,000,000 verified panelists across 45+ international markets with zero synthetic fraud.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-pink-300 border border-white/10">
                  Quantitative Programming
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/10">
                  Qualitative IDIs
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/10">
                  Global Feasibility
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}

