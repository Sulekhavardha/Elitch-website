import bcrypt from 'bcryptjs';

// Pre-hashed password for VardhaAdmin@2026 (fallback credentials)
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('VardhaAdmin@2026', 10);

export const inMemoryData = {
  // Admin credentials preserved for local admin panel authentication fallback
  admins: [
    {
      _id: '671916a00000000000000001',
      name: 'Vardha Master Admin',
      email: 'admin@vardhabuilders.com',
      password: DEFAULT_PASSWORD_HASH,
      role: 'superadmin',
      phone: '+91 98200 91827',
      avatar: '',
      isActive: true,
      lastLogin: new Date()
    }
  ],
  // Unused old real estate mock data removed
  projects: [],
  leads: [],
  gallery: [],
  floorPlans: [],
  auditLogs: [],
  contents: {},
  // Active store for Elicit Research Panel PDF leads
  pdfLeads: []
};
