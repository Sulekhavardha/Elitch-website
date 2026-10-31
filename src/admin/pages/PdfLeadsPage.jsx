import React, { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  FileDown,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Globe2,
  Search,
  Filter,
  Trash2,
  Calendar,
  Download,
  Eye,
  RefreshCw,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  Sparkles,
  User,
  Layers,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { useToast } from '../context/ToastContext';

// Helper to get local leads (only real user submissions from website)
const getLocalLeads = () => {
  try {
    const raw = localStorage.getItem('elicit_pdf_leads');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Delete Sarah and Michael / demo leads automatically
    const realLeads = parsed.filter(
      (l) => l && l._id && !l._id.startsWith('lead_demo_') && !l.email?.includes('jenkins') && !l.email?.includes('chang')
    );
    if (realLeads.length !== parsed.length) {
      localStorage.setItem('elicit_pdf_leads', JSON.stringify(realLeads));
    }
    return realLeads;
  } catch (e) {
    return [];
  }
};

// Helper to save local leads
const setLocalLeads = (leads) => {
  try {
    localStorage.setItem('elicit_pdf_leads', JSON.stringify(leads));
  } catch (e) {}
};

export default function PdfLeadsPage() {
  const { showToast } = useToast();

  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, converted: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All');

  // Selected Lead Modal Drawer
  const [selectedLead, setSelectedLead] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Export CSV
  const [isExporting, setIsExporting] = useState(false);

  // Fetch leads from backend and merge with local storage
  const fetchAllLeads = useCallback(async () => {
    setIsLoading(true);
    let combinedLeads = [];

    // 1. Load from localStorage first (guaranteed instant)
    const local = getLocalLeads();

    // 2. Try fetching from backend API
    try {
      const res = await api.get('/pdf-leads', { limit: 100 });
      if (res && res.success && Array.isArray(res.leads)) {
        // Merge backend and local leads, deduplicating by email or id
        const backendEmails = new Set(res.leads.map((l) => (l.email || '').toLowerCase().trim()));
        const uniqueLocal = local.filter(
          (l) => !backendEmails.has((l.email || '').toLowerCase().trim())
        );
        combinedLeads = [...res.leads, ...uniqueLocal];
      } else {
        combinedLeads = local;
      }
    } catch (err) {
      // If backend unreachable, rely on local storage
      combinedLeads = local;
    }

    // Sort by newest first
    combinedLeads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setLeads(combinedLeads);

    // Calculate stats
    const total = combinedLeads.length;
    const newCount = combinedLeads.filter((l) => l.status === 'New').length;
    const contactedCount = combinedLeads.filter((l) => l.status === 'Contacted').length;
    const convertedCount = combinedLeads.filter(
      (l) => l.status === 'Converted' || l.status === 'Qualified'
    ).length;

    setStats({
      total,
      new: newCount,
      contacted: contactedCount,
      converted: convertedCount
    });

    if (selectedLead) {
      const fresh = combinedLeads.find((l) => l._id === selectedLead._id);
      if (fresh) setSelectedLead(fresh);
    }

    setIsLoading(false);
  }, [selectedLead]);

  useEffect(() => {
    fetchAllLeads();
  }, []);

  // Filter leads in memory
  const filteredLeads = leads.filter((l) => {
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (l.fullName || l.name || '').toLowerCase().includes(q) ||
      (l.email || '').toLowerCase().includes(q) ||
      (l.company || '').toLowerCase().includes(q) ||
      (l.jobTitle || '').toLowerCase().includes(q) ||
      (l.phone || '').toLowerCase().includes(q) ||
      (l.country || '').toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesIndustry = industryFilter === 'All' || l.industry === industryFilter;

    return matchesSearch && matchesStatus && matchesIndustry;
  });


  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      setIsUpdatingStatus(true);

      // Update local storage
      const local = getLocalLeads();
      const updatedLocal = local.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l));
      setLocalLeads(updatedLocal);

      // Try updating backend
      try {
        await api.patch(`/pdf-leads/${leadId}/status`, { status: newStatus });
      } catch (err) {}

      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
      );

      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead((prev) => ({ ...prev, status: newStatus }));
      }

      showToast({
        type: 'success',
        title: 'Status Updated',
        message: `Marked as ${newStatus}`
      });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Update Failed',
        message: 'Could not update status.'
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const confirmDeleteLead = (lead) => {
    setLeadToDelete(lead);
    setDeleteModalOpen(true);
  };

  const handleDeleteLead = async () => {
    if (!leadToDelete) return;
    try {
      setIsDeleting(true);

      // Remove from local storage
      const local = getLocalLeads();
      const updatedLocal = local.filter((l) => l._id !== leadToDelete._id);
      setLocalLeads(updatedLocal);

      // Try backend delete
      try {
        await api.delete(`/pdf-leads/${leadToDelete._id}`);
      } catch (err) {}

      if (selectedLead?._id === leadToDelete._id) {
        setSelectedLead(null);
      }

      setDeleteModalOpen(false);
      setLeadToDelete(null);

      showToast({
        type: 'success',
        title: 'Lead Deleted',
        message: 'Record removed successfully.'
      });

      fetchAllLeads();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Delete Failed',
        message: 'Could not delete lead record.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    try {
      setIsExporting(true);
      if (filteredLeads.length === 0) {
        showToast({ type: 'warning', title: 'No Data', message: 'No leads available to export.' });
        return;
      }

      const headers = [
        'Your Name',
        'Job Title',
        'Company Name',
        'Your Official Email',
        'Status',
        'Submission Date & Time'
      ];

      const rows = filteredLeads.map((l) => [
        `"${(l.fullName || l.name || '').replace(/"/g, '""')}"`,
        `"${(l.jobTitle || '').replace(/"/g, '""')}"`,
        `"${(l.company || '').replace(/"/g, '""')}"`,
        `"${(l.email || '').replace(/"/g, '""')}"`,
        `"${l.status || 'New'}"`,
        `"${new Date(l.createdAt).toLocaleString()}"`
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `elicit-panel-leads-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast({
        type: 'success',
        title: 'CSV Exported',
        message: `${filteredLeads.length} lead records downloaded.`
      });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Export Failed',
        message: 'Could not generate CSV file.'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'Contacted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Qualified':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Converted':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Archived':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-pink-100/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold mb-2">
            <FileDown className="w-3.5 h-3.5 text-pink-600" />
            Panel Page Form Submissions
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            Panel Page User Leads
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Real-time data submitted by visitors filling the Panel Book form on the website.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            to="/panel"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition-all"
            title="Open Panel Page on website"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Open Panel Page</span>
          </Link>

          <button
            onClick={fetchAllLeads}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-pink-300 hover:text-pink-600 font-semibold text-xs transition-all shadow-xs"
            title="Refresh submissions"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-pink-600' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCsv}
            disabled={isExporting || leads.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-xs shadow-md shadow-pink-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-white/10 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Total Panel Submissions</span>
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <FileDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-display text-slate-900 dark:text-white">{stats.total}</div>
          <div className="text-[11px] text-slate-400 mt-1">From /panel form</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-white/10 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>New Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-display text-rose-600">{stats.new}</div>
          <div className="text-[11px] text-slate-400 mt-1">Awaiting review</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-white/10 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>In Conversation</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-display text-purple-600">{stats.contacted}</div>
          <div className="text-[11px] text-slate-400 mt-1">Outreach ongoing</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-white/10 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Converted Clients</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-display text-emerald-600">{stats.converted}</div>
          <div className="text-[11px] text-slate-400 mt-1">Active RFQ partners</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-white/10 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, company, job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            Status:
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-pink-500"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/10 shadow-xs overflow-hidden transition-colors">
        {isLoading ? (
          <div className="p-6">
            <LoadingSkeleton count={5} />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 mx-auto flex items-center justify-center">
              <FileDown className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No Panel Page Submissions Yet
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Jab koi user website ke <strong>/panel</strong> page par jakar form fill karega, uska poora data yahan automatically show hoga.
            </p>
            <div className="pt-2 flex items-center justify-center">
              <Link
                to="/panel"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white font-semibold text-xs shadow-md shadow-pink-500/20 hover:opacity-95 transition-opacity"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open /panel to Test Form</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-100 dark:border-white/10 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Your Name</th>
                  <th className="py-3.5 px-4">Job Title</th>
                  <th className="py-3.5 px-4">Company Name</th>
                  <th className="py-3.5 px-4">Your Official Email</th>
                  <th className="py-3.5 px-4">Submitted Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="hover:bg-pink-50/30 dark:hover:bg-pink-950/20 transition-colors group cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    {/* 1. Your Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                        <span>{lead.fullName || lead.name}</span>
                      </div>
                    </td>

                    {/* 2. Job Title */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{lead.jobTitle || '—'}</span>
                      </div>
                    </td>

                    {/* 3. Company Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{lead.company || '—'}</span>
                      </div>
                    </td>

                    {/* 4. Your Official Email */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{lead.email}</span>
                      </div>
                    </td>

                    {/* 5. Submission Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      <div className="font-medium text-slate-700 dark:text-slate-300">
                        {new Date(lead.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {new Date(lead.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>

                    {/* 6. Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status || 'New'}
                        onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${getStatusColor(
                          lead.status || 'New'
                        )}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Converted">Converted</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>

                    {/* 7. Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDeleteLead(lead)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {filteredLeads.length > 0 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div>
              Total <span className="font-bold text-slate-900">{filteredLeads.length}</span> user submissions
            </div>
            <div className="text-[11px] text-slate-400">
              Click any user row to view full specifications &amp; direct contact options.
            </div>
          </div>
        )}
      </div>

      {/* Selected Lead Modal Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-pink-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 p-6 text-white relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                  Panel Page Form Lead
                </span>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <h2 className="text-xl font-bold font-display mt-3">
                {selectedLead.fullName || selectedLead.name}
              </h2>
              <p className="text-pink-100 text-xs">
                {selectedLead.jobTitle} at {selectedLead.company}
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Quick Contact Action */}
              <div>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-pink-200 bg-pink-50/70 hover:bg-pink-100 text-pink-700 font-semibold text-xs transition-all w-full"
                >
                  <Mail className="w-4 h-4" /> Email {selectedLead.fullName || selectedLead.name}
                </a>
              </div>

              {/* Data Rows: 4 Form Fields + Submission Time */}
              <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl text-xs border border-slate-100 dark:border-white/10">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Your Name</span>
                  <span className="font-semibold text-slate-800">{selectedLead.fullName || selectedLead.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Job Title</span>
                  <span className="font-semibold text-slate-800">{selectedLead.jobTitle || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Company Name</span>
                  <span className="font-semibold text-slate-800">{selectedLead.company || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Your Official Email</span>
                  <span className="font-mono font-semibold text-pink-600">{selectedLead.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Submission Time</span>
                  <span className="text-slate-800 font-medium">
                    {new Date(selectedLead.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Source Portal</span>
                  <span className="font-semibold text-pink-600">{selectedLead.source || 'Panel Page Form'}</span>
                </div>
              </div>

              {/* Message / Specifications if provided */}
              {selectedLead.message && (
                <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 space-y-1">
                  <div className="text-[11px] font-semibold text-pink-800 uppercase tracking-wide flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>User's Research Notes / Specifications</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              {/* Status Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Update Lead Pipeline Status
                </label>
                <div className="flex gap-2 flex-wrap">
                  {['New', 'Contacted', 'Qualified', 'Converted', 'Archived'].map((st) => (
                    <button
                      key={st}
                      disabled={isUpdatingStatus}
                      onClick={() => handleUpdateStatus(selectedLead._id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedLead.status === st
                          ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-pink-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => confirmDeleteLead(selectedLead)}
                className="text-rose-600 hover:text-rose-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Lead
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteLead}
        title="Delete User Submission"
        message={`Are you sure you want to delete the record for ${leadToDelete?.fullName || leadToDelete?.name} (${leadToDelete?.email})?`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete Permanently'}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
