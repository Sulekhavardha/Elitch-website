import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, CheckCircle2, Download, ArrowLeft, Loader2 } from 'lucide-react';
import { generatePanelBookPDF } from '../utils/pdfGenerator';

export default function GetPanelBookPage() {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    companyName: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      try {
        generatePanelBookPDF();
      } catch (err) {
        console.error('Error generating PDF:', err);
      }
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-24 text-slate-800 dark:text-slate-100">
      {/* Top Header section matching Image 2 with crisp white background */}
      <div className="bg-white dark:bg-slate-900 py-16 sm:py-24 text-center border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-pink-600 dark:text-pink-400 tracking-tight">
            Get Panel Book
          </h1>

          {/* Breadcrumb pill */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-white/10">
            <Link to="/" className="flex items-center gap-1 hover:text-pink-600 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-pink-600 dark:text-pink-400">Get Panel Book</span>
          </div>
        </div>
      </div>

      {/* Form Content area matching Image 2 */}
      <div className="max-w-4xl mx-auto px-6 -mt-6 sm:-mt-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-12 shadow-xl border border-slate-200/80 dark:border-white/10">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                Thank You, {formData.name || 'Partner'}!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Your official <strong>Elicit Research Global Panel Book (2026 Edition)</strong> has been generated and downloaded.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => generatePanelBookPDF()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Again</span>
                </button>
                <Link
                  to="/panel"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Panel</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Input 1: Your Name (required) */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Your Name <span className="text-pink-600">(required)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-full px-5 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all"
                  />
                </div>

                {/* Input 2: Job Title */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-full px-5 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all"
                  />
                </div>

                {/* Input 3: Company Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-full px-5 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all"
                  />
                </div>

                {/* Input 4: Your Official Email (required) */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Your Official Email <span className="text-pink-600">(required)</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-full px-5 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-full bg-pink-600 hover:bg-pink-700 active:scale-95 text-white font-semibold text-sm transition-all shadow-md shadow-pink-600/20 disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Submit</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
