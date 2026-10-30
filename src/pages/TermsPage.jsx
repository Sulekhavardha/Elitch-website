import React, { useState, useMemo } from 'react';
import {
  FileText,
  Scale,
  ShieldCheck,
  Lock,
  FileCheck,
  ShieldAlert,
  Globe2,
  ChevronDown,
  Search,
  Mail,
  ArrowRight,
  MessageSquare,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/companyData';

export default function TermsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedClause, setExpandedClause] = useState(0);

  const TERMS_CLAUSES = [
    {
      id: 'agreement',
      num: '01',
      title: 'Agreement to Terms & Enterprise Authority',
      icon: Scale,
      summary: 'Binding legal contract for enterprise clients, partners, and platform users.',
      content: `By accessing or using the digital research platforms, automated survey engines, panel sampling APIs, and intelligence portals owned and operated by Elicit Research & Insights Inc., you explicitly agree to be bound by these Terms and Conditions. If you are entering into these terms on behalf of a corporation, institutional agency, or brand, you represent and warrant that you possess full legal authority to bind said entity to these covenants.`
    },
    {
      id: 'sow-deliverables',
      num: '02',
      title: 'Enterprise Statements of Work (SOWs) & Bidding Desk',
      icon: FileText,
      summary: 'Custom scope, turnaround schedules, sample sizes, and empirical deliverables.',
      content: `All bespoke quantitative sampling, custom questionnaire scripting, qualitative focus recruitment, and advanced econometric modeling rendered by Elicit Research are executed under customized Statements of Work (SOWs) confirmed via our RFQ bidding desk (${COMPANY.emails.rfq}). Each SOW specifies target incident rates (IR), length of interview (LOI), certified sample quotas, and milestone timelines.`
    },
    {
      id: 'panel-integrity',
      num: '03',
      title: 'Panelist Conduct, Honeypot Scrubbing & Anti-Fraud',
      icon: ShieldCheck,
      summary: 'Strict human verification, bot prevention, and ESOMAR 28 compliant fraud screening.',
      content: `Respondents participating across our 5M+ proprietary global panel agree to provide truthful, thoughtful, and unassisted human responses. The use of automated bot scripts, headless browsers, synthetic generative AI models, duplicate panel accounts, VPN spoofing, or fraudulent credentials constitutes unlawful fraud. Such activity triggers immediate expulsion, forfeiture of accrued incentive balances, and potential legal remedies under international cybersecurity statutes.`
    },
    {
      id: 'ip-data-ownership',
      num: '04',
      title: 'Intellectual Property & Exclusive Dataset Rights',
      icon: Lock,
      summary: 'Full client ownership of research data upon settlement of project invoices.',
      content: `Upon full settlement of agreed project fees, clients retain exclusive, perpetual, and unencumbered ownership of final cleaned raw data files (CSV/SPSS), custom analytical decks, infographics, and strategic empirical conclusions. Elicit Research retains all proprietary copyrights to its underlying survey scripting architectures, digital fingerprinting technologies, and honeypot validation algorithms.`
    },
    {
      id: 'confidentiality',
      num: '05',
      title: 'Confidentiality, Non-Disclosure & Security Protocols',
      icon: FileCheck,
      summary: 'Enterprise-grade encryption, mutual NDAs, and ISO-aligned data handling.',
      content: `Both parties agree that all confidential business strategies, unreleased product prototypes, respondent PII, pricing schedules, and proprietary trade secrets disclosed during any research engagement shall remain strictly confidential. We enforce bank-grade TLS 1.3 encryption in transit and AES-256 at rest, adhering to strict GDPR, CCPA, and ESOMAR data protection standards.`
    },
    {
      id: 'liability',
      num: '06',
      title: 'Limitation of Liability & Indemnification',
      icon: ShieldAlert,
      summary: 'Equitable allocation of commercial risks and standard industry limitations.',
      content: `To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, consequential, punitive, or special damages arising out of or related to our research services. Elicit Research's aggregate liability for any direct claims shall be strictly capped at the total professional fees actually paid by the client under the specific SOW giving rise to liability.`
    },
    {
      id: 'jurisdiction',
      num: '07',
      title: 'Governing Law & International Dispute Resolution',
      icon: Globe2,
      summary: 'Enforceability under the laws of New York, USA with mutual arbitration.',
      content: `These terms shall be governed by, construed, and enforced in accordance with the substantive laws of the State of New York, United States of America, without giving effect to conflict of law principles. Any dispute or claim arising out of these terms shall be resolved through confidential binding arbitration conducted in English under the Commercial Arbitration Rules of the American Arbitration Association.`
    }
  ];

  const filteredClauses = useMemo(() => {
    return TERMS_CLAUSES.filter(
      (clause) =>
        clause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clause.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clause.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleClause = (idx) => {
    setExpandedClause(expandedClause === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pt-20 pb-20">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-pink-300/15 via-purple-300/10 to-transparent dark:from-pink-500/10 dark:via-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            HEADER & SEARCH
           ========================================================================= */}
        <div className="text-center space-y-4 pt-6 sm:pt-10 mb-8 sm:mb-12">
          
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link to="/" className="text-slate-600 hover:text-pink-600 dark:text-slate-400 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800/50 font-semibold text-[11px]">
              Legal Governance
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Terms &amp; Conditions{' '}
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 dark:from-pink-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent">
              of Service
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Master Service &amp; Global Panel Platform Terms. Effective October 2026. Explicit contractual provisions governing corporate research engagements and global panelist participation.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search legal clauses: e.g. 'SOW', 'data ownership', 'confidentiality'..."
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

        </div>

        {/* =========================================================================
            TERMS CLAUSES LIST
           ========================================================================= */}
        <div className="space-y-3 sm:space-y-4">
          {filteredClauses.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 p-8 space-y-3">
              <Scale className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No matching clauses found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                Try searching for a different keyword or contact our legal team directly.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-2 px-4 py-2 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 text-xs font-semibold transition-colors"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            filteredClauses.map((clause, idx) => {
              const Icon = clause.icon;
              const isOpen = expandedClause === idx;

              return (
                <div
                  key={clause.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white dark:bg-slate-900 border-pink-500/40 shadow-md shadow-pink-500/5'
                      : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleClause(idx)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-pink-600 text-white shadow-sm'
                            : 'bg-pink-50 text-pink-600 dark:bg-white/10 dark:text-pink-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-pink-600 dark:text-pink-400 block mb-0.5">
                          Section {clause.num}
                        </span>
                        <span className="text-sm sm:text-base font-display font-bold text-slate-900 dark:text-white leading-snug">
                          {clause.title}
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                          {clause.summary}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-pink-600 dark:text-pink-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 animate-in fade-in duration-200">
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 font-sans leading-relaxed">
                        {clause.content}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* =========================================================================
            BOTTOM LEGAL CORRESPONDENCE CARD
           ========================================================================= */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
                Direct Legal Correspondence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                For formal contract inquiries, enterprise MSAs, or compliance audits, contact our Office of Legal Counsel.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`mailto:${COMPANY.emails.general}`}
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-pink-600 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-pink-500 dark:hover:text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              {COMPANY.emails.general}
            </a>
            <Link
              to="/contact?type=quote"
              className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all"
            >
              Contact RFQ Desk
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
