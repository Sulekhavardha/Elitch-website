import express from 'express';
import mongoose from 'mongoose';
import PdfLead from '../models/PdfLead.js';
import AuditLog from '../models/AuditLog.js';
import { verifyAdmin } from '../middleware/auth.js';
import { inMemoryData } from '../config/inMemoryStore.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;

// =========================================================================
// 1. PUBLIC ENDPOINT: Submit PDF Download Lead Capture Form
// POST /api/pdf-leads/submit
// =========================================================================
router.post('/submit', async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Request body must be a valid JSON object.'
      });
    }

    const {
      name,
      email,
      company,
      jobTitle,
      country,
      phone,
      industry,
      message,
      privacyAccepted
    } = req.body;

    // Strict Validation of required fields (matching 4-field live form)
    const missingFields = [];
    if (!name || !name.trim()) missingFields.push('Your Name');
    if (!email || !email.trim()) missingFields.push('Your Official Email');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please complete required field(s): ${missingFields.join(', ')}.`
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid official email address.'
      });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const cleanEmail = email.toLowerCase().trim();

    // Check MongoDB vs In-Memory Fallback
    if (isDbConnected()) {
      // Check for rapid spam re-submission within last 2 minutes
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
      const existingRecent = await PdfLead.findOne({
        email: cleanEmail,
        createdAt: { $gte: twoMinutesAgo }
      });

      if (existingRecent) {
        existingRecent.downloadCount = (existingRecent.downloadCount || 1) + 1;
        await existingRecent.save();

        return res.status(200).json({
          success: true,
          message: 'Welcome back! Your PDF download is confirmed.',
          leadId: existingRecent._id,
          isRepeat: true
        });
      }

      const newLead = await PdfLead.create({
        name: name.trim(),
        email: cleanEmail,
        company: company ? company.trim() : '',
        jobTitle: jobTitle ? jobTitle.trim() : '',
        country: country ? country.trim() : '',
        phone: phone ? phone.trim() : '',
        industry: industry ? industry.trim() : '',
        message: message ? message.trim() : '',
        privacyAccepted: true,
        source: 'Panel Book Download Form',
        downloadCount: 1,
        ipAddress: typeof clientIp === 'string' ? clientIp.split(',')[0].trim() : ''
      });

      // Audit Log silently
      try {
        await AuditLog.create({
          action: 'PDF_LEAD_SUBMISSION',
          performedBy: cleanEmail,
          targetEntity: 'PdfLead',
          targetId: newLead._id,
          details: `Panel Book download lead captured: ${name} (${company} - ${country})`,
          ipAddress: clientIp
        });
      } catch (logErr) {}

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your information has been registered successfully.',
        leadId: newLead._id
      });
    } else {
      // In-Memory store fallback
      if (!inMemoryData.pdfLeads) inMemoryData.pdfLeads = [];

      const newLead = {
        _id: new mongoose.Types.ObjectId().toString(),
        name: name.trim(),
        email: cleanEmail,
        company: company ? company.trim() : '',
        jobTitle: jobTitle ? jobTitle.trim() : '',
        country: country ? country.trim() : '',
        phone: phone ? phone.trim() : '',
        industry: industry ? industry.trim() : '',
        message: message ? message.trim() : '',
        privacyAccepted: true,
        source: 'Panel Book Download Form',
        downloadCount: 1,
        ipAddress: typeof clientIp === 'string' ? clientIp.split(',')[0].trim() : '',
        status: 'New',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      inMemoryData.pdfLeads.unshift(newLead);

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your information has been registered successfully.',
        leadId: newLead._id
      });
    }
  } catch (error) {
    console.error('[PDF Lead Submit Error]:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to record lead. Please try again or download directly.'
    });
  }
});

// =========================================================================
// 2. ADMIN ENDPOINT: Get All PDF Leads with Search, Filter & Pagination
// GET /api/pdf-leads
// =========================================================================
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 25,
      search = '',
      industry = '',
      country = '',
      status = ''
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    if (isDbConnected()) {
      const query = {};

      if (search && search.trim()) {
        const term = search.trim();
        query.$or = [
          { name: { $regex: term, $options: 'i' } },
          { email: { $regex: term, $options: 'i' } },
          { company: { $regex: term, $options: 'i' } },
          { jobTitle: { $regex: term, $options: 'i' } },
          { country: { $regex: term, $options: 'i' } },
          { phone: { $regex: term, $options: 'i' } }
        ];
      }

      if (industry && industry !== 'All') {
        query.industry = industry;
      }
      if (country && country !== 'All') {
        query.country = country;
      }
      if (status && status !== 'All') {
        query.status = status;
      }

      const total = await PdfLead.countDocuments(query);
      const leads = await PdfLead.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean();

      // Quick summary statistics
      const totalAllTime = await PdfLead.countDocuments();
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayCount = await PdfLead.countDocuments({ createdAt: { $gte: todayStart } });

      return res.status(200).json({
        success: true,
        leads,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum) || 1,
        stats: {
          totalLeads: totalAllTime,
          todayDownloads: todayCount
        }
      });
    } else {
      // In-Memory store handling
      let leads = (inMemoryData.pdfLeads || []).slice();

      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        leads = leads.filter(
          (l) =>
            l.name?.toLowerCase().includes(q) ||
            l.email?.toLowerCase().includes(q) ||
            l.company?.toLowerCase().includes(q) ||
            l.jobTitle?.toLowerCase().includes(q) ||
            l.country?.toLowerCase().includes(q) ||
            l.phone?.includes(q)
        );
      }

      if (industry && industry !== 'All') {
        leads = leads.filter((l) => l.industry === industry);
      }
      if (status && status !== 'All') {
        leads = leads.filter((l) => l.status === status);
      }

      const total = leads.length;
      const paginated = leads.slice(skip, skip + limitNum);

      return res.status(200).json({
        success: true,
        leads: paginated,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum) || 1,
        stats: {
          totalLeads: inMemoryData.pdfLeads ? inMemoryData.pdfLeads.length : 0,
          todayDownloads: 1
        }
      });
    }
  } catch (error) {
    console.error('[Admin PDF Leads Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve PDF leads from database.'
    });
  }
});

// =========================================================================
// 3. ADMIN ENDPOINT: Export Leads as CSV
// GET /api/pdf-leads/export-csv
// =========================================================================
router.get('/export-csv', verifyAdmin, async (req, res) => {
  try {
    let leads = [];

    if (isDbConnected()) {
      leads = await PdfLead.find().sort({ createdAt: -1 }).lean();
    } else {
      leads = (inMemoryData.pdfLeads || []).slice();
    }

    // CSV Header row
    const headers = [
      'Full Name',
      'Business Email',
      'Company Name',
      'Job Title / Designation',
      'Country',
      'Phone Number',
      'Industry',
      'Message',
      'Status',
      'Download Count',
      'Submission Date & Time'
    ];

    const escapeCsv = (str) => {
      if (str === null || str === undefined) return '""';
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = leads.map((l) => [
      escapeCsv(l.name),
      escapeCsv(l.email),
      escapeCsv(l.company),
      escapeCsv(l.jobTitle),
      escapeCsv(l.country),
      escapeCsv(l.phone),
      escapeCsv(l.industry),
      escapeCsv(l.message || ''),
      escapeCsv(l.status || 'New'),
      escapeCsv(l.downloadCount || 1),
      escapeCsv(l.createdAt ? new Date(l.createdAt).toISOString() : '')
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    const filename = `elicit-pdf-download-leads-${new Date().toISOString().split('T')[0]}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('[Export CSV Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to export CSV file.'
    });
  }
});

