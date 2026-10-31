import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Mail,
  Building2,
  Briefcase,
  Globe2,
  Phone,
  Layers,
  MessageSquare,
  Loader2,
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

// Helper to ensure lead is guaranteed saved locally so Admin Panel always sees it instantly
export const savePdfLeadToStorage = (data) => {
  try {
    const existing = JSON.parse(localStorage.getItem('elicit_pdf_leads') || '[]');
    const newLead = {
      _id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      fullName: data.name,
      name: data.name,
      email: (data.email || '').toLowerCase().trim(),
      company: data.company,
      jobTitle: data.jobTitle,
      country: data.country,
      phone: data.phone,
      industry: data.industry,
      message: data.message || '',
      status: 'New',
      downloadCount: 1,
      source: 'Panel Page Modal',
      createdAt: new Date().toISOString()
    };
    const updated = [newLead, ...existing.filter((l) => l.email !== newLead.email)];
    localStorage.setItem('elicit_pdf_leads', JSON.stringify(updated));
    return newLead;
  } catch (err) {
    console.warn('[Storage Error]:', err);
  }
};

export default function PdfDownloadModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    company: '',
    email: ''
  });

  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('initiating'); // 'initiating' | 'started' | 'blocked'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const autoDownloadRef = useRef(false);

  // Directly download the static 2026 Panel Book PDF
  const triggerPdfDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/downloads/Elicit-Research-Global-Panel-Book-2026.pdf';
      link.setAttribute('download', 'Elicit-Research-Global-Panel-Book-2026.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadStatus('started');
      setDownloadTriggered(true);
    } catch (err) {
      console.warn('[PDF Download Error]:', err);
      setDownloadStatus('blocked');
    }
  };

  // Lock body scroll while modal is open (no auto-download on open)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    } else {
      // Reset state on close
      setSubmitted(false);
      setErrorMessage('');
      setDownloadTriggered(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    // 1. Immediately save locally so Admin Panel sees it 100% in real-time
    savePdfLeadToStorage(formData);

    // 2. Also send to backend
    try {
      await fetch('/api/pdf-leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.warn('[Backend notice - saved to local store]:', err);
    }

    // 3. Trigger automatic PDF download immediately upon filling the form!
    triggerPdfDownload();
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/90 dark:border-pink-500/20 overflow-hidden text-slate-800 dark:text-slate-100 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-rose-500/20 blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 sm:p-8">
          {/* Header */}
          <div className="text-center max-w-lg mx-auto mb-5 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-rose-500/10 dark:from-pink-500/20 dark:via-purple-500/20 dark:to-rose-500/20 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official 2026 Panel Book</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Global Sampling Capabilities &amp;{' '}
              <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 dark:from-pink-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent">
                Feasibility Metrics
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              Please complete the form below to immediately download the Official 2026 Panel Book (PDF).
            </p>
          </div>

          {/* Download Information Banner */}
          {!submitted && (
            <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-pink-50 via-purple-50/50 to-pink-50 dark:from-pink-950/40 dark:via-purple-950/30 dark:to-pink-950/40 border border-pink-200/80 dark:border-pink-800/40 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-pink-500/30">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs leading-snug truncate">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400 inline shrink-0" />
                    <span>Instant PDF Download</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                    Fill the form below &bull; PDF starts downloading immediately
                  </span>
                </div>
              </div>

              <div className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white dark:bg-white/10 text-pink-600 dark:text-pink-300 border border-pink-200 dark:border-white/15 shrink-0">
                11.2 KB PDF
              </div>
            </div>
          )}

          {/* FORM CONTENT OR SUCCESS STATE */}
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                  PDF Download Started!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-900 dark:text-white">{formData.name || 'Partner'}</strong>! Your Panel Book is downloading now.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={triggerPdfDownload}
                  className="px-6 py-2.5 rounded-full bg-[#D81B60] hover:bg-[#C2185B] text-white font-semibold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Again</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Exact 4 Fields matching live elicitresearch.com/get-panel-book/ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Your Name (required) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name (required)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-xs sm:text-sm transition-all"
                  />
                </div>

                {/* 2. Job Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-xs sm:text-sm transition-all"
                  />
                </div>

                {/* 3. Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-xs sm:text-sm transition-all"
                  />
                </div>

                {/* 4. Your Official Email (required) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Official Email (required)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-xs sm:text-sm transition-all font-mono"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 rounded-full bg-[#D81B60] hover:bg-[#C2185B] text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

