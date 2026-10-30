import React, { useState, useMemo } from 'react';
import { FAQ_DATA, COMPANY } from '../data/companyData';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Mail,
  ArrowRight,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/common/ScrollReveal';

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState(0); // first item open by default

  // Flatten questions with category metadata
  const allQuestions = useMemo(() => {
    return FAQ_DATA.flatMap((cat, catIdx) =>
      cat.questions.map((q, qIdx) => ({
        ...q,
        category: cat.category,
        id: `${catIdx}-${qIdx}`,
      }))
    );
  }, []);

  // Filtered by Search Query & Selected Category
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allQuestions, activeCategory, searchQuery]);

  const toggleAccordion = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pt-20 pb-20">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-pink-300/15 via-purple-300/10 to-transparent dark:from-pink-500/10 dark:via-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            HEADER & SEARCH BAR
           ========================================================================= */}
        <div className="text-center space-y-4 pt-6 sm:pt-10 mb-8 sm:mb-12">
          
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link to="/" className="text-slate-600 hover:text-pink-600 dark:text-slate-400 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800/50 font-semibold text-[11px]">
              Knowledge Base
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 dark:from-pink-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Quick, transparent answers about our global sampling panel, turnaround times, automated survey engines, and data security.
          </p>

          {/* Search Input Box */}
          <div className="relative max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions by keyword: e.g. 'B2B', 'turnaround', 'fraud', 'pricing'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-10 py-3.5 sm:py-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {['All', ...FAQ_DATA.map((c) => c.category)].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20'
                    : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                }`}
              >
                {cat === 'All' ? 'All Topics' : cat.split(' & ')[0]}
              </button>
            ))}
          </div>

        </div>

        {/* =========================================================================
            QUESTIONS & ANSWERS ACCORDION LIST
           ========================================================================= */}
        <div className="space-y-3 sm:space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No matching questions found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                Try searching for a different keyword or contact our research desk directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 text-xs font-semibold transition-colors"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            filteredQuestions.map((item, idx) => {
              const isOpen = expandedIndex === idx;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white dark:bg-slate-900 border-pink-500/40 shadow-md shadow-pink-500/5'
                      : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  {/* Question Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-pink-600 text-white shadow-sm'
                            : 'bg-pink-50 text-pink-600 dark:bg-white/10 dark:text-pink-400'
                        }`}
                      >
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-pink-600 dark:text-pink-400 font-bold block mb-0.5">
                          {item.category}
                        </span>
                        <span className="text-sm sm:text-base font-display font-bold text-slate-900 dark:text-white leading-snug">
                          {item.q}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-pink-600 dark:text-pink-400' : ''
                      }`}
                    />
                  </button>

                  {/* Answer Box */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 animate-in fade-in duration-200">
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                        {item.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* =========================================================================
            BOTTOM CONTACT & ASSISTANCE CARD
           ========================================================================= */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
                Still have questions?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                Our research directors are ready to assist with custom sample feasibility and methodology.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact?type=quote"
              className="px-5 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              Contact Us
            </Link>
            <a
              href={`mailto:${COMPANY.emails.rfq}`}
              className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all"
            >
              Email RFQ Desk
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