// =========================================================================
// 4. ADMIN ENDPOINT: Update Lead Status
// PATCH /api/pdf-leads/:id/status
// =========================================================================
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'Qualified', 'Follow-up', 'Archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    if (isDbConnected()) {
      const updated = await PdfLead.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Lead status updated.',
        lead: updated
      });
    } else {
      const lead = (inMemoryData.pdfLeads || []).find((l) => l._id === id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
      }
      lead.status = status;
      lead.updatedAt = new Date();

      return res.status(200).json({
        success: true,
        message: 'Lead status updated.',
        lead
      });
    }
  } catch (error) {
    console.error('[Update Status Error]:', error);
    return res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
});

// =========================================================================
// 5. ADMIN ENDPOINT: Delete Lead Record
// DELETE /api/pdf-leads/:id
// =========================================================================
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await PdfLead.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
      }

      try {
        await AuditLog.create({
          action: 'DELETE_PDF_LEAD',
          performedBy: req.admin?.email || 'Admin',
          targetEntity: 'PdfLead',
          targetId: id,
          details: `Deleted PDF lead for: ${deleted.name} (${deleted.email})`
        });
      } catch (e) {}

      return res.status(200).json({
        success: true,
        message: 'Lead record permanently deleted.'
      });
    } else {
      const idx = (inMemoryData.pdfLeads || []).findIndex((l) => l._id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
      }

      inMemoryData.pdfLeads.splice(idx, 1);
      return res.status(200).json({
        success: true,
        message: 'Lead record permanently deleted.'
      });
    }
  } catch (error) {
    console.error('[Delete PDF Lead Error]:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete lead record.' });
  }
});

export default router;

