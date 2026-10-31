import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  CheckCircle2,
  Download,
  ArrowLeft,
  Loader2,
  FileText,
  User,
  Mail,
  Building2,
  Briefcase,
  Globe2,
  Phone,
  Layers,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

import { savePdfLeadToStorage } from '../components/common/PdfDownloadModal';

const INDUSTRIES = [
  'Healthcare & Pharmaceuticals',
  'Technology, SaaS & Enterprise IT',
  'Financial Services & Fintech',
  'Consumer Goods & Retail (CPG)',
  'Automotive & Mobility',
  'Media, Telecom & Entertainment',
  'Management Consulting & Strategy',
  'Market Research & Data Analytics',
  'Academic & Institutional',
  'Other Commercial Sector'
];

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'India',
  'Singapore',
  'Germany',
  'France',
  'Canada',
  'Australia',
  'United Arab Emirates',
  'Saudi Arabia',
  'Japan',
  'South Korea',
  'Netherlands',
  'Switzerland',
  'Brazil',
  'Mexico',
  'Other / Global'
];

export default function GetPanelBookPage() {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    company: '',
    email: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Directly download the static 2026 Panel Book PDF
  const triggerPdfDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/downloads/Elicit-Research-Global-Panel-Book-2026.pdf';
      link.setAttribute('download', 'Elicit-Research-Global-Panel-Book-2026.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('[PDF Download Error]:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Save locally to guarantee persistence in Admin Panel
    savePdfLeadToStorage(formData);

    try {
      await fetch('/api/pdf-leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.warn('[Backend notice]: Saved to client store.', err);
    }

    // Automatically trigger download on form submission!
    triggerPdfDownload();
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-slate-800 dark:text-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-pink-300/15 via-purple-300/10 to-transparent dark:from-pink-500/10 dark:via-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header section */}
      <div className="py-12 sm:py-16 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link to="/" className="text-slate-600 hover:text-pink-600 dark:text-slate-400 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800/50 font-semibold text-[11px]">
              2026 Panel Book
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Download Global Sampling Capabilities &amp;{' '}
            <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 dark:from-pink-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Panel Book
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Comprehensive statistical quotas, country incidence rates (IR), length of interview (LOI) modeling, and anti-fraud methodology specifications.
          </p>
        </div>
      </div>

      {/* Form Content card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/90 dark:border-pink-500/20">
          
          {/* Download Information Banner */}
          {!submitted && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-purple-50/50 to-pink-50 dark:from-pink-950/40 dark:via-purple-950/30 dark:to-pink-950/40 border border-pink-200/80 dark:border-pink-800/40 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-pink-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm leading-snug truncate">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400 inline shrink-0" />
                    <span>Instant PDF Download</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate block mt-0.5">
                    Fill the form below &bull; PDF starts downloading immediately
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-white/10 text-pink-600 dark:text-pink-300 border border-pink-200 dark:border-white/15 shrink-0">
                11.2 KB PDF
              </div>
            </div>
          )}

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                  PDF Download Started!
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-900 dark:text-white">{formData.name || 'Partner'}</strong>! Your Panel Book is downloading now.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={triggerPdfDownload}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-sm shadow-md shadow-pink-500/25 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Again</span>
                </button>
                <Link
                  to="/panel"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Explore 5M+ Panel Matrix</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Exact 4 Fields matching live elicitresearch.com/get-panel-book/ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Your Name (required) */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name (required)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-3 rounded-full border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-sm transition-all"
                  />
                </div>

                {/* 2. Job Title */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full px-5 py-3 rounded-full border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-sm transition-all"
                  />
                </div>

                {/* 3. Company Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-5 py-3 rounded-full border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-sm transition-all"
                  />
                </div>

                {/* 4. Your Official Email (required) */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Official Email (required)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-3 rounded-full border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-sm transition-all font-mono"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-full bg-[#D81B60] hover:bg-[#C2185B] text-white font-semibold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
