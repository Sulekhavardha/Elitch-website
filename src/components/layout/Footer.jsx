import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Linkedin,
  Facebook,
  Instagram,
  FileDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import { COMPANY, SERVICES } from '../../data/companyData';
import { generatePanelBookPDF } from '../../utils/pdfGenerator';

export default function Footer() {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail]               = useState('');
  const [downloading, setDownloading]         = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subEmail && subEmail.includes('@')) {
      setEmailSubscribed(true);
      setSubEmail('');
    }
  };

  const handleDownloadPanelBook = () => {
    setDownloading(true);
    try { generatePanelBookPDF(); }
    catch (err) { console.error('PDF generation error:', err); }
    finally { setDownloading(false); }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-white dark:bg-slate-950 border-t border-slate-200/70 dark:border-white/[0.07] text-slate-600 dark:text-slate-300">

      {/* ── Main footer grid ── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">

          {/* Company bio */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link to="/" className="flex items-center w-fit py-1">
              <img
                src="/images/logo.png"
                alt="Elicit Research & Insights Inc."
                className="h-9 sm:h-11 w-auto max-w-[220px] object-contain dark:invert dark:hue-rotate-180 transition-transform duration-200 hover:opacity-95"
              />
            </Link>

            <p className="body-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {COMPANY.description}
            </p>

            {null}

            {/* Social links */}
            <div className="flex items-center gap-2.5">
              {[
                { href: COMPANY.socials.linkedin,  Icon: Linkedin,  label: 'LinkedIn'  },
                { href: COMPANY.socials.facebook,  Icon: Facebook,  label: 'Facebook'  },
                { href: COMPANY.socials.instagram, Icon: Instagram, label: 'Instagram' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300/60 dark:hover:border-cyan-400/20 shadow-xs"
                  style={{ transition: 'color 0.15s ease, border-color 0.15s ease' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Practice areas */}
          <div className="lg:col-span-3">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-5">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Practice Areas
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services#${s.id}`}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    style={{ transition: 'color 0.15s ease' }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 mt-1"
                  style={{ transition: 'color 0.15s ease' }}
                >
                  View all 10 services
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Panel platform */}
          <div className="lg:col-span-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-5">
              <Globe2 className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              Panel
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to="/panel"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  5M+ Global Panel
                </Link>
              </li>
              <li>
                <Link
                  to="/panel#sampling"
                  className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  B2B &amp; B2C Sampling
                </Link>
              </li>
              <li>
                <Link
                  to="/panel#reach"
                  className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Global Reach (45+ Countries)
                </Link>
              </li>
              <li>
                <Link
                  to="/get-panel-book"
                  className="inline-flex items-center gap-1 font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors mt-0.5"
                >
                  <span>Download Panel Book</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Governance */}
          <div className="lg:col-span-3">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-5">
              <ShieldCheck className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-500 dark:text-slate-400 mb-7">
              {[
                { to: '/about',          label: 'About Elicit Research'     },
                { to: '/about#leadership', label: 'Executive Governance'    },
                { to: '/careers',        label: 'Careers', badge: "We're Hiring" },
                { to: '/faq',            label: 'Frequently Asked Questions' },
                { to: '/privacy-policy', label: 'Privacy Policy (GDPR/CCPA)' },
                { to: '/terms',          label: 'Terms &amp; Conditions'    },
              ].map(({ to, label, badge }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white"
                    style={{ transition: 'color 0.15s ease' }}
                    dangerouslySetInnerHTML={undefined}
                  >
                    {label}
                    {badge && (
                      <span className="badge badge-emerald text-[10px] py-0.5 px-1.5">
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-slate-100 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-slate-400 dark:text-slate-500">
            <p>&copy; 2026 Elicit Research &amp; Insights Inc. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-slate-700 dark:hover:text-slate-300" style={{ transition: 'color 0.15s ease' }}>Privacy</Link>
              <span aria-hidden="true">·</span>
              <Link to="/terms" className="hover:text-slate-700 dark:hover:text-slate-300" style={{ transition: 'color 0.15s ease' }}>Terms</Link>
              <span aria-hidden="true">·</span>
              <Link to="/contact" className="hover:text-slate-700 dark:hover:text-slate-300" style={{ transition: 'color 0.15s ease' }}>Contact</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 dark:bg-emerald-400 animate-status-pulse" />
              All Systems Operational
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.07] hover:text-slate-800 dark:hover:text-white shadow-xs"
              style={{ transition: 'background-color 0.15s ease, color 0.15s ease' }}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

