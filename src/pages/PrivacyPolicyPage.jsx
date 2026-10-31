import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Mail,
  CheckCircle2,
  Globe2,
  Search,
  X,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/companyData';

export default function PrivacyPolicyPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const SECTIONS = [
    {
      id: 'commitment',
      num: '01',
      title: 'Institutional Commitment to Respondent Privacy',
      icon: ShieldCheck,
      content: `${COMPANY.name} operates as an ethical data intelligence institution. We hold respondent privacy, data pseudonymization, and consumer trust as paramount pillars. We adhere stringently to the ICC/ESOMAR International Code on Market, Opinion, and Social Research and Data Analytics.`
    },
    {
      id: 'scope',
      num: '02',
      title: 'Scope of Collected Information',
      icon: Eye,
      intro: 'We collect information under two distinct operational paradigms:',
      items: [
        {
          label: 'Enterprise Client Inquiries (B2B)',
          desc: 'Organization name, professional email, phone number, and project scoping parameters submitted via our RFQ bidding portals.'
        },
        {
          label: 'Panelist Research Data (B2B & B2C)',
          desc: 'Voluntary responses to demographic, psychographic, and industry-specific survey instruments, aggregated exclusively for statistical research modeling.'
        }
      ]
    },
    {
      id: 'anonymization',
      num: '03',
      title: 'Data Pseudonymization & Anonymization',
      icon: Lock,
      content: 'Survey responses delivered to clients are stripped of Personally Identifiable Information (PII) unless explicit, recorded, informed consent has been obtained for specific qualitative research (e.g. video interviews). Raw survey data feeds utilize randomized cryptographic identifiers (UIDs).'
    },
    {
      id: 'rights',
      num: '04',
      title: 'Your Global Rights (GDPR / CCPA)',
      icon: Globe2,
      intro: 'Regardless of your geographic location, you retain full statutory rights:',
      rights: [
        'Request access to the personal records associated with your panel account.',
        'Request instantaneous permanent deletion ("Right to be Forgotten").',
        'Opt-out of any prospective survey invitations or email notifications.',
        'Request data portability in standard JSON/CSV schema.'
      ]
    },
    {
      id: 'dpo',
      num: '05',
      title: 'Data Protection Officer (DPO) Contact & Governance',
      icon: UserCheck,
      intro: 'For any privacy inquiries or to exercise your statutory rights, please contact our Data Governance Officer:',
      email: COMPANY.emails.general,
      subject: 'ATTN: Data Privacy & Governance Desk'
    }
  ];

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return SECTIONS;
    const q = searchQuery.toLowerCase();
    return SECTIONS.filter(s =>
      s.title.toLowerCase().includes(q) ||
      (s.content && s.content.toLowerCase().includes(q)) ||
      (s.intro && s.intro.toLowerCase().includes(q)) ||
      (s.items && s.items.some(i => i.label.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q))) ||
      (s.rights && s.rights.some(r => r.toLowerCase().includes(q)))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pt-20 pb-20 relative overflow-hidden">
      
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
              Data Governance &amp; Privacy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Global Privacy Policy &amp;{' '}
            <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 dark:from-pink-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Data Governance
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Last Updated &amp; Certified: October 2026. Strictly compliant with EU GDPR, UK DPA, and California CCPA/CPRA standards.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search privacy terms: e.g. 'GDPR', 'pseudonymization', 'DPO'..."
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
            POLICY CARDS LIST
           ========================================================================= */}
        <div className="space-y-6">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-white/10 p-8">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No policy section matching "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-3 text-pink-600 dark:text-pink-400 text-xs font-semibold hover:underline"
              >
                Clear search query
              </button>
            </div>
          ) : (
            filteredSections.map((sec) => {
              const IconComp = sec.icon;
              return (
                <div
                  key={sec.id}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-sm hover:border-pink-500/30 transition-all space-y-4"
                >
                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-rose-500/10 dark:from-pink-500/20 dark:via-purple-500/20 dark:to-rose-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/15">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h2 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
                        {sec.title}
                      </h2>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 font-mono text-xs font-bold border border-pink-200/60 dark:border-pink-800/40 shrink-0">
                      § {sec.num}
                    </span>
                  </div>

                  {sec.content && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sec.content}
                    </p>
                  )}

                  {sec.intro && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {sec.intro}
                    </p>
                  )}

                  {sec.items && (
                    <div className="grid gap-3 pt-1">
                      {sec.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 space-y-1"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                            <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                              {item.label}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 pl-3.5">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.rights && (
                    <div className="grid gap-2.5 pt-1">
                      {sec.rights.map((right, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
                          <span>{right}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.email && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 space-y-1.5">
                      <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                        Official Desk:{' '}
                        <a
                          href={`mailto:${sec.email}`}
                          className="text-pink-600 dark:text-pink-400 font-semibold underline hover:text-pink-700"
                        >
                          {sec.email}
                        </a>
                      </div>
                      <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        Subject Header: <span className="text-slate-700 dark:text-slate-200">{sec.subject}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* =========================================================================
            BOTTOM LEGAL CORRESPONDENCE CARD (MATCHING TERMS PAGE)
           ========================================================================= */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-pink-500/25 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
                Direct Privacy &amp; Compliance Office
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                For GDPR data deletion requests, statutory audits, or compliance disclosures.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            <a
              href={`mailto:${COMPANY.emails.general}`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 border-pink-500/40 hover:border-pink-500 bg-pink-50/80 hover:bg-pink-100/90 dark:bg-pink-950/40 dark:border-pink-500/30 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 group"
            >
              <Mail className="w-4 h-4 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors">
                {COMPANY.emails.general}
              </span>
            </a>
            <Link
              to="/contact?type=quote"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35 transition-all active:scale-95"
            >
              Contact RFQ Desk
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
